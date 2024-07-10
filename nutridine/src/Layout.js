import React from "react";
import {
  Flex,
  Image,
  VStack,
  Box,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import NavBar from "./components/navbar/Navbar";
import nutritionIx_credit from "./assets/images/nutritionIx_credit.png";
import { useAuth } from "../src/contexts/AuthContext"

const Layout = ({ children }) => {
  const creditBg = useColorModeValue("white", "#1e7166");
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser && <NavBar />}
      <VStack
        justifyContent="space-between"
        minH="100vh"
        overflow={"scroll"}
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Flex
          as="main"
          pt={['5rem', '5rem', '6rem', '6rem']}
          flexDirection="column"
          justifyContent={"center"}
          alignItems={"center"}
          fontFamily={"navbar"}
        >
          {children}
        </Flex>
        <Box
          bg={creditBg}
          alignSelf="flex-start"
          borderRadius={"4px"}
          p={"0.25rem"}
          m="0.5rem"
          boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.1)"}
        >
          <Link href="https://www.nutritionix.com/" isExternal>
            <Image maxH="20px" src={nutritionIx_credit} alt="NutritionX" />
          </Link>
        </Box>
      </VStack>
    </>
  );
};

export default Layout;
