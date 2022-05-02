import React from "react";
import { useSelector } from "react-redux";
import NotesScreen from "../notes/NotesScreen";
import NothingSelected from "./NothingSelected";
import LoadingScreen from "../../components/animations/LoadingScreen";
import Sidebar from "./Sidebar";


const JournalScreen = () => {
  const { active } = useSelector((state) => state.notes);
  const { isNoteCreated } = useSelector((state) => state.ui);

  return (
    <div className="journal__main-content">
      <Sidebar />

    

      <main>
        {isNoteCreated? (
             <LoadingScreen title = {"Creating new note..."}/>
        ) : active ? (
          <NotesScreen />
        ) : (
          <NothingSelected />
        )}
      </main>
    </div>
  );
};

export default JournalScreen;
