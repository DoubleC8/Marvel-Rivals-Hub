import { auth } from "@/auth";
import SignOutButton from "@/components/buttons/SignOutButton";
import TopNavbar from "@/components/navbars/TopNavbar";

export default async function Home() {
  const session = await auth();
  console.log(session?.user);
  return (
    <>
      <TopNavbar
        userEmail={session?.user?.email ?? ""}
        userProfilePic={session?.user?.image ?? ""}
      />
    </>
  );
}
