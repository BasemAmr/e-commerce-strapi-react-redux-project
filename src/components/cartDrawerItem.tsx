import { Flex, Button, Text, Box, Image, Stack } from "@chakra-ui/react";
import { ICartItem, removeAllItems, removeOneItem } from "../app/features/cartSlice";
import { useDispatch } from "react-redux";
interface cartDrawerItemProps {
    item: ICartItem;
}

const CartDrawerItem = ({item :{ 
    id, 
    title, 
    price, 
    quantity, 
    thumbnail, 
    discount
 }}: cartDrawerItemProps) => {

    const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL
    const discountedPrice = discount ? price - (price * discount / 100) : price

    const dispatch = useDispatch()

    const removeAllHandler = () => {
        dispatch(removeAllItems({id}))
    }
    const removeOneHandler = () => {
        dispatch(removeOneItem({id}))
    }


    return (
        <>
            <Flex 
                direction={{ base: "column", sm: "row" }}
                align={{ base: "center", sm: "center" }}
                justify={{ base: "center", sm: "space-between" }}
                p={4}
                gap={4}
                borderBottom="1px solid"
                borderColor="gray.100"
            >
                <Image 
                    src={`${VITE_SERVER_URL}${thumbnail.url}`}
                    alt={title}
                    width={{ base: "150px", sm: "100px" }}
                    height={{ base: "150px", sm: "100px" }}
                    objectFit="cover"
                    borderRadius="lg"
                />
                
                <Box 
                    flex="1"
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    textAlign={{ base: "center", sm: "left" }}
                >
                    <Text fontSize={{ base: "md", sm: "lg" }} fontWeight="bold" color="blue.600">
                        {title}
                    </Text>
                    <Text fontSize={{ base: "sm", sm: "md" }} color="gray.600">
                        ${discountedPrice} x {quantity}
                    </Text>
                    <Text fontSize={{ base: "sm", sm: "md" }} color="gray.600">
                        Total: ${discountedPrice * quantity}
                    </Text>
                </Box>

                <Stack 
                    direction={{ base: "row", sm: "column" }}
                    gap={2}
                    align="center"
                >
                    <Button colorScheme="red" size="sm" 
                    onClick={removeAllHandler}>
                        Remove
                    </Button>
                    <Button colorScheme="red" size="sm" onClick={removeOneHandler}>
                        Remove One
                    </Button>
                </Stack>
            </Flex>
        </>
    )
}

export default CartDrawerItem