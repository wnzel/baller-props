import time
import requests

from collections import defaultdict
from dotenv import load_dotenv
import os

from .get_player_id import get_player_id
from .get_last_10_game_stats import get_last_10_game_stats
from .get_todays_games import get_todays_games
from .get_player_team import get_player_team

load_dotenv()
API_URL = os.getenv("API_URL")

def format_stats(d):
    if isinstance(d, defaultdict):
        return {k: format_stats(v) for k, v in d.items()}
    return d

# games updated at 10am MST 12pm EST
def get_player_stats():
    teams_today = get_todays_games()

    data = None
    res = requests.get(API_URL)
    if res.status_code == 200:
        data = res.json()
    else:
        print(f"Failed to get data: {res.status_code}")
        data = None
        
    todays_stats = {}

    for game_title in teams_today:      
        if game_title in data: 
            player_stats = defaultdict(lambda: defaultdict(lambda: {"lines": {}, "last_10_game_stats": {}}))
            game_markets = data[game_title]
            
            # loop through each market (P R A 3s)
            for market in game_markets:
                for player in game_markets[market]:
                    player_id = get_player_id(player_name=str(player), threshold=90)
                    team_abbreviation = get_player_team(player_id=player_id)

                    line = game_markets[market][player]["line"]  # get current market line
                    player_stats[team_abbreviation][player]["lines"][market] = float(line)  # add market and line to lines property
                    
                    
                    if not player_stats[team_abbreviation][player]["last_10_game_stats"]:
                        print(f"Fetching stats for {player}")
                        player_stats[team_abbreviation][player]["last_10_game_stats"] = get_last_10_game_stats(player_id)
                        time.sleep(2)
                        
                        
            todays_stats[game_title] = player_stats

    return todays_stats

    ####################################
    # CODE FOR OUTPUTTING TO JSON FILE #
    ####################################
    # output_file = "todays_stats_1.json"

    # with open(output_file, "w") as file:
    #     json.dump(todays_stats, file, indent=4)