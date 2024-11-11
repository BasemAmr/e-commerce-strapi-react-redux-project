import {
    DialogRoot,
    DialogContent,
    DialogBackdrop,
  } from "./ui/dialog";
  import { BaseDialogProps } from "../interfaces";
  
  export const BaseDialog: React.FC<BaseDialogProps> = ({
    open,
    onClose,
    children
  }) => {
    return (
      <DialogRoot 
        open={open} 
        onOpenChange={onClose}
        closeOnInteractOutside
        
      >
        <DialogBackdrop />
        <DialogContent padding="2rem">
          {children}
        </DialogContent>
      </DialogRoot>
    );
  };