from fastapi import FastAPI
from fastapi_utilities import repeat_every

from nba.get_todays_games import get_todays_games
from nba.nba_stats import get_player_stats

app = FastAPI()

STATS_CACHE = {}

@app.on_event("startup")
@repeat_every(seconds=450)
def cache_player_stats():
    global STATS_CACHE
    print("Fetching stats. . .")
    STATS_CACHE = get_player_stats()
    print("Finished caching")

@app.get("/api/nba/games")
def todays_games():
    games = get_todays_games()
    return games

@app.get("/api/nba/stats")
def player_stats():
    return STATS_CACHE

##############################
# FOR LOCAL DEVELOPMENT ONLY #
##############################
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8080)