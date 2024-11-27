from nba_api.stats.endpoints import playergamelogs
from datetime import datetime

def get_last_10_game_stats(player_id):
    current_year = datetime.now().year
    next_year = current_year + 1
    season = f"{current_year}-{str(next_year)[-2:]}"
    
    game_logs = playergamelogs.PlayerGameLogs(player_id_nullable=player_id, season_nullable=season)
    game_logs_df = game_logs.get_data_frames()[0]
    last_10_games_df = game_logs_df.head(10) # only store last 10 games
    
    last_10_game_stats = []
    for _, row in last_10_games_df.iterrows():
        points = row["PTS"]
        rebounds = row["REB"]
        assists = row["AST"]
        threes_made = row["FG3M"]
        fantasy_score = row["NBA_FANTASY_PTS"]
        blocks = row["BLK"]
        steals = row["STL"]
        turnovers = row["TOV"]
        
        game_stats = {
            "PTS": points,
            "REB": rebounds,
            "AST": assists,
            "3PT": threes_made,
            "PR": points + rebounds,
            "PA": points + assists,
            "RA": rebounds + assists,
            "PRA": points + rebounds + assists,
            "FS": fantasy_score,
            "BLK": blocks,
            "STL": steals,
            "SB": steals + blocks,
            "TO": turnovers
        }
        
        last_10_game_stats.append(game_stats)
    return last_10_game_stats