import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  playerName: string | null;
  lines: Lines | null;
  last1Game: Game | null;
  last5Games: Game | null;
  last10Games: Game | null;
};

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

const marketOrder = [
  "PTS",
  "REB",
  "AST",
  "PRA",
  "PR",
  "PA",
  "RA",
  "3PT",
  "BLK",
  "STL",
  "TO",
  "SB",
  "FS",
];

const PlayerStatsContainer = (props: Props) => {
  const [activeMarket, setActiveMarket] = useState<string | null>(null);

  useEffect(() => {
    if (props.lines) {
      const sortedLines = Object.entries(props.lines).sort(
        ([marketA], [marketB]) =>
          marketOrder.indexOf(marketA) - marketOrder.indexOf(marketB)
      );

      // Set the first market in the sorted lines as the active market
      if (sortedLines.length > 0) {
        setActiveMarket(sortedLines[0][0]); // Set first market as active
      }
    }
  }, [props.lines]);

  if (!props.lines) {
    return <div>Team data not found for {props.playerName}</div>;
  }

  const lines = Object.entries(props.lines).sort(
    ([marketA], [marketB]) =>
      marketOrder.indexOf(marketA) - marketOrder.indexOf(marketB)
  );

  if (!props.last1Game || !props.last5Games || !props.last10Games) {
    return;
  }

  const last1GameStats = Object.entries(props.last1Game).sort(
    ([marketA], [marketB]) =>
      marketOrder.indexOf(marketA) - marketOrder.indexOf(marketB)
  );

  const last5GameStats = Object.entries(props.last5Games).sort(
    ([marketA], [marketB]) =>
      marketOrder.indexOf(marketA) - marketOrder.indexOf(marketB)
  );

  const last10GameStats = Object.entries(props.last10Games).sort(
    ([marketA], [marketB]) =>
      marketOrder.indexOf(marketA) - marketOrder.indexOf(marketB)
  );

  return (
    <>
      <div className="selected-player-stats flex flex-col mx-4 py-8 ">
        <h1 className="self-start text-2xl font-bold">
          {props.playerName || "Select player"}
        </h1>

        <div className="player-markets-container flex flex-row gap-2 overflow-x-auto py-6 ">
          {lines.map(([market, line]) => (
            <Button
              key={market}
              className={`text-sm ${
                activeMarket === market
                  ? "bg-bpYellow text-black"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveMarket(market)}
            >
              {line} - {market}
            </Button>
          ))}
        </div>

        <Table className="text-xs bg-bpDarkSecondary my-2">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] bg-bpDarkSecondary sticky left-0 z-10">
                {/* Sticky Column Header */}
              </TableHead>
              {marketOrder.map((market) => (
                <TableHead className="text-center font-bold text-white">
                  {market}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow className="border-none">
              <TableCell className="bg-bpDarkSecondary sticky left-0 z-10 font-bold">
                L10
              </TableCell>
              {last10GameStats.length > 0
                ? last10GameStats.map(([market, line]) => (
                    <TableCell
                      key={market}
                      className={`font-medium ${
                        activeMarket === market ? "text-bpYellow" : ""
                      }`}
                    >
                      {line}
                    </TableCell>
                  ))
                : marketOrder.map(() => (
                    <TableCell className="text-gray-500">-</TableCell>
                  ))}
            </TableRow>

            <TableRow className="border-none">
              <TableCell className="bg-bpDarkSecondary sticky left-0 z-10 font-bold">
                L5
              </TableCell>
              {last5GameStats.length > 0
                ? last5GameStats.map(([market, line]) => (
                    <TableCell
                      key={market}
                      className={`font-medium ${
                        activeMarket === market ? "text-bpYellow" : ""
                      }`}
                    >
                      {line}
                    </TableCell>
                  ))
                : marketOrder.map(() => <TableCell>-</TableCell>)}
            </TableRow>
            {/* LAST 1 GAME ROW */}
            <TableRow className="border-none">
              <TableCell className="bg-bpDarkSecondary sticky left-0 z-10 font-bold">
                L1
              </TableCell>
              {last1GameStats.length > 0
                ? last1GameStats.map(([market, line]) => (
                    <TableCell
                      key={market}
                      className={`font-medium ${
                        activeMarket === market ? "text-bpYellow" : ""
                      }`}
                    >
                      {line}
                    </TableCell>
                  ))
                : marketOrder.map(() => <TableCell>-</TableCell>)}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default PlayerStatsContainer;
