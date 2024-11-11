import ProductCard from "../components/ProductCard"
import ProductCardSkeleton from "../components/ProductCardSkeleton"
import { Grid, Box, Heading, Container, Text } from "@chakra-ui/react"
import { useColorModeValue } from "@chakra-ui/color-mode"
import { IProduct } from "../interfaces"
import { useQuery } from "react-query"
import { instance } from "../axios/axios.config"
import CookiesService from "../services/cookies"

const ProductsPage = () => {
    
    const fetchProducts = async () => {
        const {data} = await instance.get(`/api/products?populate=*`,
        {
            headers: {
                'Authorization': `Bearer ${CookiesService.getCookie('jwt')}`,
              }
        }
        )
        console.log(data)
        return data
    }
    
    const { isLoading, data } = useQuery('products', fetchProducts)

    const bg = useColorModeValue('gray.50', 'gray.900')
    const headerBg = useColorModeValue('white', 'gray.800')
    
    const renderProductCards = (data: IProduct[]) => {
        return data.map((card: IProduct, index) => (
            <Box
                key={card.id}
                animation={`slide-fade-in 0.3s ease-out ${index * 0.1}s`}
                _hover={{
                    transform: 'translateY(-5px)',
                    transition: 'transform 0.2s'
                }}
            >
                <ProductCard props={card} />
            </Box>
        ))
    }

    const renderLoadingSkeletons = () => {
        return Array(8)
            .fill(0)
            .map((_, idx) => (
                <Box
                    key={idx}
                    animation={`slide-fade-in 0.3s ease-out ${idx * 0.1}s`}
                >
                    <ProductCardSkeleton />
                </Box>
            ))
    }

    return (
        <Box bg={bg} minH="100vh">
            <Box
                position="sticky"
                top={0}
                bg={headerBg}
                py={4}
                boxShadow="sm"
                zIndex={10}
            >
                <Container maxW="container.xl">
                    <Heading
                        as="h1"
                        size="xl"
                        bgGradient="linear(to-r, blue.400, blue.600)"
                        bgClip="text"
                        letterSpacing="tight"
                    >
                        Our Products
                    </Heading>
                    <Text color="gray.500" mt={2}>
                        Discover our collection of amazing products
                    </Text>
                </Container>
            </Box>

            <Container maxW="container.xl" py={8}>
                <Grid
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                        xl: "repeat(4, 1fr)"
                    }}
                    gap={6}
                    animation="slide-fade-in 0.5s ease-out"
                >
                    {isLoading ? renderLoadingSkeletons() : renderProductCards(data.data)}
                </Grid>
            </Container>
        </Box>
    )
}

export default ProductsPage