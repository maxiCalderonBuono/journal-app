import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StartSaveNote,
  startUploadingPicture,
  startDeleting,
} from "../../actions/notes";
import moment from "moment";
import { Text, Box, useBreakpointValue } from "@chakra-ui/react";

const NotesAppBar = () => {
  const dispatch = useDispatch();

  const { active } = useSelector((state) => state.notes);

  const noteDate = moment(active.date);

  const handleSave = () => {
    dispatch(StartSaveNote(active));
  };

  const handlePictureClick = () => {
    document.querySelector("#fileSelector").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      dispatch(startUploadingPicture(file));
    }
  };

  const handleDelete = () => {
    dispatch(startDeleting(active.id));
  };

  const show = useBreakpointValue({ base: true, sm: false });

  return (
    <Box
      display="flex"
      flexDirection={show ? "column" : "row"}
      justifyContent="space-between"
      alignItems="center"
      bg="primary"
      color="white"
      py="10px"
      px="20px"
    >
      <Text fontSize={["xs", "xs", "sm", "lg"]}>{`Created: ${noteDate.format(
        "dddd, MMMM Do YYYY, h:mm:ss a"
      )}`}</Text>

      <input
        id="fileSelector"
        type="file"
        name="file"
        multiple
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Box pt={show ? "10px" : ""}>
        <button className="btn" onClick={handlePictureClick}>
          Files
        </button>

        <button className="btn" onClick={handleSave}>
          Save
        </button>

        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </Box>
    </Box>
  );
};

export default NotesAppBar;
