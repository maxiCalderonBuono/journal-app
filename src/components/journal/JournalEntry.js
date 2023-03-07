import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes";
import { useColorModeValue, Box, useBreakpointValue } from "@chakra-ui/react";

const JournalEntry = ({ id, date, title, body, url, close }) => {
  const noteDate = moment(date);

  const dispatch = useDispatch();

  const show = useBreakpointValue({ base: true, md: false });

  const handleEntryClick = () => {
    if (show) {
      close();
    }

    dispatch(activeNote(id, { date, title, body, url }));
  };

  const bgColor = useColorModeValue("back.300", "back.600");
  const color = useColorModeValue("back.900", "text.900");

  return (
    <Box
      bg={bgColor}
      color={color}
      onClick={handleEntryClick}
      display="flex"
      overflowY="hidden"
      mb={2.5}
      height="80px"
      width={["100%", "100%", "300px"]}
      borderRadius="4px"
      cursor="pointer"
    >
      {url?.length > 0 && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${url[0]})`,
          }}
        ></div>
      )}
      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>
      <div className="journal__entry-date-box">
        <span>{noteDate.format("dddd")}</span>
        <h4>{noteDate.format("Do")}</h4>
      </div>
    </Box>
  );
};

export default JournalEntry;
