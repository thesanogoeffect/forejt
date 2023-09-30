import pandas as pd
import pytest

'''Currently tests only the scraping part'''


def get_team_position_points(scoreboard_df, team_name):
    # return a tuple containing the team position and points
    # for example: (1, 12)
    team_row = scoreboard_df.loc[team_name]
    return (int(team_row["Pořadí"]), int(team_row["Počet bodů"]))


@pytest.fixture(scope="module")
def all_dfs():
    try:
        dfs = pd.read_html("https://www.psmf.cz/souteze/2023-hanspaulska-liga-podzim/7-d/tymy/forejt-fc/")
        return dfs
    except Exception as e:
        pytest.fail(f"Failed to fetch DataFrames: {e}")

@pytest.fixture(scope="module")
def pitches_df():
    try:
        pitches_df = pd.read_html("https://www.psmf.cz/hriste/")[0]
        pitches_df["Zkratka hřiště base"] = pitches_df["Zkratka hřiště"].str.extract('(^[A-Z]+)', expand=True)
        pitches_df["Pure adresa"] = pitches_df["Adresa areálů (hřišť) a další informace"].str.extract('(.+Praha \d+)', expand=True)
        pitches_df["Desc"] = pitches_df["Adresa areálů (hřišť) a další informace"].str.replace('(.+Praha \d+)', "", regex=True)
        return pitches_df
    except Exception as e:
        pytest.fail(f"Failed to fetch pitches DataFrame: {e}")


@pytest.fixture(scope="module")
def matches_df(all_dfs, pitches_df):
    matches_df = all_dfs[3]
    matches_df["Domácí - Hosté"] = matches_df["Domácí - Hosté"].str.replace("  ", " vs. ")
    matches_df["Zkratka hřiště base"] = matches_df["Hřiště"].str.extract('(^[A-Z]+)', expand=True)
    matches_df = matches_df.merge(pitches_df, how='left', on='Zkratka hřiště base')
    matches_df = matches_df.drop(["Adresa areálů (hřišť) a další informace", "Zkratka hřiště", "Zkratka hřiště base"], axis=1)
    matches_df["Datum"] = matches_df["Datum"].str.replace("[A-Za-zÚČá]+", "", regex=True).str.replace('\xa0', '')
    matches_df["Kolo"] = matches_df["Kolo"].astype(int)
    matches_df = matches_df.set_index("Domácí - Hosté")
    return matches_df

@pytest.fixture(scope="module")
def results_df(all_dfs, pitches_df):
    results_df = all_dfs[0]
    results_df["Domácí - Hosté"] = results_df["Domácí - Hosté"].str.replace("  ", " vs. ")
    results_df["Zkratka hřiště base"] = results_df["Hřiště"].str.extract('(^[A-Z]+)', expand=True)
    results_df = results_df.merge(pitches_df, how='left', on='Zkratka hřiště base')
    results_df = results_df.drop(["Adresa areálů (hřišť) a další informace", "Zkratka hřiště", "Zkratka hřiště base"], axis=1)
    results_df["Datum"] = results_df["Datum"].str.replace("[A-Za-zÚČá]+", "", regex=True).str.replace('\xa0', '')
    results_df["Kolo"] = results_df["Kolo"].astype(int)
    results_df = results_df.set_index("Domácí - Hosté")
    return results_df

@pytest.fixture(scope="module")
def scoreboard_df(all_dfs):
    scoreboard_df = all_dfs[2]
    scoreboard_df.set_index("Tým", inplace=True)
    return scoreboard_df

def test_pitches_df(pitches_df):
    assert len(pitches_df) > 0
    assert all(x in pitches_df.columns for x in ['Název hřiště', 'Zkratka hřiště', 'Adresa areálů (hřišť) a další informace', 'Zkratka hřiště base', 'Pure adresa', 'Desc'])
    assert pitches_df.shape[1] == 6

def test_matches_df(matches_df):
    assert matches_df.shape[1] == 7
    assert all(x in matches_df.columns for x in ['Datum', 'Čas', 'Hřiště', 'Kolo', 'Název hřiště', 'Pure adresa', 'Desc'])


def test_results_df(results_df):
    assert results_df.shape[1] == 8
    assert all(x in results_df.columns for x in ['Datum', 'Čas', 'Hřiště', 'Kolo', 'Výsledek', 'Název hřiště', 'Pure adresa', 'Desc'])

def test_scoreboard_df(scoreboard_df):
    # Tým	Odehrané zápasy	Počet výher	Počet remíz	Počet proher	Skóre	Počet bodů
    assert scoreboard_df.shape[1] == 7
    assert all(x in scoreboard_df.columns for x in ['Pořadí', 'Odehrané zápasy', 'Počet výher', 'Počet remíz', 'Počet proher', 'Skóre', 'Počet bodů'])