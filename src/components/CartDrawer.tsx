import {
  DrawerRoot as Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerBackdrop as DrawerOverlay,
  DrawerContent,
  DrawerCloseTrigger as DrawerCloseButton,
} from "./ui/drawer";
import {Button} from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { closeCartDrawer } from "../app/features/globalSlice";

import CartDrawerItem from "./cartDrawerItem";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { isOpenCartDrawer } = useSelector((state: RootState) => state.global);
  const { items } = useSelector((state: RootState) => state.cart);

  const onClose = () => {
    dispatch(closeCartDrawer());
  };

  const renderCartItems = () => {
    return items.map((item) => (
      <CartDrawerItem key={item.id} item={item} />
    ));
  }

  return (
    <Drawer size={"md"} open={isOpenCartDrawer} placement="end">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton onClick={onClose}/>
        <DrawerHeader>Shopping Cart ({items.length} items)</DrawerHeader>

        <DrawerBody>
          {renderCartItems()}
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue">Checkout</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;