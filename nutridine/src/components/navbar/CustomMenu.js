import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Stack } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useColorModeValue } from "@chakra-ui/react";

const CustomMenu = ({ children, buttonBgHover }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const cardBg = useColorModeValue("gray.100", "gray.700");

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box position="relative" ref={menuRef}>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        variant="ghost"
        borderRadius="30"
        _hover={{ bg: buttonBgHover }}
        _focus={{ boxShadow: "none" }}
        minWidth="auto"
      >
        <FaUser />
      </Button>
      {isOpen && (
        <Box
          position="absolute"
          zIndex="dropdown"
          bg={cardBg}
          mt={{ base: "0", md: "2" }}
          mb={{ base: "2", md: "0" }}
          bottom={{ base: "100%", md: "auto" }}
          top={{ base: "auto", md: "100%" }}
          shadow="lg"
          borderRadius="17"
          minWidth="150px"
        >
          <Stack direction="column" spacing={0}>
            {React.Children.map(children, (child) => {
              return React.cloneElement(child, {
                closeMenu: () => setIsOpen(false),
              });
            })}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default CustomMenu;
