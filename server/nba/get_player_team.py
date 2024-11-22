from nba_api.stats.endpoints import commonplayerinfo
from nba_api.stats.static import teams

def get_player_team(player_id):
    player_info = commonplayerinfo.CommonPlayerInfo(player_id=player_id)
    
    player_data = player_info.get_dict()
    team_id = player_data['resultSets'][0]['rowSet'][0][18]
    team_abbreviation = teams.find_team_name_by_id(team_id=team_id)["abbreviation"]

    return team_abbreviation