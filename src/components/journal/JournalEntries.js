import React from "react";
import { useSelector } from "react-redux";
import GhostNotesContainer from "../animations/GhostNotesContainer";
import JournalEntry from "./JournalEntry";

const JournalEntries = (props) => {
  const { notes } = useSelector((state) => state.notes);

  const { isLoadingNotes } = useSelector((state) => state.ui);

  return (
    <div className="journal__entries">
      {isLoadingNotes ? (
        <GhostNotesContainer />
      ) : (
        notes.map((note, index) => (
          <JournalEntry key={index} {...note} close={props.close} />
        ))
      )}
    </div>
  );
};

export default JournalEntries;
