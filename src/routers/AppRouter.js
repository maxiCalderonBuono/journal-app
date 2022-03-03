import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JournalScreen from "../components/journal/JournalScreen";
import AuthRouter from "./AuthRouter";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";

const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
      }
    });
  }, []);

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
