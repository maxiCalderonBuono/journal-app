import React from "react";
import GhostNotes from "./GhostNotes";

const GhostNotesContainer = () => {
  return (
    <div className= "journal__container-ghost">
      <GhostNotes />
      <GhostNotes />
      <GhostNotes />
      <GhostNotes />
    </div>
  );
};

export default GhostNotesContainer;
