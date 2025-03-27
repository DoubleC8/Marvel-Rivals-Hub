import { auth } from "@/auth";

import TopNavbar from "@/components/navbars/TopNavbar";
import { Toaster } from "@/components/ui/sonner";

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
      <Toaster richColors />
    </main>
  );
}
