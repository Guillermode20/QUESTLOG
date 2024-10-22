import requests
import json

# Headers
headers = {
    "Client-ID": "7sm3u4g0ep9rl57ryjcih9dn922v7d",
    "Authorization": "Bearer gnyzlzay6zboxn07nu89nrldrkdbam",
}

# API endpoint
GenresUrl = "https://api.igdb.com/v4/genres"
PlatformsUrl = "https://api.igdb.com/v4/platforms"


# Request body
body = f"""
    fields name;
    limit 200;
"""

# Make the API request
response = requests.post(GenresUrl, headers=headers, data=body)

# Check if the request was successful
if response.status_code == 200:
    genres = json.loads(response.text)
    with open("genres.json", "w") as f:
        json.dump(genres, f, indent=4)
else:
    print("Error:", response.status_code)

if response.status_code == 200:
    response = requests.post(PlatformsUrl, headers=headers, data=body)
    platforms = json.loads(response.text)
    with open("platforms.json", "w") as f:
        json.dump(platforms, f, indent=4)
else:
    print("Error:", response.status_code)
