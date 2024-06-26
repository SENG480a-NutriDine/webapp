import nutrientWatchListIDs, {
  nutrientUnits,
} from "../../constants/nutrientWatchList";
import { useState } from "react";
import {
  VStack,
  useColorMode,
  Select,
  Box,
  Heading,
  Tag,
  Divider,
  TagLabel,
  Container,
  TagCloseButton,
  FormControl,
  FormLabel,
  InputRightAddon,
  useColorModeValue,
  Input,
  Flex,
  HStack,
  Button,
  FormErrorMessage,
  Wrap,
  Text,
  Center,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useSubmitNutrientPreferences from "../../hooks/useSubmitNutrientPreferences";
import LoadingSpinner from "../../components/LoadingSpinner";
import { micronutrientDailyMax } from "../../constants/dailyMaximums";
import { useAuth } from "../../contexts/AuthContext";

export default function NutrientPreferences({ handleCancel }) {
  const { currentUser } = useAuth();
  const {
    isSaving,
    validNumericalInput,
    validateMicronutrientInput,
    submitNutrientPreferences,
  } = useSubmitNutrientPreferences(currentUser.uid);
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const activeBg = useColorModeValue("light.primary.500", "dark.primary.600");
  const buttonBgHover = useColorModeValue(
    "light.primary.200",
    "dark.primary.400"
  );
  const cardBg = useColorModeValue("gray.50", "gray.700");

  const [dailyMaximums, setDailyMaximums] = useState({
    calories: null,
    totalFat: null,
    cholesterol: null,
    sodium: null,
    carbs: null,
    protein: null,
  });
  const [selectedNutrients, setSelectedNutrients] = useState([]);
  const [selectedNutrientMaximums, setSelectedNutrientsMaximums] = useState([]);
  const [filteredNutrients, setFilteredNutrients] = useState(
    Object.keys(nutrientWatchListIDs).sort()
  );
  const toast = useToast();
  const borderColors = useColorModeValue("black", "white");

  const handleMicroNutrientChange = (e) => {
    const { id, value } = e.target;
    setSelectedNutrientsMaximums((prevMaximums) => ({
      ...prevMaximums,
      [id]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDailyMaximums((prevMaximums) => ({
      ...prevMaximums,
      [id]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFilteredNutrients(
      filteredNutrients.filter((nutrient) => nutrient !== value)
    );
    setSelectedNutrients([...selectedNutrients, value]);
  };

  const removeNutrient = (nutrient) => {
    setSelectedNutrients(selectedNutrients.filter((n) => n !== nutrient));
    setFilteredNutrients([...filteredNutrients, nutrient].sort());
  };

  const handleSubmit = async () => {
    try {
      await submitNutrientPreferences({
        ...dailyMaximums,
        selectedNutrients,
        selectedNutrientMaximums,
      });

      toast({
        title: "Nutritional Preferences Successfully Updated",
        description: "Your Nutrition Facts label will reflect these changes.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      toast({
        title: "Failed to update Nutritional Preferences",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const preventSpecialNumericalCharacters = (event) =>
    ["e", "E", "+", "-"].includes(event.key) && event.preventDefault();

  return (
    <Box mt={"1rem"} bg={cardBg} borderRadius="25px" boxShadow="base" px="10" py="8" width={["100vw", "550px"]}>
      <VStack px={0}>
        {/* DAILY MAXIMUMS */}
        <Flex
          my="0rem"
          mx="0.25rem"
          flexDirection="column"
          alignItems={"left"}
          w="100%"
        >
          <Heading size="lg" fontFamily="navbar" fontWeight="500">
            Daily Maximums
          </Heading >

          <Text fontSize={"1rem"} my="1rem" textAlign={"left"}>
            Please enter your personal daily maximum values to create a
            personalized nutrition facts label. Any values you do not enter,
            will default to the FDA's recommended daily maximums, based on a
            2000 calorie per day diet.
          </Text>

          <Container maxW="480px" mx="0px" px="0px">
            {/* CALORIES */}
            <FormControl
              my="1.5rem"
              display="flex"
              flexDirection="column"
              isInvalid={!validNumericalInput(dailyMaximums.calories)}
            >
              <HStack justifyContent={"space-between"} h="100%">
                <FormLabel m="0px" fontSize="lg" h="100%">
                  Calories
                </FormLabel>
                <InputGroup justifyContent={"flex-end"} maxW="150px">
                  <Input
                    id="calories"
                    type="number"
                    placeholder="2000"
                    w="90px"
                    value={dailyMaximums.calories || ""}
                    onChange={handleInputChange}
                    onKeyDown={preventSpecialNumericalCharacters}
                  />
                  <InputRightAddon w="60px">kcal</InputRightAddon>
                </InputGroup>
              </HStack>
              <FormErrorMessage>
                Calories must be a positive integer.
              </FormErrorMessage>
            </FormControl>

            {/* TOTAL FAT*/}
            <FormControl
              my="0.75rem"
              display="flex"
              flexDirection="column"
              isInvalid={!validNumericalInput(dailyMaximums.totalFat)}
            >
              <HStack justifyContent={"space-between"}>
                <FormLabel m="0px" fontSize="lg">
                  Total Fat
                </FormLabel>

                <InputGroup justifyContent={"flex-end"} maxW="150px">
                  <Input
                    id="totalFat"
                    type="number"
                    placeholder="65"
                    w="90px"
                    value={dailyMaximums.totalFat || ""}
                    onChange={handleInputChange}
                    onKeyDown={preventSpecialNumericalCharacters}
                  />
                  <InputRightAddon w="60px">g</InputRightAddon>
                </InputGroup>
              </HStack>
              <FormErrorMessage alignSelf={"flex-start"}>
                Total Fat must be a positive integer.
              </FormErrorMessage>
            </FormControl>

            {/* CHOLESTEROL */}
            <FormControl
              my="0.75rem"
              display="flex"
              flexDirection="column"
              isInvalid={!validNumericalInput(dailyMaximums.cholesterol)}
            >
              <HStack justifyContent={"space-between"} h="100%">
                <FormLabel m="0px" fontSize="lg" h="100%">
                  Cholesterol
                </FormLabel>
                <InputGroup justifyContent={"flex-end"} maxW="150px">
                  <Input
                    id="cholesterol"
                    type="number"
                    placeholder="300"
                    w="90px"
                    value={dailyMaximums.cholesterol || ""}
                    onChange={handleInputChange}
                    onKeyDown={preventSpecialNumericalCharacters}
                  />
                  <InputRightAddon w="60px">mg</InputRightAddon>
                </InputGroup>
              </HStack>
              <FormErrorMessage>
                Cholesterol must be a positive integer.
              </FormErrorMessage>
            </FormControl>

            {/* SODIUM */}
            <FormControl
              my="0.75rem"
              display="flex"
              flexDirection="column"
              isInvalid={!validNumericalInput(dailyMaximums.sodium)}
            >
              <HStack justifyContent={"space-between"} h="100%">
                <FormLabel m="0px" fontSize="lg" h="100%">
                  Sodium
                </FormLabel>
                <InputGroup justifyContent={"flex-end"} maxW="150px">
                  <Input
                    id="sodium"
                    type="number"
                    placeholder="2300"
                    w="90px"
                    value={dailyMaximums.sodium || ""}
                    onChange={handleInputChange}
                    onKeyDown={preventSpecialNumericalCharacters}
                  />
                  <InputRightAddon w="60px">mg</InputRightAddon>
                </InputGroup>
              </HStack>
              <FormErrorMessage>
                Sodium must be a positive integer.
              </FormErrorMessage>
            </FormControl>

            {/* CARBOHYDRATES */}
            <FormControl
              my="0.75rem"
              display="flex"
              flexDirection="column"
              isInvalid={!validNumericalInput(dailyMaximums.carbs)}
            >
              <HStack justifyContent={"space-between"} h="100%">
                <FormLabel m="0px" fontSize="lg" h="100%">
                  Carbohydrates
                </FormLabel>
                <InputGroup justifyContent={"flex-end"} maxW="150px">
                  <Input
                    id="carbs"
                    type="number"
                    placeholder="300"
                    w="90px"
                    value={dailyMaximums.carbs || ""}
                    onChange={handleInputChange}
                    onKeyDown={preventSpecialNumericalCharacters}
                  />
                  <InputRightAddon w="60px">g</InputRightAddon>
                </InputGroup>
              </HStack>
              <FormErrorMessage>
                Carbohydrates must be a positive integer.
              </FormErrorMessage>
            </FormControl>

            {/* PROTEIN */}
            <FormControl
              my="0.75rem"
              display="flex"
              flexDirection="column"
              isInvalid={!validNumericalInput(dailyMaximums.protein)}
            >
              <HStack justifyContent={"space-between"} h="100%">
                <FormLabel m="0px" fontSize="lg" h="100%">
                  Protein
                </FormLabel>
                <InputGroup justifyContent={"flex-end"} maxW="150px">
                  <Input
                    id="protein"
                    type="number"
                    placeholder="50"
                    w="90px"
                    value={dailyMaximums.protein || ""}
                    onChange={handleInputChange}
                    onKeyDown={preventSpecialNumericalCharacters}
                  />
                  <InputRightAddon w="60px">g</InputRightAddon>
                </InputGroup>
              </HStack>
              <FormErrorMessage>
                Protein must be a positive integer.
              </FormErrorMessage>
            </FormControl>
          </Container>
        </Flex>

        {/* WATCH LIST */}
        <Flex my="1.5rem" flexDirection="column" alignItems={"start"}>
          <Heading size="lg" fontFamily="navbar" fontWeight="500">
            Create your Watchlist
          </Heading >

          <Text fontSize={"sm"} mt="1rem" textAlign={"left"}>
            Please select all the nutrients you would always like to see in
            your personalized nutrition facts label. Once chosen, you can
            enter personal maximum daily values, or leave them blank to
            default to the FDA's recommendations.
          </Text>
        </Flex>

        <VStack alignItems={"left"} width="100%">
          <Select
            placeholder="Select all Desired Nutrients"
            onChange={(e) => handleSelectChange(e.target.value)}
            my="0.5rem"
            // w="100%"
            // maxW="400px"
            fontFamily={"theme.global.body.fontFamily"}
            fontSize="1rem"
          >
            {filteredNutrients.map((nutrient) => (
              <option key={nutrient} value={nutrient}>
                {nutrient}
              </option>
            ))}
          </Select>

          <Flex
            direction="column"
            maxW="100%"
            my="0.5rem"
            alignItems="center"
          >
            <Wrap spacing={4} w="100%" maxW="480px" justify="center">
              {selectedNutrients.map((nutrient) => (
                <Tag
                  key={nutrient}
                  size="lg"
                  variant={colorMode === "light" ? "lightMode" : "darkMode"}
                >
                  <TagLabel>{nutrient}</TagLabel>
                  <TagCloseButton onClick={() => removeNutrient(nutrient)} />
                </Tag>
              ))}
            </Wrap>
          </Flex>

          <Container maxW="480px">
            {selectedNutrients.map((nutrient) => {
              return (
                <FormControl
                  key={nutrient}
                  my="1.5rem"
                  display="flex"
                  flexDirection="column"
                  isInvalid={
                    !validateMicronutrientInput(
                      selectedNutrientMaximums[nutrient]
                    )
                  }
                >
                  <HStack justifyContent={"space-between"} h="100%">
                    <FormLabel m="0px" fontSize="lg" h="100%">
                      {nutrient}
                    </FormLabel>
                    <InputGroup justifyContent={"flex-end"} maxW="150px">
                      <Input
                        id={nutrient}
                        type="number"
                        placeholder={
                          micronutrientDailyMax[
                          nutrientWatchListIDs[nutrient]
                          ]
                        }
                        w="90px"
                        value={selectedNutrientMaximums[nutrient] || ""}
                        onChange={handleMicroNutrientChange}
                        onKeyDown={preventSpecialNumericalCharacters}
                      />
                      <InputRightAddon w="60px">
                        {nutrientUnits[nutrientWatchListIDs[nutrient]]}
                      </InputRightAddon>
                    </InputGroup>
                  </HStack>
                  <FormErrorMessage>
                    {nutrient} must be a positive number containing only
                    digits and decimals.
                  </FormErrorMessage>
                </FormControl>
              );
            })}
          </Container>
        </VStack>

        {
          isSaving && (
            <Center>
              <LoadingSpinner />{" "}
            </Center>
          )
        }
        <HStack width="100%" justify={handleCancel ? "space-between" : "center"}>
          {handleCancel &&
            <Button
              bg={"light.error.500"}
              _hover={{ background: "light.error.300" }}
              onClick={handleCancel}
              color={"white"}
              fontWeight="normal"
            >
              Cancel
            </Button>
          }
          <Button
            bg={activeBg}
            _hover={{ background: buttonBgHover }}
            onClick={handleSubmit}
            fontWeight="normal"
            width={!handleCancel ? "100%" : ""}
          >
            Update Preferences
          </Button>
        </HStack>
      </VStack >
    </Box >
  );
}
