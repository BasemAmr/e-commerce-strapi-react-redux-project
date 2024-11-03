import { Card, Text, Image, Box, Badge, Flex, Button } from "@chakra-ui/react"
import { Tag, ArrowRight, Folder } from 'lucide-react'
import { IProduct } from "../interfaces"
import { useNavigate } from "react-router-dom"

interface ProductCardProps {
  props: IProduct
}

const ProductCard = ({ props }: ProductCardProps) => {
    const { title, category, price, discount, thumbnail } = props
    const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL
    const image = `${VITE_SERVER_URL}${thumbnail.url}`

    const navigationUrl = `${props.documentId}`
    const navigate = useNavigate()

    const viewDetails = () => {
          navigate(navigationUrl)
    }

    return (
        <Card.Root 
          maxW={["300px", "350px"]}
          overflow="hidden"
          bg="white"
          borderRadius="xl"
          border={"1px solid"}
          borderColor="gray.200"
          padding={"1rem"}
          boxShadow="sm"
          m="auto"
          _hover={{ 
            transform: 'translateY(-2px)', 
            transition: 'all 0.2s',
            boxShadow: 'md' 
          }}
        >
          <Box position="relative" p={4}>
            <Image
              src={image}
              alt={title}
              width="200px"
              height="200px"
              borderRadius="lg"
              mx="auto"
              objectFit="cover"
              border="2px solid"
              borderColor="blue.100"
            />
            {discount > 0 && (
              <Badge
                position="absolute"
                top={2}
                right={2}
                bg="blue.50"
                color="blue.600"
                display="flex"
                alignItems="center"
                fontSize="xs"
                gap={1}
                px={2}
                py={1}
                borderRadius="full"
              >
                <Tag size={14} /> -{discount}%
              </Badge>
            )}
          </Box>

          <Card.Body gap={3}>
            <Card.Title fontSize="lg" color="gray.900">{title}</Card.Title>
            
            <Flex align="center" gap={2}>
              <Folder size={16} color="#0969da" />
              <Text color="blue.600" fontSize="sm">{category.title}</Text>
            </Flex>

            <Text
              fontSize="xl"
              fontWeight="semibold"
              color="gray.900"
              textAlign="left"
              p={2}
            >
              ${price}
              {discount > 0 && (
                <Text
                  as="span"
                  fontSize="sm"
                  textDecoration="line-through"
                  color="gray.400"
                  ml={2}
                >
                  ${price * (1 + discount/100)}
                </Text>
              )}
            </Text>
          </Card.Body>

          <Card.Footer p={4}>
            <Button
              width="full"
              bg="blue.500"
              color="white"
              _hover={{
                bg: "blue.600",
              }}
              fontSize="sm"
              onClick={viewDetails}
            >
              View Details <ArrowRight size={16} />
            </Button>
          </Card.Footer>
        </Card.Root>
    )
}

export default ProductCard