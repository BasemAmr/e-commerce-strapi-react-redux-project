import { Button, Card, Flex, Heading, Text, Image, Box, Container } from "@chakra-ui/react"
import axios from "axios"
import { useQuery } from "react-query"
import { ArrowLeft, Folder } from 'lucide-react'
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton"
import { AppDispatch } from "../app/store"
import { useDispatch } from "react-redux"
import { addItem } from "../app/features/cartSlice"

const ProductDetailsPage = () => {
    const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL
    const documentId = window.location.pathname.split("/")[2]
    
    const fetchProduct = async () => {
        const { data } = await axios.get(`${VITE_SERVER_URL}/api/products/${documentId}?populate=*`)
        return data.data
    }
    const { isLoading, data } = useQuery('product', () => fetchProduct())

    // Redux Hooks
    const dispatch = useDispatch<AppDispatch>()

    // Cart Handlers
    const addToCartHandler = () => {
        const productData = {
            id: data.id,
            title: data.title,
            description: data.description,
            price: data.price,
            stock: data.stock,
            thumbnail: {
                url: data.thumbnail.url,
                alternativeText: data.thumbnail.alternativeText
            },
            category: {
                title: data.category.title
            }
        }
        dispatch(addItem(productData))
    }

    return (
        <Container maxW="container.xl" py={8}>
            {isLoading ? <ProductDetailsSkeleton /> :
            <Card.Root
                maxW="4xl"
                overflow="hidden"
                bg="white"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.200"
                padding="2rem"
                boxShadow="sm"
                m="auto"
            >
                <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
                    <Box flex="1">
                        <Image
                            src={`${VITE_SERVER_URL}${data.thumbnail.url}`}
                            alt={data.thumbnail.alternativeText}
                            width="100%"
                            height="400px"
                            objectFit="cover"
                            borderRadius="lg"
                            border="2px solid"
                            borderColor="blue.100"
                        />
                    </Box>

                    <Box flex="1" display="flex" flexDirection="column" gap={4}>
                        <Heading 
                            size="xl" 
                            bgGradient="linear(to-r, blue.400, blue.600)"
                            bgClip="text"
                        >
                            {data.title}
                        </Heading>
                        
                        <Text fontSize="lg" color="gray.600">
                            {data.description}
                        </Text>

                        <Box>
                            <Text 
                                fontSize="sm" 
                                color="blue.600"
                                mb={2}
                            >
                                <Folder size={16} color="#0969da" /> Category: {data.category.title}
                            </Text>
                            
                            {data.discount ? (
                                <Flex align="center" gap={3}>
                                    <Text
                                        fontSize="lg"
                                        textDecoration="line-through"
                                        color="gray.400"
                                    >
                                        ${data.price}
                                    </Text>
                                    <Text 
                                        fontSize="2xl"
                                        fontWeight="bold"
                                        color="blue.600"
                                    >
                                        ${data.price - (data.price * data.discount / 100)}
                                    </Text>
                                </Flex>
                            ) : (
                                <Text 
                                    fontSize="2xl"
                                    fontWeight="bold"
                                    color="blue.600"
                                >
                                    ${data.price}
                                </Text>
                            )}
                        </Box>

                        <Flex gap={4} mt={4}>
                            <Button
                                flex={1}
                                bg="blue.500"
                                color="white"
                                _hover={{
                                    bg: "blue.600",
                                }}
                                onClick={addToCartHandler}
                            >
                                Add to Cart
                            </Button>
                            <Button
                                variant="outline"
                                colorScheme="blue"
                                onClick={() => window.history.back()}
                            >
                                <ArrowLeft size={16} /> Back
                            </Button>
                        </Flex>
                    </Box>
                </Flex>
            </Card.Root>
            }
        </Container>
    )
}

export default ProductDetailsPage