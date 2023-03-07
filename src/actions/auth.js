import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { googleAuthProvider } from "../firebase/firebase-config";
import toast from "react-hot-toast";
import { types } from "../types/types";
import { noteLogout } from "./notes";
import { LoginAnimation } from "./ui";

const auth = getAuth();

export const startLoginWithEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(LoginAnimation());
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(LoginAnimation());
      })
      .catch((err) => {
        toast.error(err.message);
        dispatch(LoginAnimation());
      });
  };
};

export const registerWithEmailPassword = (email, password, name) => {
  return (dispatch) => {
    dispatch(LoginAnimation());
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, { displayName: name });
        dispatch(login(user.uid, user.displayName));
        dispatch(LoginAnimation());
      })
      .catch((err) => {
        toast.error(err.message);
        dispatch(LoginAnimation());
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    signInWithPopup(auth, googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout = () => {
  return (dispatch) => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        dispatch(noteLogout());
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
};

export const logout = () => ({
  type: types.logout,
});
