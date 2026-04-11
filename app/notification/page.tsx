import Sidebar from "@/components/sidebar-provider";
import NotificationList from "@/components/notification-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications",
};

export default function NotificationPage() {
  return (
    <Sidebar>
      <NotificationList />
    </Sidebar>
  );
}
