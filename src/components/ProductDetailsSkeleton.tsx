import { Box,  Flex, Skeleton } from "@chakra-ui/react"
import { SkeletonText } from "./ui/skeleton"
const ProductDetailsSkeleton = () => {
    return (
        <Box
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
                    <Skeleton
                        height="400px"
                        borderRadius="lg"
                    />
                </Box>

                <Box flex="1" display="flex" flexDirection="column" gap={4}>
                    <Skeleton height="40px" width="70%" />
                    
                    <SkeletonText
                        noOfLines={4}
                        gap={4}
                        height={4}
                    />

                    <Box mt={4}>
                        <Skeleton height="20px" width="150px" mb={2} />
                        <Skeleton height="30px" width="120px" />
                    </Box>

                    <Flex gap={4} mt={8}>
                        <Skeleton height="40px" flex={1} />
                        <Skeleton height="40px" width="100px" />
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}

export default ProductDetailsSkeleton