export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // dito ilalagay ung topnav or footer.
    <>
      {/* topnav */}
      {children}
      {/* footer */}
    </>
  );
}
