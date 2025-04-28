import { auth } from "@/auth";
import Footer from "@/components/navbars/Footer";

import TopNavbar from "@/components/navbars/TopNavbar";
import { Toaster } from "@/components/ui/sonner";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <main className="flex flex-col min-h-screen w-full">
      <TopNavbar
        userEmail={session?.user?.email ?? ""}
        userProfilePic={session?.user?.image ?? ""}
      />

      {/* Growable content section */}
      <div className="flex-grow">{children}</div>

      <Toaster richColors position="top-right" expand={true} />

      {/* Footer naturally sits at bottom */}
      <Footer />
    </main>
  );
}
