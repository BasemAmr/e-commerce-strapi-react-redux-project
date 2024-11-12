import { Table } from "@chakra-ui/react"
import { userColumns } from "../../data/tableConfig"
import { AuthUser } from "../../interfaces/index.ts"
import { DashboardTableHeader } from "./DashboardTableHeader"
import { DashboardTableRow } from "./DashboardTableRow.tsx.tsx"
import { ErrorState } from "./ErrorState"
import { useState } from "react"
import DashboardTableSkeleton from "./DashboardTableSkeleton"
import { useGetUsersQuery, useUpdateUserMutation } from "../../app/services/userApi.ts"
import { UserEditDialog } from "./UserEditDialog.tsx"



const DashboardUsersTable = () => {


  
  const [selectedUser, setSelectedUser] = useState<AuthUser | undefined>(undefined);
  const [updateUser, {
    data: updateData
  }] = useUpdateUserMutation();
  // const [page, setPage] = useState(1);

  const { data , isLoading, isError } = useGetUsersQuery(); 
  if (isLoading) return <DashboardTableSkeleton />;
  if (isError) return <ErrorState onRetry={() => window.location.reload()} />;
  

  const handleUpdate = async (role: string) => {
   await updateUser({documentId: selectedUser?.id, selectedUser, role})
   console.log(updateData)
    setSelectedUser(undefined)
      
  }

  return (
    
    
    <>
    <Table.Root>
      <DashboardTableHeader 
        columns={userColumns}
        // onSort={handleSort}
        // currentSort={currentSort}
      />
      <Table.Body>
        {data && data.map((user: AuthUser) => (
          <DashboardTableRow
            key={user.id}
            data={user}
            columns={userColumns}
            actionTriggers={{
              onEdit: () => {
                setSelectedUser(user)
              },
            }}
          />
        ))}
      </Table.Body>


    </Table.Root>
    <UserEditDialog
      isOpen={!!selectedUser}
      onClose={() => setSelectedUser(undefined)}
      user={selectedUser}
      onSubmit={handleUpdate}
      Roles={["admin", "authenticated"]}
    />
    </>
    
  )
}

export default DashboardUsersTable