import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StartSaveNote,
  startUploadingPicture,
  startDeleting,
} from "../../actions/notes";
import moment from "moment";
import { Text, Box, useBreakpointValue } from "@chakra-ui/react";
import toast from "react-hot-toast";

const NotesAppBar = () => {
  const dispatch = useDispatch();

  const { active } = useSelector((state) => state.notes);

  const noteDate = moment(active.date);
  const updateDate = moment(active.update);

  const handleSave = () => {
    dispatch(StartSaveNote(active));
  };

  const handlePictureClick = () => {
    document.querySelector("#fileSelector").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (active.url.length >= 4) {
      toast.error(
        "Can not upload a new image (max 4). Please delete one and try again"
      );
      return;
    }

    if (file) {
      dispatch(startUploadingPicture(file));
    }
  };

  const handleDelete = () => {
    dispatch(startDeleting(active.id));
  };

  const show = useBreakpointValue({
    base: true,
    sm: false,
    md: true,
    lg: false,
  });

  return (
    <Box
      display="flex"
      flexDirection={show ? "column" : "row"}
      flexWrap="wrap"
      justifyContent={["center", "space-between", "space-between"]}
      alignItems="center"
      bg="primary"
      color="white"
      py="10px"
      px="20px"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems={["center", "flex-start", "center", "flex-start"]}
      >
        <Text
          fontSize={["xs", "xs", "sm", "lg", "lg"]}
        >{`Created: ${noteDate.format("dddd, MMMM Do YYYY, h:mm:ss a")}`}</Text>
        <Text fontSize="xs">{`Updated: ${updateDate.format(
          "MMMM Do YYYY, h:mm:ss a"
        )}`}</Text>
      </Box>
      <input
        id="fileSelector"
        type="file"
        name="file"
        multiple
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Box pt={show ? "10px" : ""} textAlign="center">
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
