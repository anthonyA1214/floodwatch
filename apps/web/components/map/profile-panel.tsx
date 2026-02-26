import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IconLock, IconUser } from '@tabler/icons-react';
import AccountTab from '@/components/map/account-tab';
import SecurityTab from '@/components/map/security-tab';

export default function ProfilePanel() {
  return (
    // <div
    //   className="flex flex-col bg-white rounded-xl shadow-md ps-4 py-4
    //   w-screen h-screen md:w-[400px] md:h-fit"
    // >
    <div className="flex flex-col bg-white ps-4 py-4 w-screen md:w-[400px] md:h-[80vh] rounded-xl shadow-md">
      <Tabs defaultValue="account" className="flex-1 flex flex-col min-h-0">
        <div className="w-full border-b">
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
          className="flex-1 min-h-0 pt-4 overflow-y-auto pr-4" // ← overflow-y-auto directly
        >
          <AccountTab /> {/* no ScrollArea wrapper */}
        </TabsContent>

        <TabsContent
          value="password"
          className="flex-1 min-h-0 pt-4 overflow-y-auto pr-4"
        >
          <SecurityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
