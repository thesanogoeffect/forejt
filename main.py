"""Forejt FC - Automated Fixture Calendar.

Scrapes PSMF (Prague five-a-side football association) data for Forejt FC and
generates forejt.ics. The team page URL is resolved automatically: we find the
most recent season on psmf.cz, then search that season's league pages for the
Forejt FC team page, so the script keeps working across seasons without
hardcoded URLs (a season URL change broke the pipeline in 2026, see commit
history).
"""
from datetime import datetime
import json
import os
import re
import time
import logging

import pandas as pd
from pytz import timezone
from icalendar import Calendar, Event
import requests

TEAM_NAME = "Forejt FC"
TEAM_SLUG = "forejt-fc"
BASE_URL = "https://www.psmf.cz"
SEASON_SLUG_RE = r"(\d{4})-hanspaulska-liga-(podzim|jaro)"
CACHE_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "team_url.json")

tz = timezone("Europe/Prague")
logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s', datefmt='%Y-%m-%d %H:%M:%S')

_session = requests.Session()
_session.headers["User-Agent"] = "Mozilla/5.0 (forejt-ics-bot)"


def get(url, timeout=None, max_retries=None):
    """GET with retry, since PSMF is flaky (intermittent timeouts / 5xx).

    timeout/max_retries are overridable so tests can fail fast (e.g.
    FOREJT_MAX_RETRIES=1) while production keeps its full retry budget.
    """
    timeout = timeout or int(os.environ.get("FOREJT_TIMEOUT", "30"))
    max_retries = max_retries or int(os.environ.get("FOREJT_MAX_RETRIES", "4"))
    last_err = None
    for attempt in range(max_retries):
        try:
            r = _session.get(url, timeout=timeout)
            r.raise_for_status()
            return r
        except requests.RequestException as e:
            last_err = e
            logging.warning(f"GET {url} failed (attempt {attempt + 1}/{max_retries}): {e}")
            time.sleep(5 * (attempt + 1))
    if last_err is None:
        raise RuntimeError("GET failed without an error (unexpected)")
    raise last_err


def candidate_season_slugs():
    """Likely PSMF season slugs, most likely first (e.g. ['2026-podzim', ...]).

    podzim (autumn) is active July-December, jaro (spring) January-June.
    """
    now = datetime.now()
    current = "podzim" if now.month >= 7 else "jaro"
    year = now.year
    slugs = [f"{year}-{current}", f"{year}-{'jaro' if current == 'podzim' else 'podzim'}"]
    if current == "jaro" and now.month < 3:
        # January/February: spring may not have started yet; last autumn is
        # still the active half-season.
        slugs.insert(0, f"{year - 1}-podzim")
    return slugs


def load_cached_team_url():
    """Return the cached team URL only if it belongs to the current season."""
    try:
        with open(CACHE_FILE) as f:
            cache = json.load(f)
    except (OSError, ValueError):
        return None
    if cache.get("season") != candidate_season_slugs()[0]:
        logging.info("Cache is from another season, re-searching")
        return None
    return cache.get("team_url")


def save_cached_team_url(team_url):
    with open(CACHE_FILE, "w") as f:
        json.dump(
            {"team_url": team_url, "season": candidate_season_slugs()[0],
             "resolved_at": datetime.now().isoformat()},
            f,
        )


def find_team_url():
    """Resolve the current Forejt FC team page.

    Prefers the cached URL (fast path); falls back to a live search when the
    cached page is gone or no cache exists.
    """
    cached = load_cached_team_url()
    if cached:
        try:
            r = get(cached)
            if "Chyba 404" not in r.text:
                logging.info(f"Using cached team URL: {cached}")
                return cached
            logging.warning("Cached team URL 404s, searching...")
        except requests.RequestException as e:
            logging.warning(f"Cached team URL no longer works ({e}), searching...")

    for slug in candidate_season_slugs():
        season_path = slug.replace('-', '-hanspaulska-liga-', 1)
        season_url = f"{BASE_URL}/souteze/{season_path}/"
        logging.info(f"Searching season page: {season_url}")
        try:
            html = get(season_url).text
        except requests.RequestException as e:
            logging.warning(f"Could not fetch {season_url}: {e}")
            continue

        # The season page links every team directly, e.g.
        # /souteze/<season-path>/6-e/tymy/forejt-fc/ — as relative or
        # absolute hrefs. Fast path: no per-group probing.
        team_links = sorted({
            f"{BASE_URL}{m.group(1)}" for m in re.finditer(
                rf'href="(?:https://www\.psmf\.cz)?(/souteze/{re.escape(season_path)}/[^/]+/tymy/{re.escape(TEAM_SLUG)}/)"', html)
        })
        for team_url in team_links:
            r = get(team_url)
            if r.status_code == 200 and "Chyba 404" not in r.text:
                logging.info(f"Found team page: {team_url}")
                save_cached_team_url(team_url)
                return team_url

        # Fallback: probe each league group for the team page.
        # Group links look like /souteze/<season-path>/6-e/ (relative or
        # absolute).
        group_links = sorted({
            f"{BASE_URL}{m.group(1)}" for m in re.finditer(
                rf'href="(?:https://www\.psmf\.cz)?(/souteze/{re.escape(season_path)}/[a-z0-9-]+/)"', html)
        })
        for group_url in group_links:
            team_url = f"{group_url}tymy/{TEAM_SLUG}/"
            try:
                r = get(team_url)
            except requests.RequestException as e:
                logging.debug(f"Fetch failed for {team_url}: {e}")
                continue
            if r.status_code == 200 and "Chyba 404" not in r.text:
                logging.info(f"Found team page: {team_url}")
                save_cached_team_url(team_url)
                return team_url

    raise RuntimeError(
        f"Could not find the {TEAM_NAME} team page on PSMF. Season URL or "
        "page layout may have changed — update the search in find_team_url()."
    )


def create_past_events(cal, results_df):
    for match in results_df.itertuples(index=True, name='Match'):
        event = Event()
        event.add('summary', f"{match.Index} ({match.Výsledek}), {match._6}")
        event.add('location', match._7)
        event.add('description', f"{str(match.Kolo)}.kolo, hřiště: {match.Hřiště}\n{match.Desc.lstrip()}")
        event.add('dtstart', pd.to_datetime(match.Datum + " " + match.Čas, dayfirst=True).tz_localize("Europe/Prague"))
        event.add('dtend', (pd.to_datetime(match.Datum + " " + match.Čas, dayfirst=True) + pd.Timedelta(minutes=75)).tz_localize("Europe/Prague"))
        cal.add_component(event)
    return cal


def get_team_position_points(scoreboard_df, team_name):
    # return a tuple containing the team position and points
    # for example: (1, 12)
    team_row = scoreboard_df.loc[team_name]
    # Values may be floats (read_html) or trailing-dot strings ("7.");
    # cast through float so either becomes a clean int.
    return (
        int(float(team_row["Pořadí"])),
        int(float(team_row["Počet bodů"])),
    )


def create_future_events(cal, matches_df, scoreboard_df):
    for match in matches_df.itertuples(index=True, name='Match'):
        event = Event()
        team_1 = match.Index.split(" vs. ")[0].strip()
        team_2 = match.Index.split(" vs. ")[1].strip()
        team_1_pos, team_1_points = get_team_position_points(scoreboard_df, team_1)
        team_2_pos, team_2_points = get_team_position_points(scoreboard_df, team_2)
        event.add('summary', f"{team_1} ({team_1_pos}.) vs. {team_2} ({team_2_pos}.), {match._5}")
        event.add('location', match._6)
        event.add('description', f"{str(match.Kolo)}.kolo, hřiště: {match.Hřiště}\n\n{team_1}: {team_1_pos}., {team_1_points}b vs. {team_2}: {team_2_pos}., {team_2_points}b\n\n{match.Desc.lstrip()}")
        event.add('dtstart', pd.to_datetime(match.Datum + " " + match.Čas, dayfirst=True).tz_localize("Europe/Prague"))
        event.add('dtend', (pd.to_datetime(match.Datum + " " + match.Čas, dayfirst=True) + pd.Timedelta(minutes=75)).tz_localize("Europe/Prague"))
        cal.add_component(event)
    return cal


def normalize_team_page_dfs(dfs):
    """Map a team page's tables to (results_df, upcoming_df, scoreboard_df).

    Tables are identified by their columns, not by position:
      - results: has both 'Domácí - Hosté' and 'Výsledek'
      - upcoming: has 'Domácí - Hosté' but no 'Výsledek'
      - scoreboard: has 'Tým'
    """
    results_df, upcoming_df, scoreboard_df = None, None, None
    for df in dfs:
        cols = set(df.columns)
        if "Domácí - Hosté" in cols and "Výsledek" in cols and results_df is None:
            results_df = df
        elif "Domácí - Hosté" in cols and "Výsledek" not in cols and upcoming_df is None:
            upcoming_df = df
        elif "Tým" in cols and scoreboard_df is None:
            scoreboard_df = df
    if upcoming_df is None:
        raise RuntimeError("Could not find the upcoming matches table on the team page (site layout change?)")
    if scoreboard_df is None:
        raise RuntimeError("Could not find the scoreboard table on the team page (site layout change?)")
    return results_df, upcoming_df, scoreboard_df


def prepare_match_df(df, pitches_df):
    df["Domácí - Hosté"] = df["Domácí - Hosté"].str.replace("  ", " vs. ")
    df["Zkratka hřiště base"] = df["Hřiště"].str.extract('(^[A-Z]+)', expand=True)
    df = df.merge(pitches_df, how='left', on='Zkratka hřiště base')
    df = df.drop(["Adresa areálů (hřišť) a\xa0další informace", "Zkratka hřiště", "Zkratka hřiště base"], axis=1)
    df["Datum"] = df["Datum"].str.replace("[A-Za-zÚČá]+", "", regex=True).str.replace('\xa0', '')
    # Kolo may arrive as a float (read_html) or a trailing-dot string ("4."):
    # cast through float so either form becomes a clean int.
    df["Kolo"] = df["Kolo"].astype(float).astype(int)
    df = df.set_index("Domácí - Hosté")
    return df


if __name__ == "__main__":
    team_url = find_team_url()
    logging.info(f"Fetching team page: {team_url}")

    logging.info("Fetching pitches...")
    try:
        pitches_df = pd.read_html(f"{BASE_URL}/hriste/")[0]
    except Exception as e:
        logging.error(f"An error occurred while reading pitches, is PSMF down?: {e}")
        raise
    pitches_df["Zkratka hřiště base"] = pitches_df["Zkratka hřiště"].str.extract(r"(^[A-Z]+)", expand=True)
    pitches_df["Pure adresa"] = pitches_df["Adresa areálů (hřišť) a\xa0další informace"].str.extract(r"(.+Praha \d+)", expand=True)
    pitches_df["Desc"] = pitches_df["Adresa areálů (hřišť) a\xa0další informace"].str.replace(r"(.+Praha \d+)", "", regex=True)

    logging.info("Successfully read pitches")
    logging.info(f"Found {len(pitches_df)} pitches")

    dfs = pd.read_html(team_url)
    results_df, upcoming_df, scoreboard_df = normalize_team_page_dfs(dfs)

    matches_df = prepare_match_df(upcoming_df, pitches_df)
    logging.info(f"Found {len(matches_df)} upcoming matches")
    logging.info(f"matches_df columns: {matches_df.columns}")
    logging.info(f"matches_df head:\n{matches_df.head()}")

    if results_df is not None:
        results_df = prepare_match_df(results_df, pitches_df)
        logging.info(f"Found {len(results_df)} results")
        logging.info(f"results_df head:\n{results_df.head()}")
    else:
        logging.info("No results yet this season (preseason)")

    scoreboard_df.set_index("Tým", inplace=True)

    cal = Calendar()
    cal['X-WR-CALNAME'] = "FC Forejt"
    cal['VERSION'] = '2.0'
    cal['PRODID'] = '-//Forejt//FC Forejt//CZ'

    if results_df is not None:
        try:
            cal = create_past_events(cal, results_df)
        except Exception as e:
            logging.warning(f"An error occurred while creating past events: {e}")

    try:
        cal = create_future_events(cal, matches_df, scoreboard_df)
    except Exception as e:
        logging.warning(f"An error occurred while creating future events: {e}")

    if len(cal.subcomponents) == 0:
        logging.error("No events were created, exiting...")
        raise SystemExit(1)

    with open('forejt.ics', 'wb') as f:
        f.write(cal.to_ical())
    logging.info(f"Successfully wrote forejt.ics with {len(cal.subcomponents)} events")
