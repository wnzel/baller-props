import { useEffect, useState } from "react";
import Collapsible from "../../components/Collapsible";
import useGameData from "../../hooks/useGameData";

import { useExtractColors } from "react-extract-colors";

import PlayerHeadshot from "./PlayerHeadshot";
import PlayerStatsContainer from "./PlayerStatsContainer";

interface Props {
  teamId: number;
  teamAbbreviation: string;
  gameTitle: string;
}

interface Lines {
  "3PT": number;
  AST: number;
  BLK: number;
  PA: number;
  PR: number;
  PRA: number;
  PTS: number;
  RA: number;
  REB: number;
  TO: number;
  SB: number;
  STL: number;
}

interface Game {
  "3PT": number;
  AST: number;
  BLK: number;
  PA: number;
  PR: number;
  PRA: number;
  PTS: number;
  RA: number;
  REB: number;
  TO: number;
  SB: number;
  STL: number;
  FS: number;
}

interface PlayerInfo {
  player_id: number;
  lines: Lines;
  last_1_game_stats: Game;
  last_5_game_stats: Game;
  last_10_game_stats: Game;
}

interface TeamData {
  [playerName: string]: PlayerInfo;
}

interface GameData {
  [teamAbbreviation: string]: TeamData;
}

const PlayerPropsContainer = (props: Props) => {
  const { data, isLoading, error } = useGameData();
  const [selectedPlayerLines, setSelectedPlayerLines] = useState<Lines | null>(
    null
  );
  const [selectedPlayerLast1Game, setSelectedPlayer1Game] =
    useState<Game | null>(null);
  const [selectedPlayerLast5Game, setSelectedPlayer5Game] =
    useState<Game | null>(null);
  const [selectedPlayerLast10Game, setSelectedPlayer10Game] =
    useState<Game | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);

  const { dominantColor } = useExtractColors(
    `https://corsproxy.io/?https://cdn.nba.com/logos/nba/${props.teamId}/primary/L/logo.svg`,
    {
      format: "hex",
    }
  );

  useEffect(() => {
    if (dominantColor) {
      setColor(dominantColor);
    }
  }, [dominantColor]);

  // loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading games data</div>;

  // get cached game data
  const gameData = data[props.gameTitle] as GameData;

  if (!gameData) {
    return <div>Game data not found for {props.gameTitle}</div>;
  }

  const teamData = gameData[props.teamAbbreviation];

  if (!teamData) {
    return <div>Team data not found for {props.teamAbbreviation}</div>;
  }

  const players = Object.entries(teamData);

  if (!selectedPlayer && players.length > 0) {
    const [defaultPlayer, defaultPlayerInfo] = players[0];
    setSelectedPlayer(defaultPlayer);
    setSelectedPlayerLines(defaultPlayerInfo.lines);
    setSelectedPlayer1Game(defaultPlayerInfo.last_1_game_stats);
    setSelectedPlayer5Game(defaultPlayerInfo.last_5_game_stats);
    setSelectedPlayer10Game(defaultPlayerInfo.last_10_game_stats);
  }

  return (
    <>
      <Collapsible teamId={props.teamId}>
        <div className="player-headshots-container flex flex-row overflow-x-scroll flex-nowrap player-scrollbar">
          {players.map(([playerName, playerInfo]) => (
            <div
              key={playerName}
              className="flex flex-col flex-shrink-0 cursor-pointer"
              onClick={() => {
                setSelectedPlayer(playerName);
                setSelectedPlayerLines(playerInfo.lines);
                setSelectedPlayer1Game(playerInfo.last_1_game_stats);
                setSelectedPlayer5Game(playerInfo.last_5_game_stats);
                setSelectedPlayer10Game(playerInfo.last_10_game_stats);
              }}
            >
              <PlayerHeadshot
                playerId={playerInfo.player_id}
                playerName={playerName}
                selectedPlayer={selectedPlayer}
                color={color}
              />
            </div>
          ))}
        </div>

        <PlayerStatsContainer
          last1Game={selectedPlayerLast1Game}
          last5Games={selectedPlayerLast5Game}
          last10Games={selectedPlayerLast10Game}
          playerName={selectedPlayer}
          lines={selectedPlayerLines}
        />
      </Collapsible>
    </>
  );
};

export default PlayerPropsContainer;
