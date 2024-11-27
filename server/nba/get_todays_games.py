from nba_api.live.nba.endpoints import scoreboard

# games updated at 10am MST 12pm EST
def get_todays_games():
    scoreboard_data = scoreboard.ScoreBoard()

    games = scoreboard_data.get_dict()

    teams_today = []
    for game in games["scoreboard"]["games"]:
        current_game = {
            "away_team": game["awayTeam"]["teamCity"] + " " + game["awayTeam"]["teamName"],
            "home_team": game["homeTeam"]["teamCity"] + " " + game["homeTeam"]["teamName"],
            
            "away_tricode": game["awayTeam"]["teamTricode"],
            "home_tricode": game["homeTeam"]["teamTricode"],

            "away_id": game["awayTeam"]["teamId"],
            "home_id": game["homeTeam"]["teamId"]
        }
        
        teams_today.append(current_game)
    
    return teams_today

print(get_todays_games())