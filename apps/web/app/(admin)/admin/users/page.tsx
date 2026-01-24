import SearchBar from '@/components/admin/user-management-components/search-bar';
import TotalUserCard from '@/components/admin/user-management-components/total-users-card';
import ActiveUsersCard from '@/components/admin/user-management-components/active-users-card';
import BlockedUsersCard from '@/components/admin/user-management-components/blocked-users-card';
import TotalUserTable from '@/components/admin/user-management-components/total-user-table';

export default function UserManagement() {
  return (
    // user management
    <div className="flex-1 rounded-2xl p-8 bg-white">
      <h1 className="text-4xl font-bold"> User Management </h1>
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div>
          <TotalUserCard />
        </div>

        <div>
          <ActiveUsersCard />
        </div>

        <div>
          <BlockedUsersCard />
        </div>
      </div>

      <h1 className="text-2xl mt-4"> Total Users </h1>

      <div>
        <TotalUserTable />
      </div>
    </div>
  );
}
