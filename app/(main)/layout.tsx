import { auth } from "@/auth";

import TopNavbar from "@/components/navbars/TopNavbar";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <main>
      <TopNavbar
        userEmail={session?.user?.email ?? ""}
        userProfilePic={session?.user?.image ?? ""}
      />
      <div>{children}</div>
    </main>
  );
}
