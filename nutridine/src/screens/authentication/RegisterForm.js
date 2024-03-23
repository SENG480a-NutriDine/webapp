import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
  FormHelperText,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";

const RegisterForm = () => {
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const buttonBg = useColorModeValue("light.primary.500", "dark.primary.600");
  const toast = useToast();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
      navigate("/profile");
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="lg" py="12" px="4">
      <Heading
        as="h1"
        size={{ base: "sm", md: "md" }}
        textAlign="center"
        mb="6"
      >
        Complete Your Profile
      </Heading>
      <Box bg={cardBg} p="8" borderRadius="lg" boxShadow="base">
        <form onSubmit={handleSubmit}>
          <Stack spacing="4">
            <FormControl id="displayName" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="John Doe"
              />
              <FormHelperText>
                Enter the name you'd like displayed on your profile.
              </FormHelperText>
            </FormControl>
            <FormControl id="photoURL">
              <FormLabel>Photo URL</FormLabel>
              <Input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://example.com/photo.jpg"
              />
              <FormHelperText>
                Enter the URL of your profile photo.
              </FormHelperText>
            </FormControl>
            <Button
              type="submit"
              bg={buttonBg}
              color="white"
              _hover={{ bg: "blue.500" }}
            >
              Update Profile
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterForm;
