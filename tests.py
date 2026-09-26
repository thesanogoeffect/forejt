"""Tests for the PSMF scraping pipeline.

Uses main.py's helpers so tests exercise the same code as production.
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


@pytest.fixture(scope="module")
def team_url():
    return main.find_team_url()


@pytest.fixture(scope="module")
def all_dfs(team_url):
    try:
        return pd.read_html(team_url)
    except Exception as e:
        pytest.fail(f"Failed to fetch DataFrames from {team_url}: {e}")


@pytest.fixture(scope="module")
def pitches_df():
    try:
        pitches_df = pd.read_html(f"{main.BASE_URL}/hriste/")[0]
        pitches_df["Zkratka hřiště base"] = pitches_df["Zkratka hřiště"].str.extract(
            "(^[A-Z]+)", expand=True
        )
        pitches_df["Pure adresa"] = pitches_df[
            "Adresa areálů (hřišť) a\xa0další informace"
        ].str.extract("(.+Praha \d+)", expand=True)
        pitches_df["Desc"] = pitches_df[
            "Adresa areálů (hřišť) a\xa0další informace"
        ].str.replace("(.+Praha \d+)", "", regex=True)
        return pitches_df
    except Exception as e:
        pytest.fail(f"Failed to fetch pitches DataFrame: {e}")


@pytest.fixture(scope="module")
def matches_df(all_dfs, pitches_df):
    results_df, matches_df, scoreboard_df = main.normalize_team_page_dfs(all_dfs)
    matches_df = main.prepare_match_df(matches_df, pitches_df)
    logging.info(f"Found {len(matches_df)} upcoming matches")
    logging.info(f"matches_df columns: {matches_df.columns}")
    logging.info(f"matches_df head:\n{matches_df.head()}")
    return matches_df


@pytest.fixture(scope="module")
def results_df(all_dfs, pitches_df):
    results_df, _, _ = main.normalize_team_page_dfs(all_dfs)
    if results_df is None:
        logging.info("No results yet this season (preseason)")
        return None
    results_df = main.prepare_match_df(results_df, pitches_df)
    logging.info(f"Found {len(results_df)} results")
    logging.info(f"results_df columns: {results_df.columns}")
    logging.info(f"results_df head:\n{results_df.head()}")
    return results_df


@pytest.fixture(scope="module")
def scoreboard_df(all_dfs):
    _, _, scoreboard_df = main.normalize_team_page_dfs(all_dfs)
    logging.info(f"scoreboard_df columns: {scoreboard_df.columns}")
    logging.info(f"scoreboard_df head:\n{scoreboard_df.head()}")
    scoreboard_df.set_index("Tým", inplace=True)
    return scoreboard_df


def test_team_page_is_forejt(team_url):
    assert main.TEAM_SLUG in team_url


def test_pitches_df(pitches_df):
    assert len(pitches_df) > 0
    assert all(
        x in pitches_df.columns
        for x in [
            "Název hřiště",
            "Zkratka hřiště",
            "Adresa areálů (hřišť) a\xa0další informace",
            "Zkratka hřiště base",
            "Pure adresa",
            "Desc",
        ]
    )
    assert pitches_df.shape[1] == 6


def test_matches_df(matches_df):
    assert len(matches_df) > 0
    assert all(
        x in matches_df.columns
        for x in [
            "Datum",
            "Čas",
            "Hřiště",
            "Kolo",
            "Název hřiště",
            "Pure adresa",
            "Desc",
        ]
    )


def test_results_df(results_df):
    if results_df is None:
        logging.info("Skipping results_df test because there are no results yet")
        return
    assert all(
        x in results_df.columns
        for x in [
            "Datum",
            "Čas",
            "Hřiště",
            "Kolo",
            "Výsledek",
            "Název hřiště",
            "Pure adresa",
            "Desc",
        ]
    )


def test_scoreboard_df(scoreboard_df):
    # Tým	Odehrané zápasy	Počet výher	Počet remíz	Počet proher	Skóre	Počet bodů
    assert len(scoreboard_df) > 0
    assert all(
        x in scoreboard_df.columns
        for x in [
            "Pořadí",
            "Odehrané zápasy",
            "Počet výher",
            "Počet remíz",
            "Počet proher",
            "Skóre",
            "Počet bodů",
        ]
    )


def test_scoreboard_contains_forejt(scoreboard_df):
    assert main.TEAM_NAME in scoreboard_df.index


def test_get_team_position_points(scoreboard_df):
    pos, points = main.get_team_position_points(scoreboard_df, main.TEAM_NAME)
    assert isinstance(pos, int)
    assert isinstance(points, int)
