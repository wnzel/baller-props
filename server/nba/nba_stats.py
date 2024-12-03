import time
import random
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
    delay = random.uniform(0.25, 0.5)
    teams_today = get_todays_games()

    data = None
    res = requests.get(API_URL)
    if res.status_code == 200:
        data = res.json()
    else:
        print(f"Failed to get data: {res.status_code}")
        data = None
        
    todays_stats = {}

    for game in teams_today:
        game_title = game["away_tricode"] + " " + game["home_tricode"]      
        if game_title in data: 
            player_stats = defaultdict(lambda: defaultdict(lambda: {"lines": {}, "player_id": None, "last_10_game_stats": {}}))
            players = data[game_title]
            
            for player in players:
                time.sleep(delay)
                player_id = get_player_id(player_name=str(player), threshold=90)

                if player_id == None:
                    print(f"No ID for: {str(player)}")
                    continue # skip current player

                team_abbreviation = get_player_team(player_id)
                player_stats[team_abbreviation][player]["player_id"] = player_id
                player_stats[team_abbreviation][player]["lines"] = players[player]
                
                time.sleep(delay)
                full_10_game_logs, last_1_game_stats, last_5_game_stats, last_10_game_stats = get_last_10_game_stats(player_id)
                player_stats[team_abbreviation][player]["last_1_game_stats"] = last_1_game_stats
                player_stats[team_abbreviation][player]["last_5_game_stats"] = last_5_game_stats
                player_stats[team_abbreviation][player]["last_10_game_stats"] = last_10_game_stats
                player_stats[team_abbreviation][player]["full_10_game_logs"] = full_10_game_logs
         
            todays_stats[game_title] = player_stats

    return todays_stats

    ####################################
    # CODE FOR OUTPUTTING TO JSON FILE #
    ####################################
    # output_file = "todays_stats_1.json"

    # with open(output_file, "w") as file:
    #     json.dump(todays_stats, file, indent=4)