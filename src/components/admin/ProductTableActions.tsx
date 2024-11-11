import { FC } from 'react';
import { HStack, IconButton, Spinner } from '@chakra-ui/react';
import { Tooltip } from '../ui/tooltip';
import { Eye, Pencil, Trash } from 'lucide-react';

interface ProductTableActionsProps {
    onView: () => void;
    onEdit: () => void;
    onDelete: () => void;
    isDeleting?: boolean;
}

export const ProductTableActions: FC<ProductTableActionsProps> = ({
    onView,
    onEdit,
    onDelete,
    isDeleting = false
}) => {
    return (
        <HStack gap={2}>
            <Tooltip  openDelay={100} content="View Product" showArrow >
                <IconButton
                    aria-label="View product"
                    variant="ghost"
                    colorPalette="blue"
                    size="sm"
                    onClick={onView}
                >
                    <Eye size={18} />
                </IconButton>
            </Tooltip>

            <Tooltip openDelay={100} content="Edit Product" showArrow >
                <IconButton
                    aria-label="Edit product"
                    variant="ghost"
                    colorPalette="green"
                    size="sm"
                    onClick={onEdit}
                >
                    <Pencil size={18} />
                </IconButton>
            </Tooltip>

            <Tooltip openDelay={100} content="Delete Product" showArrow >
                <IconButton
                    aria-label="Delete product"
                    variant="ghost"
                    colorPalette="red"
                    size="sm"
                    onClick={onDelete}
                >
                    {
                        isDeleting ? <Spinner size="xs" /> : <Trash size={18} />
                    }
                </IconButton>
            </Tooltip>
        </HStack>
    );
};