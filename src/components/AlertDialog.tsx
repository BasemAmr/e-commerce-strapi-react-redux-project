import { useCallback } from 'react';
import {
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { BaseDialog } from './BaseDialog';
import { AlertDialogProps } from '../interfaces';
import { useColorModeValue } from '@chakra-ui/color-mode';

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onClose,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  variant = 'danger'
}) => {
  const colorScheme = {
    danger: 'red',
    warning: 'orange',
    info: 'blue'
  }[variant];

  const handleConfirm = useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);

  const buttonBg = useColorModeValue(`${colorScheme}.500`, `${colorScheme}.600`);
  const buttonHoverBg = useColorModeValue(`${colorScheme}.600`, `${colorScheme}.700`);

  return (
    <BaseDialog open={open} onClose={onClose}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        {description}
      </DialogBody>
      <DialogFooter>
        <Button
          variant="ghost"
          onClick={onClose}
        >
          {cancelLabel}
        </Button>
        <Button
          bg={buttonBg}
          _hover={{ bg: buttonHoverBg }}
          onClick={handleConfirm}
        >
          {confirmLabel}
        </Button>
      </DialogFooter>
    </BaseDialog>
  );
};