import React, { useState, useEffect, useMemo } from "react";
import {
  Input,
  VStack,
  Box,
  useColorModeValue,
  Image,
  Text,
  Center,
  SimpleGrid,
  AspectRatio,
  useColorMode,
  Flex,
} from "@chakra-ui/react";
import brandIds from "../../constants/brandIds";
import useMealsByRestaurant from "../../hooks/Meals/useMealsByRestaurant";
import FoodCardList from "../../components/FoodDisplay/FoodCardList";
import { useNavigate } from "react-router-dom";
import { useBreakpointValue } from "@chakra-ui/react";

function RestaurantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState(
    Object.keys(brandIds)
  );

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selectedRestaurantMemo = useMemo(
    () => selectedRestaurant,
    [selectedRestaurant?.brandId, selectedRestaurant?.name]
  );

  const { meals, loading, error } = useMealsByRestaurant(
    selectedRestaurantMemo
  );

  const inputWidth = useBreakpointValue({
    base: "90%",
    md: "500px",
    lg: "600px",
    xl: "820px",
  });
  const errorMessageWidth = useBreakpointValue({ base: "90%", md: "80%" });

  const [imageSrc, setImageSrc] = useState({});
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const inputBg = useColorModeValue("white", "gray.700");
  const cardBg = useColorModeValue("gray.50", "gray.700");

  const { colorMode } = useColorMode();
  const boxShadowHoverLight = "0 0 30px rgba(0, 0, 0, 0.3)";
  const boxShadowHoverDark = "0 0 30px rgba(255, 255, 255, 0.4)";

  let navigate = useNavigate(); // Hook from react-router-dom

  const handleRestaurantClick = (restaurant) => {
    const newSelection = { brandId: brandIds[restaurant], name: restaurant };
    navigate(`/restaurants/${newSelection.brandId}`, {
      state: { selectedRestaurant: newSelection },
    });
  };

  useEffect(() => {
    const result = Object.keys(brandIds).filter((restaurant) =>
      restaurant.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRestaurants(result);

    result.forEach((restaurant) => {
      import(`../../assets/RestaurantsLogos/${restaurant}.png`)
        .then((image) => {
          setImageSrc((prev) => ({ ...prev, [restaurant]: image.default }));
        })
        .catch((error) => {
          console.error(`Could not load image for ${restaurant}:`, error);
          setImageSrc((prev) => ({ ...prev, [restaurant]: undefined }));
        });
    });
  }, [searchTerm]);

  let content;
  if (selectedRestaurant) {
    if (loading) {
      content = <Center>Loading...</Center>;
    } else if (error) {
      content = <Center>Error: {error.message}</Center>;
    } else {
      content = <FoodCardList meals={meals} />;
    }
  }

  return (
    <Box
      position="relative"
      px={[8, 8, 0]}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Input
        placeholder="Search for restaurants..."
        width={["85vw", "70vw", "550px"]}
        mb={4}
        height="50px"
        borderRadius="15px"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={7}
        px='0'
      >
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <Center key={brandIds[restaurant]}>
              <Box
                bg={cardBg}
                boxShadow={"xl"}
                _hover={{
                  boxShadow:
                    colorMode === "light"
                      ? boxShadowHoverLight
                      : boxShadowHoverDark,
                }}
                rounded="15px"
                overflow="hidden"
                borderColor={borderColor}
                borderWidth="1px"
                cursor={"pointer"}
                onClick={() => handleRestaurantClick(restaurant)}
                p='0'
              >
                {imageSrc[restaurant] ? (
                  <AspectRatio ratio={1} w="250px">
                    <Image
                      src={imageSrc[restaurant]}
                      fit="contain"
                      alt={`${restaurant} logo`}
                      bg="white"
                    />
                  </AspectRatio>
                ) : (
                  <Box height="200px" w="full" bg="gray.200" />
                )}
                <Box py={6} height="100px">
                  <Text fontWeight={600} fontSize="lg" textAlign="center">
                    {restaurant}
                  </Text>
                </Box>
              </Box>
            </Center>
          ))
        ) : (
          <Flex
            width={"100vw"}
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Center w={errorMessageWidth} py={10}>
              {" "}
              <Text fontSize="2xl" p={3} color="gray.500">
                Sorry, the restaurant you're looking for is not available!!!
              </Text>
            </Center>
          </Flex>
        )}
      </SimpleGrid>
      {content}
    </Box>
  );
}
export default RestaurantsPage;
