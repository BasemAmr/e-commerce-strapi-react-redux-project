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
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from "../validation";
import { useForm, useWatch } from "react-hook-form";
// import { AxiosError } from "axios";
import { instance } from "../axios/axios.config";
// import { IErrorResponse } from "../interfaces";
import { REGISTER_FORM_FIELDS } from "../data";
import { Link } from "react-router-dom";

interface RegisterFormValues {
    username: string;
    email: string;
    password: string;
}

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    
    const bgGradient = "linear-gradient(to right, #0A7EA4 0%, #149ECA 99%, #087EA4)";
    const cardBg = useColorModeValue("white", "gray.800");
    const inputBg = useColorModeValue("gray.50", "gray.700");

    const { register, handleSubmit, formState: { errors }, control } = useForm<RegisterFormValues>({
        resolver: yupResolver(registerSchema)
    });
    
    const [loading, setLoading] = useState(false);
    const formValues = useWatch({ control });

    const onSubmit = async (data: RegisterFormValues) => {
        setLoading(true);
        try {
            const { status } = await instance.post('/api/auth/local/register', data);
            if (status === 200) {
                setTimeout(() => {
                    location.replace('/login');
                }, 2000);
            }
        } catch (error) {
            // const errorObj = error as AxiosError<IErrorResponse>;
            console.log(error)
            // const errorMessage = errorObj.response?.data.error.message || 'An error occurred';
        } finally {
            setLoading(false);
        }
    };

    const renderFormFields = () => {
        return REGISTER_FORM_FIELDS.map((field) => {
            const isError = !!errors[field.name as keyof RegisterFormValues];
            const isValid = formValues[field.name as keyof RegisterFormValues] && !isError;

            return (
                <Box position="relative" key={field.name}>
                    <Box position="absolute" zIndex={10} left={3} top={3}>
                        {field.name === 'email' ? <Mail color="#3b82f6" size={18} /> : 
                         field.name === 'username' ? <User color="#3b82f6" size={18} /> :
                         <Lock color="#3b82f6" size={18} />}
                    </Box>
                    <Input
                        type={field.name === 'password' ? (showPassword ? 'text' : 'password') : field.type}
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
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </IconButton>
                    )}

                    {(isError || !isValid) && (
                        <Text fontSize="sm" color="red.500" mt={1}>
                            {errors[field.name as keyof RegisterFormValues]?.message}
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
            <Box>
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
                            Create Account
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
                                {loading ? "Loading..." : "Sign Up"}
                            </Button>

                            <Text 
                                textAlign="center" 
                                color="gray.500"
                                fontSize="sm"
                                mt={2}
                            >
                                Already have an account?{" "}
                                <Text
                                    as="span"
                                    color="blue.500"
                                    cursor="pointer"
                                    _hover={{ textDecoration: "underline" }}
                                >
                                    <Link to="/login">
                                        Sign in
                                    </Link>
                                </Text>
                            </Text>
                        </Flex>
                    </Card.Root>
                </Container>
            </Box>
        </Box>
    );
}

export default RegisterPage;