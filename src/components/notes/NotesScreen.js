import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import NotesAppBar from "./NotesAppBar";
import { activeNote, StartSaveNote } from "../../actions/notes";
import { openModal } from "../../actions/ui";
import Modal from "../modal/Modal";
import { ModalCreator } from "../modal/ModalCreator";
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { Textarea, Input, useColorModeValue, Box } from "@chakra-ui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const NotesScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  const { isModalOpen } = useSelector((state) => state.ui);

  const [formValues, handleInputChange, reset] = useForm(note);

  const { body, title } = formValues;

  const activeId = useRef(note.id);

  const dispatch = useDispatch();

  const [path, setPath] = useState("");

  const [isHover, setIsHover] = useState(null);

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
    setPath(e.target.src);
    dispatch(openModal());
  };

  const handleDelete = (image) => {
    const modifiedURL = note.url.filter((url) => url !== image);

    const newNote = { ...note, url: modifiedURL };

    dispatch(StartSaveNote(newNote));
  };

  const color = useColorModeValue("back.700", "text.900");
  const bgColor = useColorModeValue("back.200");
  const borderColor = useColorModeValue("back.400");

  return (
    <div className="notes__main-content animate__animated animate__fadeIn animate__fast">
      <NotesAppBar />

      {isModalOpen && (
        <ModalCreator>
          <Modal src={path} />
        </ModalCreator>
      )}

      <Box display="flex" flexDirection="column" h="full" p="20px" bg={bgColor}>
        <Input
          color={color}
          bg={bgColor}
          type="text"
          placeholder="Some awsome title"
          _placeholder={{ opacity: 1, color: "gray.500" }}
          className="notes__title-input"
          name="title"
          value={title}
          onChange={handleInputChange}
          borderColor={borderColor}
        />

        <Textarea
          color={color}
          bg={bgColor}
          placeholder="What happened today?"
          _placeholder={{ opacity: 1, color: "gray.500" }}
          name="body"
          value={body}
          className="notes__textarea"
          onChange={handleInputChange}
          resize="none"
          borderColor={borderColor}
        />

        {note.url && (
          <fieldset className="notes__container" style={{ color: color }}>
            <legend style={{ marginLeft: "30px" }}>Files</legend>
            <Splide
              className="notes_carrousel"
              options={{
                perPage: 4,
                breakpoints: {
                  1024: {
                    perPage: 3,
                    arrows: true,
                  },
                  900: {
                    perPage: 2,
                  },
                  640: {
                    perPage: 1,
                  },
                },
                gap: "1rem",
                arrows: false,
                pagination: false,
                rewind: true,
                drag: "free",
                rewindByDrag: true,
                padding: "1rem",
              }}
              aria-label="My note files"
            >
              {note.url.map((image, index) => (
                <SplideSlide key={index}>
                  <div
                    className="notes__imageContainer"
                    onMouseEnter={() => setIsHover(index)}
                    onMouseLeave={() => setIsHover(null)}
                  >
                    <img
                      alt="imagen"
                      className="notes__image"
                      src={image}
                      onClick={handleOpenImage}
                      draggable="true"
                    />
                    {index === isHover ? (
                      <IconContext.Provider
                        value={{ className: "notes__close-icon" }}
                      >
                        <AiFillCloseCircle
                          onClick={() => handleDelete(image)}
                        />
                      </IconContext.Provider>
                    ) : null}
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          </fieldset>
        )}
      </Box>
    </div>
  );
};

export default NotesScreen;
