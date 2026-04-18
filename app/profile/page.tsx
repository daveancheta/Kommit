import ProfilePage from "@/components/profile-page";
import Sidebar from "@/components/sidebar-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default function Page() {
  return (
    <Sidebar>
      <ProfilePage />
    </Sidebar>
  );
}

