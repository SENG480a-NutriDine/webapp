import React, { useState } from 'react'
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Link,
    Stack,
    Text,
    useColorModeValue,
    FormHelperText,
    FormErrorMessage,
    Divider,
    Container
} from "@chakra-ui/react";
import PasswordField from "../screens/authentication/PasswordField";
import { OAuthButtonGroup } from "../screens/authentication/OuathButtonGroup";

export const AuthForm = ({ isLogin, onSwitchForm, onSubmit, isInvalid }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const cardBg = useColorModeValue("gray.50", "gray.700");
    const buttonBg = useColorModeValue("light.primary.500", "dark.primary.600");
    const buttonHover = useColorModeValue(
        "light.primary.400",
        "dark.primary.400"
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ email, password, confirmPassword });
    };

    return (
        <Container centerContent>
            <Box
                p={{ base: "4", sm: "8" }}
                bg={cardBg}
                boxShadow={{ base: "none", sm: "md" }}
                borderRadius={{ base: 15, sm: 20 }}
                width={{ base: "100%", sm: "400px" }}
            >
                <Text fontSize={{ base: "1.25rem", md: "1.5rem" }} mb={4} textAlign="center">
                    {isLogin ? 'Login' : 'Create an account'}
                </Text>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <FormControl isRequired isInvalid={isInvalid[0]}>
                            <FormLabel htmlFor="email" fontWeight="normal">Email</FormLabel>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                border={"1px"}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {email === "" ? (
                                <FormErrorMessage>Email is required.</FormErrorMessage>
                            ) : (
                                <FormHelperText>Enter your email</FormHelperText>
                            )}
                        </FormControl>
                        <PasswordField
                            isInvalid={isInvalid[1]}
                            label={"Password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {!isLogin && (
                            <PasswordField
                                isInvalid={isInvalid[2]}
                                label={"Confirm Password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        )}
                        <Button
                            type="submit"
                            bg={buttonBg}
                            _hover={{ bg: buttonHover }}
                            fontWeight="normal"
                        >
                            {isLogin ? 'Login' : 'Sign up'}
                        </Button>
                    </Stack>
                </form>
                <Text mt={4} color="fg.muted">
                    {isLogin ? (
                        <>
                            Don't have an account?{" "}
                            <Link
                                onClick={onSwitchForm}
                                color="teal.500"
                                href="#"
                                tabIndex={-1}
                            >
                                Sign up
                            </Link>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <Link
                                onClick={onSwitchForm}
                                color="teal.500"
                                href="#"
                                tabIndex={-1}
                            >
                                Login
                            </Link>
                        </>
                    )}
                </Text>
                <Box position="relative" py={6}>
                    <Divider />
                    <Text position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" bg={cardBg} px={2}>
                        or
                    </Text>
                </Box>
                <OAuthButtonGroup isSignUp={!isLogin} />
            </Box>
        </Container>
    );
}
