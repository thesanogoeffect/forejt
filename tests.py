"""Tests for the PSMF scraping pipeline.

Two layers:

* **Deterministic (always run):** the parser/transform functions are exercised
  against in-memory DataFrames that mirror the real PSMF column layout. These
  never touch the network, so a flaky PSMF outage cannot fail the build.
* **Live smoke (best effort):** one test reaches PSMF to confirm the team page
  still resolves and parses. It is *skipped* (not failed) when PSMF is
  unreachable, so a transient outage degrades to a skip instead of a red build.
"""
import logging

import pandas as pd
import pytest

import main

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

# PSMF's address column uses a non-breaking space (U+00A0) before "další".
ADDR_COL = "Adresa areálů (hřišť) a\xa0další informace"


# --------------------------------------------------------------------------- #
# Fixture DataFrames mirroring the real PSMF table layout
# --------------------------------------------------------------------------- #
def _pitches_df():
    """The /hriste/ pitches table, prepped the way main.py preps it."""
    df = pd.DataFrame(
        {
            "Název hřiště": ["Malešovice", "Strašnice"],
            "Zkratka hřiště": ["MALES", "STRAS"],
            ADDR_COL: [
                "Malešovice, Praha 14  \nU areálu, vlevo",
                "Strašnice, Praha 7  \nSportovní hřiště",
            ],
        }
    )
    df["Zkratka hřiště base"] = df["Zkratka hřiště"].str.extract(r"(^[A-Z]+)", expand=True)
    df["Pure adresa"] = df[ADDR_COL].str.extract(r"(.+Praha \d+)", expand=True)
    df["Desc"] = df[ADDR_COL].str.replace(r"(.+Praha \d+)", "", regex=True)
    return df


def _upcoming_df():
    """Team-page 'Nadcházející zápasy' table (no Výsledek yet)."""
    return pd.DataFrame(
        {
            "Domácí - Hosté": [
                "Forejt FC  Catchers SC",
                "MALES  Forejt FC",
            ],
            "Datum": ["Út 29.09.", "So 03.10."],
            "Čas": ["18:00", "17:00"],
            "Hřiště": ["MALES", "STRAS"],
            "Kolo": [5.0, 6.0],
        }
    )


def _results_df():
    """Team-page 'Výsledky' table (has Výsledek)."""
    return pd.DataFrame(
        {
            "Domácí - Hosté": [
                "Forejt FC  MALES FC",
                "Catchers SC  Forejt FC",
            ],
            "Datum": ["So 05.09.", "So 12.09."],
            "Čas": ["16:00", "18:00"],
            "Hřiště": ["MALES", "STRAS"],
            "Kolo": [3.0, 4.0],
            "Výsledek": ["3:1", "2:5"],
        }
    )


def _scoreboard_df():
    """Team-page league table, as read_html returns it (Tým is a column)."""
    return pd.DataFrame(
        {
            "Tým": ["Forejt FC", "Catchers SC", "MALES FC"],
            "Pořadí": [1.0, 2.0, 3.0],
            "Odehrané zápasy": [4.0, 4.0, 4.0],
            "Počet výher": [3.0, 1.0, 0.0],
            "Počet remíz": [0.0, 1.0, 0.0],
            "Počet proher": [1.0, 2.0, 4.0],
            "Skóre": ["12:6", "8:9", "4:15"],
            "Počet bodů": [9.0, 4.0, 0.0],
        }
    )


@pytest.fixture(scope="module")
def pitches_df():
    return _pitches_df()


@pytest.fixture(scope="module")
def team_page_dfs():
    """A list of DataFrames as pd.read_html(team_url) would return."""
    return [_results_df(), _upcoming_df(), _scoreboard_df()]


@pytest.fixture(scope="module")
def scoreboard_df(team_page_dfs):
    _, _, sb = main.normalize_team_page_dfs(team_page_dfs)
    sb.set_index("Tým", inplace=True)
    return sb


@pytest.fixture(scope="module")
def matches_df(team_page_dfs, pitches_df):
    _, upcoming, _ = main.normalize_team_page_dfs(team_page_dfs)
    return main.prepare_match_df(upcoming, pitches_df)


@pytest.fixture(scope="module")
def results_df(team_page_dfs, pitches_df):
    results, _, _ = main.normalize_team_page_dfs(team_page_dfs)
    if results is None:
        return None
    return main.prepare_match_df(results, pitches_df)


# --------------------------------------------------------------------------- #
# Deterministic parser / transform tests
# --------------------------------------------------------------------------- #
def test_pitches_df(pitches_df):
    assert len(pitches_df) > 0
    assert all(
        c in pitches_df.columns
        for c in ["Název hřiště", "Zkratka hřiště", ADDR_COL,
                  "Zkratka hřiště base", "Pure adresa", "Desc"]
    )
    assert pitches_df.shape[1] == 6


def test_normalize_finds_all_tables(team_page_dfs):
    results, upcoming, scoreboard = main.normalize_team_page_dfs(team_page_dfs)
    assert results is not None and "Výsledek" in results.columns
    assert upcoming is not None and "Výsledek" not in upcoming.columns
    assert scoreboard is not None and "Tým" in scoreboard.columns


def test_normalize_requires_upcoming_and_scoreboard():
    # A page missing the upcoming table must raise, not silently pass.
    only_scoreboard = [_scoreboard_df()]
    with pytest.raises(RuntimeError):
        main.normalize_team_page_dfs(only_scoreboard)


def test_matches_df(matches_df):
    assert len(matches_df) > 0
    assert all(
        c in matches_df.columns
        for c in ["Datum", "Čas", "Hřiště", "Kolo",
                  "Název hřiště", "Pure adresa", "Desc"]
    )
    # Kolo must be a clean int even if the source was a float.
    assert matches_df["Kolo"].dtype.kind == "i"


def test_results_df(results_df):
    if results_df is None:
        logging.info("Skipping: no results yet this season (preseason)")
        return
    assert all(
        c in results_df.columns
        for c in ["Datum", "Čas", "Hřiště", "Kolo", "Výsledek",
                  "Název hřiště", "Pure adresa", "Desc"]
    )


def test_scoreboard_df(scoreboard_df):
    assert len(scoreboard_df) > 0
    assert all(
        c in scoreboard_df.columns
        for c in ["Pořadí", "Odehrané zápasy", "Počet výher", "Počet remíz",
                  "Počet proher", "Skóre", "Počet bodů"]
    )


def test_scoreboard_contains_forejt(scoreboard_df):
    assert main.TEAM_NAME in scoreboard_df.index


def test_get_team_position_points(scoreboard_df):
    pos, points = main.get_team_position_points(scoreboard_df, main.TEAM_NAME)
    assert isinstance(pos, int)
    assert isinstance(points, int)


# --------------------------------------------------------------------------- #
# Live smoke test (skipped when PSMF is unreachable)
# --------------------------------------------------------------------------- #
def _psmf_reachable(timeout=10):
    """Fast, single-shot probe (no retry layer) so a down PSMF skips in
    ~seconds instead of burning the full retry budget."""
    import requests

    try:
        r = requests.get(main.BASE_URL, timeout=timeout,
                         headers={"User-Agent": "forejt-ics-smoketest"})
        return r.status_code == 200
    except requests.RequestException:
        return False


def test_live_smoke():
    """Reach PSMF, resolve the team page, and confirm Forejt FC is in it.

    Skips (does not fail) when PSMF is down, so a transient outage never
    breaks the build.
    """
    if not _psmf_reachable():
        pytest.skip("PSMF unreachable from this environment — skipping live smoke test")
    team_url = main.find_team_url()
    assert main.TEAM_SLUG in team_url
    dfs = pd.read_html(team_url)
    _, _, scoreboard = main.normalize_team_page_dfs(dfs)
    assert main.TEAM_NAME in scoreboard.index
