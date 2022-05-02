import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JournalScreen from "../components/journal/JournalScreen";
import AuthRouter from "./AuthRouter";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import LoadingScreen from "../components/animations/LoadingScreen";
import { startLoadingNotes } from "../actions/notes";



const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);

       dispatch(startLoadingNotes(user.uid))

      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);
    });
  }, [dispatch, setIsLoggedIn, setChecking]);

  if (checking) {
    return  <LoadingScreen title= {"Please wait..."} color= {"#FFFFFF"} bgcolor= {"#363636"} />
  }

  return (
  
      <Router>
        <Routes>
          <Route
            path="/auth/*"
            element={
              <PublicRoutes isAuthenticated={isLoggedIn}>
                <AuthRouter />
              </PublicRoutes>
            }
          />

          <Route
            path="/"
            element={
              <PrivateRoutes isAuthenticated={isLoggedIn}>
                <JournalScreen />
              </PrivateRoutes>
            }
          />

          <Route path="*" element={<JournalScreen />} />
        </Routes>
      </Router>
  
  );
};

export default AppRouter;
