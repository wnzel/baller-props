type Props = {
  selectedPlayer: string | null;
  playerName: string;
  playerId: number;
  color: string | null;
};

const PlayerHeadshot = (props: Props) => {
  return (
    <>
      <img
        style={{
          backgroundImage:
            props.selectedPlayer === props.playerName
              ? `linear-gradient(to top, ${
                  props.color || "#000000"
                }, transparent)`
              : "none",
          transition:
            "background-image 0.5s ease-in-out, transform 0.5s ease-in-out",
          transform:
            props.selectedPlayer === props.playerName
              ? "scale(1.01)"
              : "scale(1)",
        }}
        className={`w-48 transition-all`}
        src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${props.playerId}.png`}
        alt={props.playerName}
      />
      <span
        className={`text-sm font-semibold py-2 bg-black ${
          props.selectedPlayer === props.playerName ? "" : ""
        }`}
      >
        {props.playerName}
      </span>
    </>
  );
};

export default PlayerHeadshot;
