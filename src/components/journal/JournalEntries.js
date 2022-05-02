import React from "react";
import { useSelector } from "react-redux";
import GhostNotesContainer from "../animations/GhostNotesContainer";
import JournalEntry from "./JournalEntry";

const JournalEntries = () => {
  const { notes } = useSelector((state) => state.notes);
  const { isLoadingNotes } = useSelector((state) => state.ui);

  return (
    <div className="journal__entries">
       { isLoadingNotes
       ? <GhostNotesContainer /> 
       : notes.map((note) => (
         <JournalEntry key={note.id} {...note} />
       ))}
    </div>
  );
};

export default JournalEntries;
