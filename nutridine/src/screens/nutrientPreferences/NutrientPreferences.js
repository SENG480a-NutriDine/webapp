import nutrientWatchListIDs from "../../constants/nutrientWatchList";
import { useState } from "react";
import {
  VStack,
  useColorMode,
  Select,
  Box,
  Heading,
  Tag,
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

export default function NutrientPreferences() {
  const { isSaving, validNumericalInput, submitNutrientPreferences } =
    useSubmitNutrientPreferences(12345);
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const activeBg = useColorModeValue("light.primary.500", "dark.primary.600");
  const buttonBgHover = useColorModeValue(
    "light.primary.200",
    "dark.primary.400"
  );
  const [dailyMaximums, setDailyMaximums] = useState({
    calories: null,
    totalFat: null,
    cholesterol: null,
    sodium: null,
    carbs: null,
    protein: null,
  });
  const [selectedNutrients, setSelectedNutrients] = useState([]);
  const [filteredNutrients, setFilteredNutrients] = useState(
    Object.keys(nutrientWatchListIDs).sort()
  );
  const toast = useToast();

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
      await submitNutrientPreferences({ ...dailyMaximums, selectedNutrients });

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

  return (
    <Container maxW={["95%", "90%", "80%", "65%"]}>
      <VStack>
        {/* DAILY MAXIMUMS */}
        <Flex
          my="2rem"
          mx="0.25rem"
          flexDirection="column"
          alignItems={"center"}
          w="100%"
        >
          <Heading fontSize={"3xl"} mb="0.25rem">
            Daily Maximums
          </Heading>
          <Text mb="0rem" textAlign={"center"}>
            Please enter your personal daily maximum values to create a
            personalized nutrition facts label. Any values you do not enter,
            will default to the FDA's recommended daily maximums, based on a
            2000 calorie per day diet.
          </Text>

          <Container maxW="480px">
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
                <InputGroup justifyContent={"flex-end"}>
                  <Input
                    id="calories"
                    type="number"
                    placeholder="2000"
                    maxW="90px"
                    value={dailyMaximums.calories || ""}
                    onChange={handleInputChange}
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
                    maxW="90px"
                    value={dailyMaximums.totalFat || ""}
                    onChange={handleInputChange}
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
                <InputGroup justifyContent={"flex-end"}>
                  <Input
                    id="cholesterol"
                    type="number"
                    placeholder="300"
                    maxW="90px"
                    value={dailyMaximums.cholesterol || ""}
                    onChange={handleInputChange}
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
                <InputGroup justifyContent={"flex-end"}>
                  <Input
                    id="sodium"
                    type="number"
                    placeholder="2300"
                    maxW="90px"
                    value={dailyMaximums.sodium || ""}
                    onChange={handleInputChange}
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
                <InputGroup justifyContent={"flex-end"}>
                  <Input
                    id="carbs"
                    type="number"
                    placeholder="300"
                    maxW="90px"
                    value={dailyMaximums.carbs || ""}
                    onChange={handleInputChange}
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
                <InputGroup justifyContent={"flex-end"}>
                  <Input
                    id="protein"
                    type="number"
                    placeholder="50"
                    maxW="90px"
                    value={dailyMaximums.protein || ""}
                    onChange={handleInputChange}
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
        <Box mb="2rem">
          <Flex
            mb="1.5rem"
            mx="0.25rem"
            flexDirection="column"
            alignItems={"center"}
          >
            <Heading fontSize={"3xl"} mb="0.25rem">
              Create your Watch List
            </Heading>
            <Text textAlign={"center"}>
              Please select all the nutrients you would always like to see in
              your personalized nutrition facts label.
            </Text>
          </Flex>

          <VStack alignContent={"center"}>
            <Select
              placeholder="Select all Desired Nutrients"
              onChange={(e) => handleSelectChange(e.target.value)}
              my="0.5rem"
              maxW="400px"
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
          </VStack>
        </Box>

        {isSaving && (
          <Center>
            <LoadingSpinner />{" "}
          </Center>
        )}
        <Button
          w="100%"
          mt="2rem"
          mb="3rem"
          bg={activeBg}
          _hover={{ background: buttonBgHover }}
          onClick={handleSubmit}
        >
          Update Nutritional Preferences
        </Button>
      </VStack>
    </Container>
  );
}