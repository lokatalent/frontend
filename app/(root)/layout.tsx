export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = true;

  return (
    <>
      {children}
    </>
  );
}
