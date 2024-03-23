import React from "react";
import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import NutrientPreferences from "../nutrientPreferences/NutrientPreferences";

const ProfilePage = () => {
  const cardBg = useColorModeValue("gray.50", "gray.700");

  return (
    <Container>
      <Box bg={cardBg} borderRadius="lg" boxShadow="base">
        <NutrientPreferences />
      </Box>
    </Container>
  );
};

export default ProfilePage;
