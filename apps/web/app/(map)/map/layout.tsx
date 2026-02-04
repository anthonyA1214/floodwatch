import TopNav from '@/components/map/top-nav';
import { ProfileContextProvider } from '@/contexts/profile-context';

export default function MapLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ProfileContextProvider>
      <div className="flex flex-col h-screen">
        <TopNav />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </ProfileContextProvider>
  );
}
