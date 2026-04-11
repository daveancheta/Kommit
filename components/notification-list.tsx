"use client";

import { useState } from "react";
import { Bell, Check, CheckCheck, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

type Notification = {
  id: string;
  userId: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    userId: "user_01",
    message: "Alex assigned you a new task: \"Finalize Q2 roadmap\".",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    userId: "user_01",
    message: "Your meeting \"Sprint Planning\" starts in 15 minutes.",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 20),
    updatedAt: new Date(Date.now() - 1000 * 60 * 20),
  },
  {
    id: "3",
    userId: "user_01",
    message: "Maria commented on your task: \"Looks good, minor tweaks needed.\"",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: "4",
    userId: "user_01",
    message: "You were added to the group \"Design System v2\".",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
  },
  {
    id: "5",
    userId: "user_01",
    message: "Task \"Update API docs\" was marked as complete.",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "6",
    userId: "user_01",
    message: "New member joined your team: Jordan Lee.",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
];

function formatRelativeTime(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

function groupByDate(notifications: Notification[]) {
  const groups: Record<string, Notification[]> = {};
  const now = Date.now();

  for (const n of notifications) {
    const diff = now - n.createdAt.getTime();
    const days = Math.floor(diff / 86400000);
    const label =
      days === 0 ? "Today" : days === 1 ? "Yesterday" : "Earlier";
    groups[label] = [...(groups[label] ?? []), n];
  }

  return Object.entries(groups);
}

export default function NotificationList() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }

  function markRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }

  const groups = groupByDate(notifications);

  return (
    <div className="max-w-2xl mx-auto py-8 px-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-muted">
            <Bell className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight">
              Notifications
            </h1>
            <p className="text-xs text-muted-foreground">
              {unreadCount > 0
                ? `${unreadCount} unread`
                : "All caught up"}
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-150 px-2.5 py-1.5 rounded-md hover:bg-muted"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all read
          </button>
        )}
      </div>

      {/* Groups */}
      <div className="flex flex-col gap-6">
        {groups.map(([label, items]) => (
          <section key={label}>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest mb-2 px-1">
              {label}
            </p>

            <div className="flex flex-col divide-y divide-border rounded-xl border border-border overflow-hidden">
              {items.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className={cn(
                    "flex items-start gap-3 px-4 py-3.5 cursor-pointer transition-colors duration-150",
                    n.isRead
                      ? "bg-card hover:bg-muted/40"
                      : "bg-muted/20 hover:bg-muted/40"
                  )}
                >
                  {/* Unread indicator */}
                  <div className="mt-1.5 flex-shrink-0 w-4 flex justify-center">
                    {!n.isRead ? (
                      <Circle
                        className="w-2 h-2 fill-primary text-primary"
                        strokeWidth={0}
                      />
                    ) : (
                      <Check className="w-3 h-3 text-muted-foreground/40" />
                    )}
                  </div>

                  {/* Message */}
                  <p
                    className={cn(
                      "flex-1 text-sm leading-relaxed",
                      n.isRead
                        ? "text-muted-foreground"
                        : "text-foreground font-medium"
                    )}
                  >
                    {n.message}
                  </p>

                  {/* Time */}
                  <span className="flex-shrink-0 text-[11px] text-muted-foreground/60 mt-0.5 tabular-nums">
                    {formatRelativeTime(n.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}

        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
            <Bell className="w-8 h-8 opacity-20" />
            <p className="text-sm">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
