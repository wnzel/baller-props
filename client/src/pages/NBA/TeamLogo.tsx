interface Props {
  teamId: number;
}

const TeamLogo = (props: Props) => {
  return (
    <div>
      <img
        src={`https://cdn.nba.com/logos/nba/${props.teamId}/primary/L/logo.svg`}
        className="w-12 h-12"
        alt="Team Logo"
      />
    </div>
  );
};

export default TeamLogo;
