import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JournalScreen from "../components/journal/JournalScreen";
import AuthRouter from "./AuthRouter";

const AppRouter = () => {
  console.log(Router);

  return (
    <Router>
      <Routes>
        <Route path="/auth/*" element={<AuthRouter />} />

        <Route path="/" element={<JournalScreen />} />

        <Route path="*" element={<JournalScreen />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
