import { useDisclosure, Flex, IconButton, Stack, Button,Box, Container , Text} from "@chakra-ui/react";
import {  X, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminNavBar = () => {
    const { open, onToggle } = useDisclosure();

    return (
        <Box position="sticky" top={0} zIndex={10} bg="white" boxShadow="sm">
            <Container maxW="container.xl">
                <Flex minH="60px" py={{ base: 2 }} px={{ base: 4 }} align="center">
                    <Text
                        textAlign={{ base: "center", md: "left" }}
                        fontFamily="heading"
                        fontSize="2xl"
                        fontWeight="bold"
                        flex={{ base: 1, md: "auto" }}
                    >
                        Admin Panel
                    </Text>
                    <Stack
                        direction={{ base: "column", md: "row" }}
                        display={{ base: open ? "flex" : "none", md: "flex" }}
                        width={{ base: "full", md: "auto" }}
                        alignItems="center"
                        flex={{ base: 1, md: "auto" }}
                        mt={{ base: 4, md: 0 }}
                    >
                        <NavLink to="/admin/login">
                            <Button variant="ghost">Login</Button>
                        </NavLink>
                        <NavLink to="/admin/logout">
                            <Button variant="ghost">Logout</Button>
                        </NavLink>
                    </Stack>
                        <IconButton
                            aria-label="Toggle Navigation"
                            variant="ghost"
                            onClick={onToggle}
                            display={{ base: "flex", md: "none" }}
                        >
                            {open ? <X /> : <Menu />}
                        </IconButton>
                </Flex>
            </Container>
        </Box>
    );
};

export default AdminNavBar;