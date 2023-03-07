import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Box, Image } from "@chakra-ui/react";
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { openModal } from "../../actions/ui";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal/Modal";
import { ModalCreator } from "../modal/ModalCreator";

const Slider = ({ note, setIsHover, handleDelete, isHover }) => {
  const [width, setWidth] = useState(0);

  const [fieldWidth, setFieldWidth] = useState("");

  const carousel = useRef();
  const container = useRef();

  const { isModalOpen } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const [path, setPath] = useState("");

  useEffect(() => {
    setWidth(container.current.scrollWidth - carousel.current.scrollWidth);
    const handleResize = () => {
      setWidth(container.current.scrollWidth - carousel.current.scrollWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (note.url.length === 1) {
      setFieldWidth("fit-content");
    } else if (note.url.length === 2) {
      setFieldWidth("150%");
    } else if (note.url.length === 3) {
      setFieldWidth("200%");
    } else {
      setFieldWidth("250%");
    }
  }, [note.url]);

  const handleOpenImage = (e, image) => {
    setPath(image);
    dispatch(openModal());
  };

  return (
    <>
      {isModalOpen && (
        <ModalCreator>
          <Modal src={path} />
        </ModalCreator>
      )}

      <Box
        as={motion.div}
        cursor="grab"
        whileTap={{ cursor: "grabbing" }}
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        ref={container}
        w={fieldWidth}
      >
        <Box as={motion.div} display="flex" ref={carousel} w="fit-content">
          {note.url.map((image, index) => (
            <Box
              as={motion.div}
              key={index}
              position="relative"
              mx="12px"
              transition="scale .5s ease"
              onMouseEnter={() => setIsHover(index)}
              onMouseLeave={() => setIsHover(null)}
              onDoubleClick={(e) => handleOpenImage(e, image)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.99 }}
            >
              <Image
                alt="imagen"
                src={image}
                h="150px"
                pointerEvents="none"
                objectFit="cover"
                borderRadius="5px"
                boxShadow="18px 16px 22px -17px rgba(0,0,0,0.3)"
              />
              {index === isHover ? (
                <IconContext.Provider
                  value={{ className: "notes__close-icon" }}
                >
                  <AiFillCloseCircle onClick={(e) => handleDelete(e, image)} />
                </IconContext.Provider>
              ) : null}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Slider;
