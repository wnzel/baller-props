from nba_api.stats.endpoints import playergamelogs
from datetime import datetime

def get_last_10_game_stats(player_id):
    current_year = datetime.now().year
    next_year = current_year + 1
    season = f"{current_year}-{str(next_year)[-2:]}"
    
    game_logs = playergamelogs.PlayerGameLogs(player_id_nullable=player_id, season_nullable=season)
    game_logs_df = game_logs.get_data_frames()[0]
    last_10_games_df = game_logs_df.head(10) # only store last 10 games
    
    game_stats = {
        "PTS": 0,
        "REB": 0,
        "AST": 0,
        "3PT": 0,
        "PR": 0,
        "PA": 0,
        "RA": 0,
        "PRA": 0,
        "FS": 0,
        "BLK": 0,
        "STL": 0,
        "SB": 0,
        "TO": 0
    }
    
    last_1_game_stats = {}
    last_5_game_stats = {}
    last_10_game_stats = {}
    
    for i, row in last_10_games_df.iterrows():
        game_stats["PTS"] += int(row["PTS"])
        game_stats["REB"] += int(row["REB"])
        game_stats["AST"] += int(row["AST"])
        game_stats["3PT"] += int(row["FG3M"])
        game_stats["FS"] += float(row["NBA_FANTASY_PTS"])
        game_stats["BLK"] += int(row["BLK"])
        game_stats["STL"] += int(row["STL"])
        game_stats["TO"] += int(row["TOV"])
        game_stats["PR"] += int(row["PTS"]) + int(row["REB"])
        game_stats["PA"] += int(row["PTS"]) + int(row["AST"])
        game_stats["RA"] += int(row["REB"]) + int(row["AST"])
        game_stats["PRA"] += int(row["PTS"]) + int(row["REB"]) + int(row["AST"])
        game_stats["SB"] += int(row["STL"]) + int(row["BLK"])

        if i == 0:
            last_1_game_stats = {key: round(game_stats[key], 1) for key in game_stats}
        
        if i == 4:
            last_5_game_stats = {key: round(game_stats[key] / 5, 1) for key in game_stats}
        
        if i == 9:  
            last_10_game_stats = {key: round(game_stats[key] / 10, 1) for key in game_stats}

    return (last_1_game_stats, last_5_game_stats, last_10_game_stats)
