import SideNav from '@/components/admin/side-nav';
import { SidebarProvider } from '@/components/ui/sidebar';
import { redirectIfNotAdmin } from '@/lib/actions/auth-redirect';

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await redirectIfNotAdmin();

  return (
    <SidebarProvider>
      <SideNav />
      <main className="flex py-4 pe-4 w-full">{children}</main>
    </SidebarProvider>
  );
}
