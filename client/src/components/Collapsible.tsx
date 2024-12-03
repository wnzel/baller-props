import React, { useState } from "react";
import "../styles/collapsible.css";
import TeamLogo from "../pages/NBA/TeamLogo";

type CollapsibleProps = {
  children: React.ReactNode;
  teamId: number;
};

const Collapsible: React.FC<CollapsibleProps> = ({ teamId, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible-container mx-4 bg-bpDarkSecondary rounded-lg">
      <div className="collapsible-header font-semibold px-4 flex flex-row justify-between items-center text-white">
        <TeamLogo teamId={teamId}></TeamLogo>

        <button className="collapsible-toggle" onClick={toggleCollapse}>
          {isOpen ? "Close Props" : "View Props"}
        </button>
      </div>
      <div
        className={`collapsible-content ${
          isOpen ? "open max-h-[1000px]" : "closed max-h-0"
        }`}
      >
        <div className="collapsible-inner">{children}</div>
      </div>
    </div>
  );
};

export default Collapsible;
