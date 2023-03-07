import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../actions/ui";

const Modal = (props) => {
  const dispatch = useDispatch();

  const { isModalOpen } = useSelector((state) => state.ui);

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  const keyPress = (e) => {
    if (e.key === "Escape" && isModalOpen) {
      dispatch(closeModal());
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPress);

    return () => document.removeEventListener("keydown", keyPress);
  });

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={handleModalClose}></div>
      <Box
        position="fixed"
        left="auto"
        h={[null, null, null, null, "80%"]}
        m="10px"
      >
        <img className="modal-image" alt="imagen" src={props.src} />
      </Box>
    </div>
  );
};

export default Modal;
