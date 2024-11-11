import { Box, Skeleton, Table } from "@chakra-ui/react";

const DashboardTableSkeleton = () => {
    return (
        <Table.Root variant="outline" colorScheme="gray" size="md">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>ID</Table.ColumnHeader>
                    <Table.ColumnHeader>Title</Table.ColumnHeader>
                    <Table.ColumnHeader>Description</Table.ColumnHeader>
                    <Table.ColumnHeader>Price</Table.ColumnHeader>
                    <Table.ColumnHeader>Stock</Table.ColumnHeader>
                    <Table.ColumnHeader>Image</Table.ColumnHeader>
                    <Table.ColumnHeader>Actions</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {[...Array(5)].map((_, index) => (
                    <Table.Row key={index}>
                        <Table.Cell><Skeleton height="20px" width="30px" /></Table.Cell>
                        <Table.Cell><Skeleton height="20px" width="150px" /></Table.Cell>
                        <Table.Cell><Skeleton height="20px" width="200px" /></Table.Cell>
                        <Table.Cell><Skeleton height="20px" width="80px" /></Table.Cell>
                        <Table.Cell><Skeleton height="20px" width="60px" /></Table.Cell>
                        <Table.Cell>
                            <Skeleton height="50px" width="50px" />
                        </Table.Cell>
                        <Table.Cell>
                            <Box display="flex" flexDirection={{ base: "column", md: "row" }} gap={2}>
                                <Skeleton height="32px" width="60px" />
                                <Skeleton height="32px" width="60px" />
                            </Box>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
};

export default DashboardTableSkeleton;