import {
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  VStack,
  Image,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import useMealById from "../hooks/Meals/useMealById";
import LoadingSpinner from "./LoadingSpinner";
import NutritionFacts from "./NutritionFacts";
import useNutrientPreferences from "../hooks/useNutrientPreferences";
import { useAuth } from "../contexts/AuthContext";

export default function DetailedFoodModalContent({ meal, onClose }) {
  const { nix_item_id } = meal;
  const { currentUser } = useAuth();
  const {
    detailedMeal,
    loading: detailedMealIsLoading,
    error,
  } = useMealById({ nix_item_id });
  const buttonBg = useColorModeValue("light.primary.500", "dark.primary.500");
  const buttonHover = useColorModeValue(
    "light.primary.200",
    "dark.primary.400"
  );
  const buttonTextColor = useColorModeValue("black", "white");
  const { isLoading: nutrientPreferencesIsLoading, nutrientPreferences } =
    useNutrientPreferences(currentUser.uid);

  return (
    <Box
      fontFamily={"navbar"}
      overflowY={"scroll"}
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <ModalHeader>
        <VStack alignItems={"flex-start"}>
          <Text fontSize={"2xl"} mr="2rem">
            <b>{detailedMeal ? detailedMeal.food_name : ""}</b>
          </Text>
          <Text fontSize={"xl"}>
            {detailedMeal ? detailedMeal.brand_name : ""}
          </Text>
        </VStack>
      </ModalHeader>
      <ModalCloseButton
        bg={buttonBg}
        zIndex={1}
        color={buttonTextColor}
        _hover={{ bg: buttonHover }}
        mr={3}
        mt={2.5}
        onClick={onClose}
        boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.1)"}
      />

      <ModalBody mb="1.5rem">
        {detailedMealIsLoading || nutrientPreferencesIsLoading ? (
          <Box
            w="100%"
            h="80%"
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <LoadingSpinner />
          </Box>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <VStack alignItems={"center"} justifyContent={"center"}>
            <NutritionFacts
              detailedMeal={detailedMeal}
              nutrientPreferences={nutrientPreferences}
            />
            <Image
              src={detailedMeal.photo?.thumb}
              alt={detailedMeal.food_name}
            />
          </VStack>
        )}
      </ModalBody>
    </Box>
  );
}
