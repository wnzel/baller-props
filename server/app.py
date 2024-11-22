from flask import Flask, jsonify
from flask_cors import CORS

from nba.get_todays_games import get_todays_games
from nba.nba_stats import get_player_stats

app = Flask(__name__)
CORS(app)

STATS_CACHE = None

def cache_player_stats():
    global STATS_CACHE
    print("Fetching stats. . .")
    STATS_CACHE = get_player_stats()
    print("Finished caching")
    
# cache stats for frontend
cache_player_stats()

@app.route("/api/nba", methods=["GET"])
def game_lines():
    return jsonify({"message": "Data from backend"})

@app.route("/api/nba/games", methods=["GET"])
def todays_games():
    games = get_todays_games()
    return jsonify(games)

@app.route("/api/nba/stats", methods=["GET"])
def player_stats():
    return STATS_CACHE

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)