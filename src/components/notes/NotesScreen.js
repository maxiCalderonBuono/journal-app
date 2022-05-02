import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import NotesAppBar from "./NotesAppBar";
import { activeNote, StartSaveNote } from "../../actions/notes";
import { openModal } from "../../actions/ui";
import Modal from "../modal/Modal";
import { ModalCreator } from "../modal/ModalCreator";
import {AiFillCloseCircle} from 'react-icons/ai';
import { IconContext } from "react-icons";


const NotesScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  const { isModalOpen } = useSelector((state) => state.ui);

  const [formValues, handleInputChange, reset] = useForm(note);

  const { body, title } = formValues;

  const activeId = useRef(note.id);

  const dispatch = useDispatch();

  const [path,setPath] = useState("")
  const [isHover,setIsHover] = useState(null)

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  const handleOpenImage = (e) => {
    setPath(e.target.src)
    dispatch(openModal());
  };

 const handleDelete = (image) => {
  
  const modifiedURL = note.url.filter(url => url !== image)

  const newNote= {...note, url: modifiedURL}

  dispatch( StartSaveNote(newNote))
  dispatch (activeNote(newNote.id, newNote))
 }
 

  return (
    <div className="notes__main-content animate__animated animate__fadeIn animate__fast">
      <NotesAppBar />

      {isModalOpen && (
        <ModalCreator>
          <Modal src={path} />
        </ModalCreator>
      )}

      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awsome title"
          className="notes__title-input"
          name="title"
          value={title}
          onChange={handleInputChange}
        />

        <textarea
          placeholder="What happened today?"
          className="notes__textarea"
          name="body"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {note.url && (
          <fieldset className="notes__container">
            <legend style={{marginLeft:"30px"}}>Files</legend>
            
            {note.url.map((image,index) => (

              <div className="notes__image" onMouseEnter={()=> setIsHover(index)} onMouseLeave={() => setIsHover(null)} >
              <img
                key={index}
                alt="imagen"
                src={image}
                onClick={handleOpenImage}
              />
              { (index === isHover ) ? <IconContext.Provider value={{ className: "notes__close-icon" }}>
               <AiFillCloseCircle onClick={()=>handleDelete(image)} />
               </IconContext.Provider> : null }
              
              </div>
            ))}
          </fieldset>
        )}
      </div>
    </div>
  );
};

export default NotesScreen;
