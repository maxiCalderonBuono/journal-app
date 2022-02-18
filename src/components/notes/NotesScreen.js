import React from "react";
import NotesAppBar from "./NotesAppBar";

const NotesScreen = () => {
  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awsome title"
          className="notes__title-input"
        />

        <textarea
          placeholder="What happened today?"
          className="notes__textarea"
        ></textarea>

        <div className="notes__image">
          <img
            alt="algo"
            src="http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTsUtvFNQlm8coEDRfNF48_X39iW5tLbiB2dT7i_8UYdE1j6Bn5VhlJ-CsEp8PweSY6RyTbfOn-JLnuOFTDT0I"
          />
        </div>
      </div>
    </div>
  );
};

export default NotesScreen;
