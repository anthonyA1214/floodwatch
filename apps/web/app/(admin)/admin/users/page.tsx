import UserStatCard from '@/components/admin/users/user-stat-card';
import SearchBar from '@/components/search-bar';
import { DataTable } from './data-table';
import { columns } from './columns';
import { getUsers } from '@/lib/users/users';
import { AddNewAdminModal } from '@/components/admin/users/add-new-admin-modal';

export default async function UserManagementPage() {
  // Dummy data for demonstration purposes
  const data = await getUsers();

  return (
    <div className="flex-1 flex flex-col bg-white p-8 rounded-2xl gap-8 min-h-0">
      {/* Header */}
      <h1 className="font-poppins text-3xl font-bold">User Management</h1>

      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <SearchBar placeholder="Search by name..." />
        </div>
        <div className="flex w-fit">
          <AddNewAdminModal />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <UserStatCard label="Total Users" count={1234} status="total" />
        <UserStatCard label="Active Users" count={567} status="active" />
        <UserStatCard label="Blocked Users" count={12} status="blocked" />
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
