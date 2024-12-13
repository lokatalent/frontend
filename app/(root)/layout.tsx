export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // if (!loggedIn) redirect("/login");
  return <div className="">{children}</div>;
}
