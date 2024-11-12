import { 
    Box, 
    Flex, 
    Button, 
    useDisclosure, 
    Stack, 
    IconButton, 
    Text,
    Container
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { Menu, X, ShoppingCart, Home, Package, LogIn, UserPlus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { openCartDrawer } from "../app/features/globalSlice";
import CookiesService from "../services/cookies"; 
import { logout } from "../app/features/loginSlice";

const NavBar = () => {
    const { open, onToggle } = useDisclosure();
    const token = CookiesService.getCookie('jwt');
    const { items } = useSelector((state: RootState) => state.cart);

    // Logout handler
    const dispatch = useDispatch();

    const logoutHandler = async () => {
         await dispatch(logout());
        console.log('Logged out');
    }

    // Dispatch for opening the cart drawer

    return (
        <Box 
            position="sticky" 
            top={0} 
            zIndex={10}
            bgGradient="linear-gradient(to right, #8080FF, #4D4DFF)"
            boxShadow="0 2px 10px rgba(0,0,0,0.1)"
        >
            <Container maxW="container.xl">
                <Flex
                    minH="60px"
                    py={{ base: 2 }}
                    px={{ base: 4 }}
                    align="center"
                >
                    {/* Mobile Navigation */}
                    <IconButton 
                        _hover={{ bg: "blue.500" }} 
                        color="white" 
                        aria-label="Toggle Navigation" 
                        variant="ghost" 
                        onClick={onToggle} 
                        display={{ base: "flex", md: "none" }} 
                    >
                        {open ? <X /> : <Menu />}
                    </IconButton>

                    {/* Logo/Brand */}
                    <Text
                        textAlign={{ base: "center", md: "left" }}
                        fontFamily="heading"
                        color="white"
                        fontSize="2xl"
                        fontWeight="bold"
                        flex={{ base: 1, md: "auto" }}
                        textShadow="0 0 10px rgba(0,0,0,0.2)"
                    >
                        E-Shop
                    </Text>

                    {/* Desktop Navigation */}
                    <Stack
                        direction={{ base: "column", md: "row" }}
                        display={{ base: open ? "flex" : "none", md: "flex" }}
                        width={{ base: "full", md: "auto" }}
                        alignItems="center"
                        flex={{ base: 1, md: "auto" }}
                        mt={{ base: 4, md: 0 }}
                    >
                        <NavLink to="/">
                            {({ isActive }) => (
                                <Button
                                    variant="ghost"
                                    color="white"
                                    bg={isActive ? "blue.700" : "transparent"}
                                    _hover={{ bg: "blue.500" }}
                                >
                                    <Home size={20} /> Home
                                </Button>
                            )}
                        </NavLink>

                        <NavLink to="/products">
                            {({ isActive }) => (
                                <Button
                                    variant="ghost"
                                    color="white"
                                    bg={isActive ? "blue.700" : "transparent"}
                                    _hover={{ bg: "blue.500" }}
                                >
                                    <Package size={20} /> Products
                                </Button>
                            )}
                        </NavLink>

                        {token ? (
                                    <Button
                                        variant="ghost"
                                        color="white"
                                        bg={"blue.400"}
                                        _hover={{ bg: "blue.700" }}
                                        onClick={logoutHandler}
                                    >
                                        <LogIn size={20} /> Logout
                                    </Button>
                        ):
                        <Flex gap={2}>
                            <NavLink to="/login">
                                {({ isActive }) => (
                                    <Button
                                        variant="ghost"
                                        color="white"
                                        bg={isActive ? "blue.700" : "transparent"}
                                        _hover={{ bg: "blue.500" }}
                                    >
                                        <LogIn size={20} /> Login
                                    </Button>
                                )}
                            </NavLink>

                            <NavLink to="/register">
                                {({ isActive }) => (
                                    <Button
                                        variant="ghost"
                                        color="white"
                                        bg={isActive ? "blue.700" : "transparent"}
                                        _hover={{ bg: "blue.500" }}
                                    >
                                        <UserPlus size={20} /> Register
                                    </Button>
                                )}
                            </NavLink>
                        </Flex>
                        }

                    </Stack>

                    {/* Right side - Cart button */}
                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify="flex-end"
                        direction="row"
                    >
                        <Button
                            display={{ base: open ? "none" : "inline-flex", md: "inline-flex" }}
                            fontSize="sm"
                            fontWeight={600}
                            color="white"
                            variant="ghost"
                            _hover={{ bg: "blue.500" }}
                            onClick={() => dispatch(openCartDrawer())}
                        >
                            <ShoppingCart size={20} /> Cart {items.length > 0 && `(${items.length})`}
                        </Button>
                    </Stack>
                </Flex>
            </Container>
        </Box>
    );
};

export default NavBar;