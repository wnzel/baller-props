from nba_api.stats.endpoints import scoreboardv2
from nba_api.stats.static import teams
from datetime import datetime

def get_full_team_name(team_id):
    return teams.find_team_name_by_id(team_id=team_id)["full_name"]

def get_team_tricode(team_id):
    return teams.find_team_name_by_id(team_id=team_id)["abbreviation"]

# games updated at 10am MST 12pm EST
def get_todays_games():
    target_date = datetime.now()
    date_str = target_date.strftime("%Y-%m-%d")
    
    scoreboard_data = scoreboardv2.ScoreboardV2(game_date=date_str)
    games = scoreboard_data.get_data_frames()[0]

    teams_today = []
    for _, row in games.iterrows():
        game_date = row["GAME_DATE_EST"]
        game_date_object = datetime.strptime(game_date, "%Y-%m-%dT%H:%M:%S")
        formatted_game_date = game_date_object.strftime("%b %d")
        
        current_game = {
            "game_date_est": row["GAME_DATE_EST"],
            "formatted_date": formatted_game_date,
            "game_status": row["GAME_STATUS_ID"], # 1 not started, 2 live, 3 finished
            
            "home_id": row["HOME_TEAM_ID"],
            "away_id": row["VISITOR_TEAM_ID"],
            
            "home_team": get_full_team_name(int(row["HOME_TEAM_ID"])),
            "away_team": get_full_team_name(int(row["VISITOR_TEAM_ID"])),
            
            "home_tricode": get_team_tricode(int(row["HOME_TEAM_ID"])),
            "away_tricode": get_team_tricode(int(row["VISITOR_TEAM_ID"]))
        }
        
        teams_today.append(current_game)
    
    return teams_today
