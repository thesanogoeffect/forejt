from datetime import datetime, timedelta
import pandas as pd
from pytz import timezone
from icalendar import Calendar, Event
import logging

tz = timezone("Europe/Prague")
email_list = set()
logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s', datefmt='%Y-%m-%d %H:%M:%S')

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

def create_future_events(cal, matches_df):
    for match in matches_df.itertuples(index=True, name='Match'):
        event = Event()
        event.add('summary', f"{match.Index}, {match._5}")
        event.add('location', match._6)
        event.add('description', f"{str(match.Kolo)}.kolo, hřiště: {match.Hřiště}\n{match.Desc.lstrip()}")
        event.add('dtstart', pd.to_datetime(match.Datum + " " + match.Čas, dayfirst=True).tz_localize("Europe/Prague"))
        event.add('dtend', (pd.to_datetime(match.Datum + " " + match.Čas, dayfirst=True) + pd.Timedelta(minutes=75)).tz_localize("Europe/Prague"))
        cal.add_component(event)
    return cal

if __name__ == "__main__":
    try:
        pitches_df = pd.read_html("https://www.psmf.cz/hriste/")[0]
    except Exception as e:
        logging.error(f"An error occurred while reading pitches, is PSMF down?: {e}")
        
    pitches_df["Zkratka hřiště base"] = pitches_df["Zkratka hřiště"].str.extract('(^[A-Z]+)', expand=True)
    pitches_df["Pure adresa"] = pitches_df["Adresa areálů (hřišť) a další informace"].str.extract('(.+Praha \d+)', expand=True)
    pitches_df["Desc"] = pitches_df["Adresa areálů (hřišť) a další informace"].str.replace('(.+Praha \d+)', "", regex=True)

    matches_dfs = pd.read_html("https://www.psmf.cz/souteze/2023-hanspaulska-liga-podzim/7-d/tymy/forejt-fc/")


    matches_df = matches_dfs[3]
    matches_df["Domácí - Hosté"] = matches_df["Domácí - Hosté"].str.replace("  ", " vs. ")
    matches_df["Zkratka hřiště base"] = matches_df["Hřiště"].str.extract('(^[A-Z]+)', expand=True)
    matches_df = matches_df.merge(pitches_df, how='left', on='Zkratka hřiště base')
    matches_df = matches_df.drop(["Adresa areálů (hřišť) a další informace", "Zkratka hřiště", "Zkratka hřiště base"], axis=1)
    matches_df["Datum"] = matches_df["Datum"].str.replace("[A-Za-zÚČá]+", "", regex=True).str.replace('\xa0', '')
    matches_df["Kolo"] = matches_df["Kolo"].astype(int)
    matches_df = matches_df.set_index("Domácí - Hosté")
    print(matches_df.head())


    results_df = matches_dfs[0]
    results_df["Domácí - Hosté"] = results_df["Domácí - Hosté"].str.replace("  ", " vs. ")
    results_df["Zkratka hřiště base"] = results_df["Hřiště"].str.extract('(^[A-Z]+)', expand=True)
    results_df = results_df.merge(pitches_df, how='left', on='Zkratka hřiště base')
    results_df = results_df.drop(["Adresa areálů (hřišť) a další informace", "Zkratka hřiště", "Zkratka hřiště base"], axis=1)
    results_df["Datum"] = results_df["Datum"].str.replace("[A-Za-zÚČá]+", "", regex=True).str.replace('\xa0', '')
    results_df["Kolo"] = results_df["Kolo"].astype(int)
    results_df = results_df.set_index("Domácí - Hosté")
    print(results_df.head())

    cal = Calendar()
    cal['X-WR-CALNAME'] = "FC Forejt"
    cal['VERSION'] = '2.0'
    cal['PRODID'] = '-//Forejt//FC Forejt//CZ'

    try:
        cal = create_past_events(cal, results_df)
    except Exception as e:
        logging.error(f"An error occurred while creating past events: {e}")

    try:
        cal = create_future_events(cal, matches_df)
    except Exception as e:
        logging.error(f"An error occurred while creating future events: {e}")
    
    try:
        with open('forejt.ics', 'wb') as f:
            f.write(cal.to_ical())
        logging.info("Successfully wrote to forejt.ics")
    except Exception as e:
        logging.error(f"An error occurred while writing to file: {e}")

   