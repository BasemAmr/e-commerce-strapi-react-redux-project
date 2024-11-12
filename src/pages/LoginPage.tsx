
import {
    Box,
    Container,
    Flex,
    Heading,
    Input,
    Button,
    Text,
    Card,
    IconButton,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";


import { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from "../validation";
import { useForm, useWatch } from "react-hook-form";
import { LOGIN_FORM_FIELDS } from "../data";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { fetchUserRole, login } from "../app/features/loginSlice";

import CookiesService from "../services/cookies";

interface LoginFormValues {
    identifier: string;
    password: string;
}

const LoginPage = () => {
    
    // RTK Query Hooks
    const {  status } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    // UI 
    const bgGradient = "linear-gradient(to right, #0A7EA4 0%, #149ECA 99%, #087EA4)"; // React.dev blue colors
    const cardBg = useColorModeValue("white", "gray.800");
    const inputBg = useColorModeValue("gray.50", "gray.700");
    const [showPassword, setShowPassword] = useState(false);

    // Form state management
    const { register, handleSubmit, formState: { errors }, control } = useForm<LoginFormValues>({
        resolver: yupResolver(loginSchema)
    });
    

    // Watch form values for real-time validation feedback
    const formValues = useWatch({ control });


    const onSubmit = async (data: LoginFormValues) => {
        const resultAction = await dispatch(login(data));
        if (login.fulfilled.match(resultAction)) {
            dispatch(fetchUserRole(CookiesService.getCookie('jwt') as string));  
        }

    };



    const renderFormFields = () => {
        return LOGIN_FORM_FIELDS.map((field) => {

            const isError = !!errors[field.name as keyof LoginFormValues];
            const isValid = formValues[field.name as keyof LoginFormValues] && !isError;

            return (
                <Box position="relative" key={field.name}>
                    <Box position="absolute" zIndex={10} left={3} top={3}>
                        {field.name === 'identifier' ? <Mail color="#3b82f6" size={18} /> : <Lock color="#3b82f6" size={18} />}
                    </Box>
                    <Input
                        type={
                            field.name === 'password' ? (showPassword ? 'text' : 'password') : field.type
                        }
                        placeholder={field.placeholder}
                        bg={inputBg}
                        pl={10}
                        pr={field.name === 'password' ? 10 : 0}
                        borderRadius="md"
                        _hover={{
                            borderColor: "blue.400"
                        }}
                        _focus={{
                            borderColor: "blue.500",
                            boxShadow: "0 0 0 1px #149ECA"
                        }}
                        {...register(field.name)}
                    />

                    {field.name === 'password' && (
                        <IconButton
                            position="absolute"
                            right={"3px"}
                            top={"3px"}
                            variant="ghost"
                            color="blue.500"
                            aria-label="Toggle password visibility"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <EyeOff size={18}  /> : <Eye size={18} />}
                        </IconButton>
                    )}

                    {(isError || !isValid) && (
                        <Text fontSize="sm" color="red.500" mt={1}>
                            {errors[field.name as keyof LoginFormValues]?.message}
                        </Text>
                    )}
                </Box>
            );
        });
    }

    return (
        <Box 
            minH="100vh" 
            bg={useColorModeValue("gray.50", "gray.900")}
            pt={20}
        >
        <Box >
            <Container maxW="container.sm">
                <Card.Root
                    p={8}
                    bg={cardBg}
                    boxShadow="xl"
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="gray.200"
                >
                    <Heading
                        mb={6}
                        size="xl"
                        bgGradient={bgGradient}
                        bgClip="text"
                        textAlign="center"
                    >
                        Welcome Back
                    </Heading>

                    <Flex as="form" direction="column" gap={4}>
                       {renderFormFields()}

                        <Button
                            mt={4}
                            bgGradient={bgGradient}
                            color="white"
                            _hover={{
                                bgGradient: "linear-gradient(to right, #2a4365 0%, #3182ce 99%, #2b6cb0)",
                                transform: "translateY(-2px)",
                            }}
                            _active={{
                                transform: "translateY(0)",
                            }}
                            transition="all 0.2s"
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                        >
                            {status === "pending" ? "Loading..." : "Sign In"}
                        </Button>

                        <Text 
                            textAlign="center" 
                            color="gray.500"
                            fontSize="sm"
                            mt={2}
                        >
                            Don't have an account?{" "}
                            <Text
                                as="span"
                                color="blue.500"
                                cursor="pointer"
                                _hover={{ textDecoration: "underline" }}
                            >
                                <Link to="/register">
                                    Sign up
                                </Link>
                            </Text>
                        </Text>
                    </Flex>
                </Card.Root>
            </Container>
        </Box>
        </Box>

)}

export default LoginPage

