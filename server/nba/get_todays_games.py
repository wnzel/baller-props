from nba_api.live.nba.endpoints import scoreboard

# games updated at 10am MST 12pm EST
def get_todays_games():
    scoreboard_data = scoreboard.ScoreBoard()

    games = scoreboard_data.get_dict()

    teams_today = []
    for game in games["scoreboard"]["games"]:
        home = game["homeTeam"]["teamTricode"]
        away = game["awayTeam"]["teamTricode"]
        game = away + " " + home
        teams_today.append(game)
    
    return teams_today