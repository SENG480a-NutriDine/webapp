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
  Text
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { getCurrentUser } from "../../hooks/AuthService/authService";
import { auth } from "../../hooks/AuthService/authService";

const RegisterForm = () => {
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const buttonBg = useColorModeValue("light.primary.500", "dark.primary.600");
  const buttonHover = useColorModeValue(
    "light.primary.400",
    "dark.primary.400"
  );

  const toast = useToast();
  const navigate = useNavigate();

  const currentUser = getCurrentUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(currentUser, {
        displayName,
        photoURL,
      });
      navigate("/preferences-page");
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
    <Container py="12" px="4">
      <Box bg={cardBg} px="10" py="8" borderRadius="25px" boxShadow="base">
        <form onSubmit={handleSubmit}>
          <Heading size="md" fontFamily="navbar" fontWeight="500" mb={5}>
            Complete Your Profile
          </Heading>
          <Stack spacing="4">
            <FormControl id="displayName" isRequired>
              <FormLabel fontWeight="normal">Name</FormLabel>
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
            {/* <FormControl id="photoURL">
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
            </FormControl> */}
            <Button
              type="submit"
              bg={buttonBg}
              _hover={{ bg: buttonHover }}
              fontWeight="normal"
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
