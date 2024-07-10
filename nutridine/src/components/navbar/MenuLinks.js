import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  useColorMode,
  Button,
  Icon,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import CustomMenu from "./CustomMenu";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { MenuItem } from "./MenuItem";
import { FaUser } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { signOutUser } from "../../hooks/AuthService/authService";
import { useAuth } from "../../contexts/AuthContext";

export const MenuLinks = ({ isOpen, onItemSelect, activeItem }) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const { currentUser } = useAuth();

  const navigate = useNavigate();
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColorDefault = {
    base: useColorModeValue("gray.100", "gray.900"),
    md: useColorModeValue("transparent", "transparent"),
  };
  const bgColorScrolled = useColorModeValue("gray.100", "gray.900");
  const bgColor = hasScrolled ? bgColorScrolled : bgColorDefault;
  const buttonBgHover = useColorModeValue(
    "light.primary.200",
    "dark.primary.400"
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrolledDown = window.scrollY > 50;
      setHasScrolled(scrolledDown);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast({
          title: "Signed Out",
          description: "You have been signed out successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Sign Out Failed",
          description: "An error occurred while signing out. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "flex" }}
      flexBasis={{ base: "100%", md: "auto" }}
      position={{ base: "fixed", md: "relative" }}
      width="auto"
      maxWidth="100vw"
      height={{ base: "100vh", md: "auto" }}
      bg={isOpen ? bgColorScrolled : bgColor}
      zIndex={20}
      top={0}
      left={0}
      right={0}
      transition="0.4s ease"
      pt={{ base: "15rem", md: "0" }}
      borderRadius={[0, 0, 25, 25]}
    >
      <Stack
        spacing={12}
        align="center"
        justify={{ base: "center", md: "center" }}
        direction={{ base: "column", md: "row" }}
        pt={[4, 4, 0, 0]}
        p={[0, 0, 2, 2]}
        style={{
          transition: "background-color 1.5s",
        }}
      >

        {currentUser ? (
          <CustomMenu buttonBgHover={buttonBgHover}>
            <MenuItem
              onClick={onItemSelect("/profile")}
              to={"/profile"}
              isActive={activeItem === "/profile"}
            >
              Profile
            </MenuItem>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </CustomMenu>
        ) : (
          <NavLink to="/login" onClick={onItemSelect("/login")}>
            <Button
              px={6}
              py={2}
              variant="ghost"
              borderRadius={"30"}
              _hover={{
                bg: buttonBgHover,
              }}
            >
              <Icon as={FaUser} />
            </Button>
          </NavLink>
        )}

        <MenuItem
          isActive={activeItem === "/"}
          onClick={onItemSelect("/")}
          to={"/"}
        >
          Home
        </MenuItem>
        <MenuItem
          isActive={activeItem === "/restaurants"}
          onClick={onItemSelect("/restaurants")}
          to={"/restaurants"}
        >
          Restaurants
        </MenuItem>
        <MenuItem
          isActive={activeItem === "/macro"}
          onClick={onItemSelect("/macro")}
          to={"/macro"}
        >
          Macro
        </MenuItem>

        <Button
          onClick={toggleColorMode}
          variant="ghost"
          borderRadius={"30"}
          _hover={{
            bg: buttonBgHover,
          }}
        >
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Stack>
    </Box>
  );
};
