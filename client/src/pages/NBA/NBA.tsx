import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import PlayerPropsContainer from "./PlayerPropsContainer";

interface Games {
  away_id: number;
  away_team: string;
  away_tricode: string;
  home_id: number;
  home_team: string;
  home_tricode: string;
  game_status: number;
}

const NBAPage = () => {
  const [games, setGames] = useState<Games[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["todays_games"],
    queryFn: () => {
      const d = fetch(`${import.meta.env.VITE_GAMES_URL}`).then((res) =>
        res.json()
      );
      return d;
    },
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setGames(data);
    }
  }, [data, games]);

  if (isLoading) return <div>Loading . . .</div>;
  if (isError) return <div>Error!</div>;
  if (games == null) return null;

  return (
    <>
      <div className="my-36 mx-auto text-center flex flex-col gap-16">
        {games.length > 0 ? (
          games.map(
            (game, index) =>
              game.game_status < 2 && (
                <div className="flex flex-col gap-6" key={index}>
                  {/* container for game title */}
                  <div className="flex font-bold text-lg justify-center">
                    <h1 className="game-title-desktop">
                      {`${game.away_team}`} @ {`${game.home_team}`}
                    </h1>
                    <h1 className="game-title-mobile">
                      {`${game.away_tricode}`} @ {`${game.home_tricode}`}
                    </h1>
                  </div>

                  <PlayerPropsContainer
                    teamId={game.away_id}
                    teamAbbreviation={game.away_tricode}
                    gameTitle={game.away_tricode + " " + game.home_tricode}
                  />

                  <PlayerPropsContainer
                    teamId={game.home_id}
                    teamAbbreviation={game.home_tricode}
                    gameTitle={game.away_tricode + " " + game.home_tricode}
                  />
                </div>
              )
          )
        ) : (
          <p>No Games Today. . .</p>
        )}
      </div>
    </>
  );
};

export default NBAPage;
