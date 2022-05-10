import {
  Icon,
  useColorMode,
  useColorModeValue,
  Box,
  useDisclosure,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import { StartNewNote } from "../../actions/notes";
import JournalEntries from "./JournalEntries";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { BiMenuAltLeft } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

const Sidebar = () => {
  const dispatch = useDispatch();

  const { name } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleAddNew = () => {
    dispatch(StartNewNote());
  };

  const { toggleColorMode } = useColorMode();

  const icon = useColorModeValue(BsMoonStarsFill, BsFillSunFill);
  const bgColor = useColorModeValue("back.400", "text.200");
  const color = useColorModeValue("white", "text.600");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const show = useBreakpointValue({ base: true, md: false });

  return (
    <>
      {show ? (
        <>
          <Box h="full" bg={bgColor}>
            <Icon as={BiMenuAltLeft} onClick={onOpen} w={10} h={10} />
          </Box>
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={btnRef}
            size="full"
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader>
                <div className="journal__sidebar-navbar">
                  <h3 className="row">
                    <Icon
                      as={icon}
                      onClick={toggleColorMode}
                      cursor="pointer"
                    />
                    <span className="mx-1">{name}</span>
                  </h3>
                  <Icon as={AiOutlineClose} onClick={onClose} w={7} h={7} />
                </div>
                <Box
                  _hover={{ color: color }}
                  transition="color .4s ease"
                  onClick={handleAddNew}
                  cursor="pointer"
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                  alignItems="center"
                  mt="30px"
                >
                  <i className="far fa-calendar-plus fa-4x"></i>
                  <p className="mt-5">New entry</p>
                </Box>
              </DrawerHeader>

              <DrawerBody>
                <JournalEntries close={onClose} />
              </DrawerBody>

              <DrawerFooter placement="left">
                <Box
                  as="button"
                  border="none"
                  bg="transparent"
                  fontSize="16px"
                  fontWeight="700"
                  transition="color .4s ease"
                  _hover={{ color: color }}
                  _focus={{ outline: "none" }}
                  onClick={handleLogout}
                  px="10px"
                  my="20px"
                >
                  Logout
                </Box>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <Box
          as="aside"
          display="flex"
          flexDirection="column"
          px="10px"
          h="100vh"
          w="450px"
          bg={bgColor}
        >
          <div className="journal__sidebar-navbar">
            <h3 className="row mt-5 mb-5">
              <Icon as={icon} onClick={toggleColorMode} cursor="pointer" />
              <span className="mx-1">{name}</span>
            </h3>
            <Box
              as="button"
              border="none"
              bg="transparent"
              fontSize="16px"
              fontWeight="700"
              transition="color .4s ease"
              _hover={{ color: color }}
              _focus={{ outline: "none" }}
              onClick={handleLogout}
              px="10px"
              my="20px"
            >
              Logout
            </Box>
          </div>
          <Box
            _hover={{ color: color }}
            transition="color .4s ease"
            onClick={handleAddNew}
            cursor="pointer"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            mt="30px"
          >
            <i className="far fa-calendar-plus fa-5x"></i>
            <p className="mt-5">New entry</p>
          </Box>
          <JournalEntries />
        </Box>
      )}
    </>
  );
};

export default Sidebar;
