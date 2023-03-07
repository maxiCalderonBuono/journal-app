import React from "react";
import { FaRegCalendarPlus } from "react-icons/fa";
import { useBreakpointValue, Icon } from "@chakra-ui/react";
import { FaRegStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { StartNewNote } from "../../actions/notes";

const NothingSelected = () => {
  const icon = useBreakpointValue({ base: FaRegCalendarPlus, md: FaRegStar });
  const newNote = useBreakpointValue({ base: true, md: false });

  const dispatch = useDispatch();

  const handleAddNew = () => {
    dispatch(StartNewNote());
  };

  return (
    <div className="nothing__main-content animate__animated animate__fadeIn animate__fast">
      <p>
        Select something
        <br />
        or create an entry
      </p>
      <Icon
        as={icon}
        w={[16, 16, 20, 20, 20]}
        h={[16, 16, 20, 20, 20]}
        mt={2}
        onClick={newNote ? handleAddNew : null}
      />
    </div>
  );
};

export default NothingSelected;
