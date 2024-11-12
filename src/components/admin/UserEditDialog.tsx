import { FC,    useState } from 'react';
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
  } from '../ui/dialog';
import { BaseDialog } from '../BaseDialog';
import { SelectItem,  SelectValueText, SelectTrigger, SelectContent,} from '../ui/select';

import { createListCollection, Select} from '@chakra-ui/react';
import { Button } from '../ui/button';


import { AuthUser } from '../../interfaces';
import { UserCog } from 'lucide-react';

interface ProductEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user?: AuthUser;
  onSubmit: (role: string) => Promise<void>;
  Roles: string[];
}



export const UserEditDialog: FC<ProductEditDialogProps> = ({
  isOpen,
  onClose,
  user,
  onSubmit,
  Roles,
}) => {
    const [isSubmitting, setSubmitting] = useState(false);
    if (!user) return null;
    let userRole = '';
    
    
  
    const roles = createListCollection({
        items: Roles.map((role: string) => ({ value: role }))
    });
  

    const handleSubmit = async (e: React.FormEvent) => {
        setSubmitting(true);
        e.preventDefault();
        await onSubmit(userRole);

        setSubmitting(false);
        // onClose();
    }

  return (
    <BaseDialog open={isOpen} onClose={onClose}>
        <DialogHeader>
          <DialogTitle>
            Edit User Role  <UserCog />
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          
        <Select.Root
            onValueChange={(value) => {
                userRole = value.value[0]
            } }
            collection={roles}
            zIndex={1600}
            >
               <SelectTrigger>
                <SelectValueText placeholder="Select Category" />
              </SelectTrigger>  
              <SelectContent zIndex={1600}>
              {roles.items.map((role) => (
                <SelectItem key={role.value} item={role}>
                  {role.value}
                </SelectItem>
              ))}
            </SelectContent>
        </Select.Root>


          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
    </BaseDialog>
  );
};