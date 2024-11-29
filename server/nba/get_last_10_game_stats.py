from nba_api.stats.endpoints import playergamelogs
from datetime import datetime

def get_last_10_game_stats(player_id):
    current_year = datetime.now().year
    next_year = current_year + 1
    season = f"{current_year}-{str(next_year)[-2:]}"
    
    try:
        game_logs = playergamelogs.PlayerGameLogs(player_id_nullable=player_id, season_nullable=season)
        game_logs_df = game_logs.get_data_frames()[0]
    except Exception as e:
        print(f"Error fetching game logs for player {player_id}: {e}")
        return ([], {}, {}, {})
    
    if game_logs_df.empty:
        print(f"No game data available for player {player_id} in season {season}.")
        return ([], {}, {}, {})
    
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

    full_game_logs = []
    last_1_game_stats = {}
    last_5_game_stats = {}
    last_10_game_stats = {}

    for i, row in last_10_games_df.iterrows():
        current_game = {
            "PTS": int(row["PTS"]),
            "REB": int(row["REB"]),
            "AST": int(row["AST"]),
            "3PT": int(row["FG3M"]),
            "PR": int(row["PTS"]) + int(row["REB"]),
            "PA":int(row["PTS"]) + int(row["AST"]),
            "RA": int(row["REB"]) + int(row["AST"]),
            "PRA": int(row["PTS"]) + int(row["REB"]) + int(row["AST"]),
            "FS": float(row["NBA_FANTASY_PTS"]),
            "BLK": int(row["BLK"]),
            "STL": int(row["STL"]),
            "SB": int(row["STL"]) + int(row["BLK"]),
            "TO": int(row["TOV"])
        }

        game_stats["PTS"] += current_game["PTS"]
        game_stats["REB"] += current_game["REB"]
        game_stats["AST"] += current_game["AST"]
        game_stats["3PT"] += current_game["3PT"]
        game_stats["FS"] += current_game["FS"]
        game_stats["BLK"] += current_game["BLK"]
        game_stats["STL"] += current_game["STL"]
        game_stats["TO"] += current_game["TO"]
        game_stats["PR"] += current_game["PR"]
        game_stats["PA"] += current_game["PA"]
        game_stats["RA"] += current_game["RA"]
        game_stats["PRA"] += current_game["PRA"]
        game_stats["SB"] += current_game["SB"]

        # TODO: ENSURE THAT AVERAGES ARE CALCULATED PROPERLY, EXAMPLE: ONLY 7 GAMES PLAYED

        if i == 0:
            last_1_game_stats = {key: round(game_stats[key], 1) for key in game_stats}
        
        if i == 4:
            last_5_game_stats = {key: round(game_stats[key] / 5, 1) for key in game_stats}
        
        if i == 9:  
            last_10_game_stats = {key: round(game_stats[key] / 10, 1) for key in game_stats}

        full_game_logs.append(current_game)

    return (full_game_logs, last_1_game_stats, last_5_game_stats, last_10_game_stats)
