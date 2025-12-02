export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // dito ilalagay ung sidenav
    <>
      {/* sidenav */}
      {children}
      {/* footer */}
    </>
  );
}
