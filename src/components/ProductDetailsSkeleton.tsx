import { Card, Skeleton, Flex, Box } from '@chakra-ui/react';

const ProductDetailsSkeleton = () => {
    return (
        <Card.Root
            maxW="sm"
            overflow="hidden"
            bg="purple.100"
            borderRadius="lg"
            border="1px solid"
            padding="2rem"
            boxShadow="xl"
            m="auto"
        >
            <Card.Header>
                <Skeleton
                    height="300px"
                    borderRadius="lg"
                    border="4px solid"
                    borderColor="purple.400"
                />
            </Card.Header>
            <Card.Body gap={4}>
                <Skeleton height="2.5rem" mb={4} />
                <>
                    <Skeleton height="1rem" mb={2} />
                    <Skeleton height="1rem" mb={2} />
                    <Skeleton height="1rem" mb={2} />
                </>
                <Flex gap={4} align="center">
                    <Box>
                        <Skeleton height="1.5rem" width="80px" mb={2} />
                        <Skeleton height="2rem" width="100px" />
                    </Box>
                    <Skeleton height="1.5rem" width="100px" />
                </Flex>
            </Card.Body>
            <Card.Footer p={4}>
                <Skeleton
                    height="2.5rem"
                    width="100%"
                    borderRadius="md"
                />
            </Card.Footer>
        </Card.Root>
    );
};

export default ProductDetailsSkeleton;