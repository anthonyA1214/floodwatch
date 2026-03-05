import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IconLock, IconUser } from '@tabler/icons-react';
import AccountTab from '@/components/map/account-tab';
import SecurityTab from '@/components/map/security-tab';

export default function ProfileOverlay() {
  return (
    <div className="flex flex-col bg-white w-screen md:w-[400px] md:h-[80vh] rounded-xl shadow-md pointer-events-auto">
      <Tabs defaultValue="account" className="flex-1 flex flex-col min-h-0">
        <div className="w-full border-b px-4 pt-4">
          <TabsList variant="line" className="font-poppins w-full">
            <TabsTrigger
              value="account"
              className="data-[state=active]:text-[#0066CC] 
                data-[state=active]:after:bg-[#0066CC] text-base"
            >
              <IconUser />
              Account
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="data-[state=active]:text-[#0066CC] 
                data-[state=active]:after:bg-[#0066CC] text-base"
            >
              <IconLock />
              Security
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="account"
          className="flex-1 min-h-0 overflow-y-auto" // ← overflow-y-auto directly
        >
          <AccountTab />
        </TabsContent>

        <TabsContent
          value="password"
          className="flex-1 min-h-0 overflow-y-auto"
        >
          <SecurityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
