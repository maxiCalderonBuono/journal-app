import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StartSaveNote, startUploadingPicture , startDeleting  } from '../../actions/notes';
import moment from "moment";

const NotesAppBar = () => {
    
const dispatch = useDispatch();

const {active} = useSelector(state => state.notes)

const noteDate = moment(active.date)

const handleSave = () => {
    dispatch( StartSaveNote(active))
}

const handlePictureClick = () => {
    document.querySelector("#fileSelector").click();

}

const handleFileChange = (e) => {
   const file= e.target.files[0]

   if (file) {
       dispatch(startUploadingPicture(file))
   }
}

const handleDelete = () => {
    dispatch(startDeleting(active.id))
  }

  return (
  <div className='notes__appbar'>

      <span>{`Created: ${noteDate.format("dddd, MMMM Do YYYY, h:mm:ss a")}`}</span>

      <input 
      id= "fileSelector"
      type= "file"
      name= "file"
      multiple 
      style = {{display: "none"}}
      onChange= {handleFileChange}/>
      <div>
          <button className='btn' onClick={ handlePictureClick }>
              Files
          </button>

          <button className='btn' onClick={handleSave}>
              Save
          </button>

          <button className= "btn btn-danger" onClick= {handleDelete}>
         Delete
      </button>
      </div>

  </div>);
};

export default NotesAppBar;
