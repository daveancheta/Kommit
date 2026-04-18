import NotificationList from "@/components/notification-list";
import Sidebar from "@/components/sidebar-provider";

export default function NotificationPage() {
  return (
    <Sidebar>
      <NotificationList />
    </Sidebar>
  );
}
