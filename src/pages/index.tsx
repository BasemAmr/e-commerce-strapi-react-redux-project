import { Box, Container, Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { PackageSearch, ShoppingCart, CreditCard, Truck } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    
    const features = [
        {
            icon: <PackageSearch size={24} />,
            title: "Browse Products",
            description: "Explore our wide range of products"
        },
        {
            icon: <ShoppingCart size={24} />,
            title: "Easy Shopping",
            description: "Add items to cart with one click"
        },
        {
            icon: <CreditCard size={24} />,
            title: "Secure Payment",
            description: "Safe and encrypted transactions"
        },
        {
            icon: <Truck size={24} />,
            title: "Fast Delivery",
            description: "Quick shipping to your doorstep"
        }
    ];

    return (
        <Box>
            {/* Hero Section */}
            <Box 
                bgGradient="linear-gradient(to right, #8080FF,#4D4DFF)"
                color="white"
                py={{ base: 20, md: 32 }}
                px={4}
            >
                <Container maxW="container.xl">
                    <Stack gap={6} maxW="lg">
                        <Heading 
                            size={{ base: "2xl", md: "3xl" }}
                            fontWeight="bold"
                        >
                            Welcome to E-Shop
                        </Heading>
                        <Text fontSize={{ base: "lg", md: "xl" }}>
                            Discover amazing products at great prices
                        </Text>
                        <Button
                            size="lg"
                            bg="white"
                            color="blue.500"
                            _hover={{ bg: "gray.100" }}
                            onClick={() => navigate('/products')}
                            maxW="200px"
                        >
                            Shop Now
                        </Button>
                    </Stack>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxW="container.xl" py={20}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={10}>
                    {features.map((feature, index) => (
                        <Box
                            key={index}
                            p={6}
                            borderRadius="xl"
                            boxShadow="md"
                            border="1px"
                            borderColor="gray.200"
                            bg="white"
                            transition="all 0.3s"
                            _hover={{
                                transform: "translateY(-5px)",
                                boxShadow: "lg"
                            }}
                        >
                            <Flex
                                w={12}
                                h={12}
                                align="center"
                                justify="center"
                                color="blue.500"
                                bg="blue.50"
                                rounded="full"
                                mb={4}
                            >
                                {feature.icon}
                            </Flex>
                            <Text fontWeight="bold" fontSize="lg" mb={2}>
                                {feature.title}
                            </Text>
                            <Text color="gray.600">
                                {feature.description}
                            </Text>
                        </Box>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
};

export default HomePage;