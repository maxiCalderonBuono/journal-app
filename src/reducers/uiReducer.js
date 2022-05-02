import { types } from "../types/types";

const initialState = {
  loading: false,
  msgError: null,
  isNoteCreated: false,
  isLoadingNotes: false,
  isModalOpen: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setUiError:
      return {
        ...state,
        msgError: action.payload,
      };

    case types.removeUiError:
      return {
        ...state,
        msgError: null,
      };
    case types.setUiNoteCreation:
      return {
        ...state,
        isNoteCreated: true,
      };
    case types.removeUiNoteCreation:
      return {
        ...state,
        isNoteCreated: false,
      };

    case types.setUiSidebar:
      return {
        ...state,
        isLoadingNotes: true,
      };

    case types.removeUiSidebar:
      return {
        ...state,
        isLoadingNotes: false,
      };

    case types.openUiModal:
      return {
        ...state,
        isModalOpen: true,
      };
    case types.closeUiModal:
      return {
        ...state,
        isModalOpen: false,
      };

    default:
      return state;
  }
};
