# year completed: 2015

import time
import requests
import json

# API endpoint
url = "https://api.igdb.com/v4/games"

# Headers
headers = {
    "Client-ID": "7sm3u4g0ep9rl57ryjcih9dn922v7d",
    "Authorization": "Bearer gnyzlzay6zboxn07nu89nrldrkdbam",
}

# Year to fetch data for
year = 2015


# Function to get the start and end timestamps for a given month
def get_month_timestamps(year, month):
    start_date = int(time.mktime(time.strptime(f"{year}-{month:02d}-01", "%Y-%m-%d")))
    if month == 12:
        end_date = int(time.mktime(time.strptime(f"{year+1}-01-01", "%Y-%m-%d"))) - 1
    else:
        end_date = (
            int(time.mktime(time.strptime(f"{year}-{month+1:02d}-01", "%Y-%m-%d"))) - 1
        )
    return start_date, end_date


all_games = []

for month in range(1, 13):
    start_date, end_date = get_month_timestamps(year, month)

    # Request body
    body = f"""
        fields name, total_rating_count, first_release_date, platforms, multiplayer_modes, involved_companies.company.name, genres;
        where first_release_date >= {start_date} & first_release_date <= {end_date};
        sort total_rating_count desc;
        limit 1;
        """

    # Make the API request
    response = requests.post(url, headers=headers, data=body)

    # Check if the request was successful
    if response.status_code == 200:
        games = json.loads(response.text)
        all_games.extend(games)

# Save all games to a JSON file
with open("games.json", "w") as file:
    json.dump(all_games, file)
