import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import brandIds from "../../constants/brandIds";

function RestaurantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState(
    Object.keys(brandIds)
  );
  const [imageSrc, setImageSrc] = useState({});
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const inputBg = useColorModeValue("white", "gray.700");
  const cardBg = useColorModeValue("gray.50", "gray.700");

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

  return (
    <VStack spacing={5} align="stretch">
      <Box bg={inputBg} p={4} rounded="md" shadow="base">
        <Input
          placeholder="Search restaurants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        {filteredRestaurants.map((restaurant) => (
          <Center key={brandIds[restaurant]} py={2}>
            <Box
              bg={cardBg}
              boxShadow={"xl"}
              _hover={{ boxShadow: "2xl" }}
              rounded="md"
              overflow="hidden"
              borderColor={borderColor}
              borderWidth="1px"
              cursor={"pointer"}
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
              <Box p={6} height="100px">
                <Text fontWeight={600} fontSize="lg" textAlign="center">
                  {restaurant}
                </Text>
              </Box>
            </Box>
          </Center>
        ))}
      </SimpleGrid>
    </VStack>
  );
}

export default RestaurantsPage;
