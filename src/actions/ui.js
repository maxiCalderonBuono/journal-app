import { types } from "../types/types";

export const setUiError = (e) => ({
  type: types.setUiError,
  payload: e,
});

export const removeUiError = () => ({
  type: types.removeUiError,
});

export const createNoteUi = () => ({
  type: types.setUiNoteCreation,
});

export const removeNoteUi = () => ({
  type: types.removeUiNoteCreation,
});

export const createSidebarUi = () => ({
  type: types.setUiSidebar,
});

export const removeSidebarUi = () => ({
  type: types.removeUiSidebar
});

export const openModal = () => ({
  type: types.openUiModal
});

export const closeModal = () => ({
  type: types.closeUiModal
});