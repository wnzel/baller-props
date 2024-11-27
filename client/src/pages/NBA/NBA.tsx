// import { useEffect, useState } from "react";

const NBAPage = () => {
  // const [gameLines, setGameLines] = useState([]);
  // useEffect(() => {
  //   // test fetch to ensure communication
  //   fetch("http://localhost:8080/api/nba/games")
  //     .then((response) => response.json())
  //     .then((data) => setGameLines(data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  return (
    // <div className="p-4">
    //   <h1 className="text-2xl font-bold mb-4">NBA Stats</h1>
    //   {gameLines ? (
    //     <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
    //       {JSON.stringify(gameLines, null, 2)}
    //     </pre>
    //   ) : (
    //     <p>Loading data...</p>
    //   )}
    // </div>
    <>
      <h1>NBA Page!</h1>
    </>
  );
};

export default NBAPage;
