import { db } from "../firebase/firebase-config";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { types } from "../types/types";
import {
  createNoteUi,
  removeNoteUi,
  createSidebarUi,
  removeSidebarUi,
} from "./ui";
import { loadNotes } from "../helpers/loadNotes";
import toast from "react-hot-toast";
import { fileUploader } from "../helpers/fileUploader";

export const StartNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(createNoteUi());

    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
      url: [],
    };

    const docRef = await addDoc(
      collection(db, `${uid}`, "journal/notes"),
      newNote
    );

    dispatch(activeNote(docRef.id, newNote));
    dispatch(addNewNote(docRef.id, newNote));
    dispatch(removeNoteUi());
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const refreshNote = (id, note) => ({
  type: types.notesUpdate,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    dispatch(createSidebarUi());

    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));

    dispatch(removeSidebarUi());
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const StartSaveNote = (note) => {
  return async (dispatch, getState) => {
    toast.loading("Please wait, saving file");

    const { uid } = getState().auth;

    if (!note.url) {
      delete note.url;
    }

    const noteToFirestore = { ...note, update: new Date().getTime() };

    delete noteToFirestore.id;

    const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);

    await updateDoc(noteRef, noteToFirestore);

    dispatch(refreshNote(note.id, noteToFirestore));
    dispatch(activeNote(note.id, noteToFirestore));

    toast.dismiss();
    toast.success("Your note has been successfully saved");
  };
};

export const startUploadingPicture = (file) => {
  return async (dispatch, getState) => {
    toast.loading("Please wait, uploading file");

    const { active } = getState().notes;

    if (!active.url) {
      active.url = [];
    }

    const fileURL = await fileUploader(file);
    active.url = [fileURL, ...active.url];

    dispatch(StartSaveNote(active));
    dispatch(refreshNote(active.id, active));
    dispatch(activeNote(active.id, active));

    toast.dismiss();
    toast.success("Got the data!");
  };
};

export const startDeleting = (id) => {
  toast.loading("Please wait, deleting file");

  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    const path = `${uid}/journal/notes/${id}`;

    await deleteDoc(doc(db, path));

    dispatch(deleteNote(id));

    toast.dismiss();
    toast.success("Done!");
  };
};

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const noteLogout = () => ({
  type: types.notesLogoutCleaning,
});
