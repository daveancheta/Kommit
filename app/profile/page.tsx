import ProfilePage from "@/components/profile-page";
import Sidebar from "@/components/sidebar-provider";

export default function Page() {
  return (
    <Sidebar>
      <ProfilePage />
    </Sidebar>
  );
}

