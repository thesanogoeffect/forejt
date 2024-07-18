# Forejt - Automated Fixture Calendar

This Python project automates the creation of a fixture calendar for the Forejt FC five-a-side football team, pulling data from the Prague Association of Five-a-side Football (PSMF) website. 

## Features

* **Automatic Data Scraping:** Scrapes match schedules, results, and team standings from the PSMF website.
* **Calendar Generation:**  Creates downloadable calendar files in various formats (e.g., Google Calendar, Apple Calendar, Outlook, iCal).
* **Team Information:** Includes team standings and points information for context.
* **Preseason Handling:** Adapts to preseason schedules and data availability. 

## Technologies Used

* **Python:**  The core logic for data scraping, processing, and calendar generation is implemented in Python. 
* **Pandas:**  Used for efficient data manipulation and analysis of scraped data.
* **icalendar:**  Generates the iCal calendar file with event details.
* **Beautiful Soup:**  Facilitates scraping data from the PSMF website.
* **lxml:** Provides HTML parsing capabilities.
* **Vue.js:**  Used for the front-end interface.

## Usage

**Access the calendar generator at: https://thesanogoeffect.github.io/forejt/**

Simply click on the icon for your desired calendar format to download the automatically generated fixture calendar.

## Contributing

Contributions are welcome! Please feel free to submit pull requests for bug fixes, feature enhancements, or documentation improvements. 

## License

This project is licensed under the MIT License. See the LICENSE file for details.
