import { useState, useEffect } from "react";
function App() {
  const [gameLines, setGameLines] = useState(null);

  useEffect(() => {
    // test fetch to ensure communication
    fetch("http://127.0.0.1:5000/api/nba/stats")
      .then((response) => response.json())
      .then((data) => setGameLines(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!gameLines) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h1>Game Lines</h1>
        <pre>{JSON.stringify(gameLines, null, 2)}</pre>
      </div>
    </>
  );
}

export default App;
