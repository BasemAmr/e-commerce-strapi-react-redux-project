import { Card, Skeleton, Flex, Box } from "@chakra-ui/react"

interface ProductCardSkeletonProps {
    
}

const ProductCardSkeleton = ({ }: ProductCardSkeletonProps) => {
    return (
        <>
            <Card.Root
                maxW={["300px", "350px"]}
                overflow="hidden"
                bg="gray.100"
                borderRadius="lg"
                border={"1px solid"}
                padding={"1rem"}
                boxShadow="xl"
                m="auto"
            >
                <Box position="relative" p={4}>
                    <Skeleton
                        width="200px"
                        height="200px"
                        borderRadius="full"
                        mx="auto"
                    />
                    <Skeleton
                        position="absolute"
                        top={2}
                        right={2}
                        width="40px"
                        height="20px"
                    />
                </Box>

                <Card.Body gap={3}>
                    <Skeleton height="24px" width="80%" />
                    
                    <Flex align="center" gap={2}>
                        <Skeleton width="20px" height="20px" />
                        <Skeleton width="100px" height="20px" />
                    </Flex>

                    <Skeleton
                        height="40px"
                        width="60%"
                        mx="auto"
                    />
                </Card.Body>

                <Card.Footer p={4}>
                    <Skeleton
                        height="40px"
                        width="100%"
                    />
                </Card.Footer>
            </Card.Root>
        </>
    )
}

export default ProductCardSkeleton