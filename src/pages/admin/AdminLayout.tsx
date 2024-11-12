import React from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Container,
  useBreakpointValue,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Home, PackageSearch,  LayoutDashboard, Menu, User } from "lucide-react";
import AdminNavBar from "../../components/admin/AdminNavBar";
import {
  DrawerRoot,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerTitle,
  DrawerCloseTrigger,
} from "../../components/ui/drawer";
import { Button } from "../../components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "../../app/features/loginSlice";

type NavItem = {
  text: string;
  icon: React.ReactNode;
  path?: string;
};

const navItems: NavItem[] = [
  { text: "Home", icon: <Home size={20} />, path: "/admin" },
  { text: "Products", icon: <PackageSearch size={20} />, path: "/admin/products" },
  { text: "Users", icon: <User size={20} />, path: "/admin/users" },
];



const NavListItem = ({ icon, text }: NavItem) => {
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  
  return (
    <HStack
      w="full"
      px={4}
      py={3}
      cursor="pointer"
      userSelect="none"
      rounded="md"
      transition="all 0.2s"
      _hover={{ bg: hoverBg }}
    >
      <Box color={useColorModeValue("gray.500", "gray.300")}>
        {icon}
      </Box>
      <Text fontSize="sm" fontWeight="medium">
        {text}
      </Text>
    </HStack>
  );
};


const Sidebar = ({isMobile} : 
  {isMobile : boolean}
) => {
  const bgColor = useColorModeValue("white", "gray.800");
  
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await dispatch(logout());
    console.log('Logged out');
  }

  return (
    <Box
      bg={bgColor}
      w="full"
      h="full"
      px={4}
      py={6}
    >
      <Flex align="center" mb={8} px={4}>
        <LayoutDashboard size={24} />
        <Text ml={3} fontSize="xl" fontWeight="bold">
          Dashboard
        </Text>
      </Flex>
      <VStack gap={2} align="stretch">
        {navItems.map((item) => (
          <Link to={item.path || ''} key={item.text}>
            <NavListItem icon={item.icon} text={item.text} />
          </Link>
        ))}
        {isMobile && (
          <Button variant="ghost" colorPalette={"red"} onClick={logoutHandler}>
            Logout
          </Button>)}
      </VStack>
    </Box>
  );
};

const AdminLayout = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const sidebarWidth = "280px";

    const borderColor = useColorModeValue("gray.200", "gray.700");
  return (
    <Box minH="100vh" bg={bgColor}>
      {
        !isMobile && <AdminNavBar />
      }
      
      <Flex>
        {!isMobile ? (
          <>
          <Box
            w={sidebarWidth}
            h="calc(100vh - 60px)"
            position="fixed"
            left={0}
            borderRight="1px"
            borderColor={borderColor}
          >
            <Sidebar isMobile={
              false
            } />
          </Box>
          </>
        ) : (
          <>
            <IconButton
              aria-label="Open menu"
              variant="ghost"
              position="fixed"
              left={4}
              top={4}
              onClick={() => setIsOpen(true)}
              border="1px solid #CCC"
              zIndex={10}
            >
                <Menu size={24} />
            </IconButton>
            <DrawerRoot open={isOpen} onOpenChange={(e) => setIsOpen(e.open)} placement="start">
              <DrawerBackdrop />
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Dashboard Menu</DrawerTitle>
                  <DrawerCloseTrigger asChild>
                    <IconButton
                      aria-label="Close menu"
                      size="sm"
                      variant="ghost"
                      position="absolute"
                      right={4}
                      top={4}
                    />
                  </DrawerCloseTrigger>
                </DrawerHeader>
                <DrawerBody p={0}>
                  <Sidebar isMobile={
                    true
                  } />
                </DrawerBody>
              </DrawerContent>
            </DrawerRoot>
          </>
        )}

        <Box
          ml={!isMobile ? sidebarWidth : 0}
          w={!isMobile ? `calc(100% - ${sidebarWidth})` : "full"}
          p={6}
        >
          <Container maxW="container.xl" position="relative">
            <Outlet />
          </Container>
        </Box>
      </Flex>
    </Box>
  );
};

export default AdminLayout;