import React, { useState, useEffect } from 'react';
import { AuthForm } from '../components/AuthForm';
import { useToast, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { signIn, register } from '../hooks/AuthService/authService';
import { useAuth } from '../contexts/AuthContext';

export const Root = () => {
    const { currentUser } = useAuth();

    const [isLogin, setIsLogin] = useState(true);
    const [isInvalid, setIsInvalid] = useState([false, false]);

    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/home");
        }
    }, [currentUser, navigate]);

    const handleLoginClick = () => {
        setIsLogin(true);
        setIsInvalid([false, false]);
    }

    const handleRegisterClick = () => {
        setIsLogin(false);
        setIsInvalid([false, false, false]);
    }

    const handleLoginFormSubmit = ({ email, password }) => {
        const invalidStates = [email === "", password === ""];
        setIsInvalid(invalidStates);

        if (invalidStates.includes(true)) {
            return;
        }

        signIn(email, password)
            .then((userCredential) => {
                navigate("/home");
                console.log(userCredential);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
                toast({
                    title: "Login Failed",
                    description: "The email or password you entered is incorrect. Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    }

    const handleRegisterFormSubmit = async ({ email, password, confirmPassword }) => {
        const initialInvalidStates = [false, false, false];

        const invalidStates = initialInvalidStates.map((state, index) => {
            if (index === 0 && email === "") return true;
            if (index === 1 && password === "") return true;
            if (index === 2 && confirmPassword === "") return true;
            return state;
        });

        if (password !== confirmPassword || invalidStates.includes(true)) {
            if (password !== confirmPassword) {
                toast({
                    title: "Sign up Failed",
                    description: "Passwords do not match. Please try again!",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Sign up Failed",
                    description: "Please fill in all required fields.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }

            setIsInvalid(invalidStates);
            return;
        }

        try {
            const userCredential = await register(email, password);
            navigate("/register-form");
            console.log(userCredential.user);
        } catch (error) {
            console.log(error.code, error.message);
            toast({
                title: "Sign up Failed",
                description: `Failed to create account: ${error.message}`,
                status: "error",
                duration: 8000,
                isClosable: true,
            });
        }
    }

    return (
        <Flex
            minHeight="70vh"
            alignItems="center"
            justifyContent="center"
        >
            {isLogin
                ?
                // Render login form
                <AuthForm
                    isLogin={true}
                    onSwitchForm={handleRegisterClick}
                    onSubmit={handleLoginFormSubmit}
                    isInvalid={isInvalid}
                />
                :
                // Render register form
                <AuthForm
                    isLogin={false}
                    onSwitchForm={handleLoginClick}
                    onSubmit={handleRegisterFormSubmit}
                    isInvalid={isInvalid}
                />
            }
        </Flex>
    );
}
