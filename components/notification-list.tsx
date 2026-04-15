"use client";

import { useEffect, useMemo } from "react";
import { Bell, Check, CheckCheck, Circle, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { UseUserStore } from "@/app/state/use-user-store";
import { supabase } from "@/lib/supbase/cient";
import { formatDistance } from "date-fns";

export default function NotificationList() {

  const {
    handleGetNotifcation,
    notification,
    isLoading,
    handleUpdateNotificationValidation,
    handleUpdateNotificationByIdValidation,
  } = UseUserStore();

  const unreadCount = useMemo(
    () => notification.filter((n) => !n.is_read).length,
    [notification]
  );

  useEffect(() => {
    handleGetNotifcation(true)
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel("user:notification")
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "notification"
      },
        async (payload) => {
          handleGetNotifcation(false)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const handleUpdateNotification = (e: any) => {
    e.preventDefault()

    handleUpdateNotificationValidation()
  }


  return (
    <div className="mx-auto w-full max-w-2xl px-3 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-border/60 bg-card p-2 shadow-sm">
            <Bell className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight">
              Notifications
            </h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleUpdateNotification}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <CheckCheck className="h-4 w-4" />
            Mark all read
          </button>
        )}
      </div>

      {/* Groups */}
      <div className="flex flex-col gap-4">
        <section>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "h-2 w-2 rounded-full",
                    unreadCount > 0 ? "bg-primary" : "bg-muted-foreground/30"
                  )}
                />
                <p className="text-sm font-medium leading-none">Updates</p>
              </div>
              <p className="text-xs text-muted-foreground">
                {unreadCount > 0 ? "New activity" : "No new activity"}
              </p>
            </div>
            {isLoading ? (
              <div className="divide-y divide-border/60">
                {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                    className="flex items-start gap-3 px-4 py-3.5"
                >
                  {/* Unread indicator skeleton */}
                    <div className="mt-1.5 flex w-5 shrink-0 justify-center">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-muted" />
                  </div>

                  {/* Message skeleton */}
                    <div className="flex-1 space-y-2 py-0.5">
                      <div className="h-3.5 w-4/5 animate-pulse rounded bg-muted" />
                      <div className="h-3.5 w-2/5 animate-pulse rounded bg-muted opacity-60" />
                  </div>

                  {/* Time skeleton */}
                  <div className="shrink-0 mt-0.5">
                      <div className="h-3 w-12 animate-pulse rounded bg-muted" />
                  </div>
                </div>
                ))}
              </div>
            ) : (
              <div className="divide-y divide-border/60">
                {notification.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() =>
                      !n.is_read && handleUpdateNotificationByIdValidation(n.id)
                    }
                    className={cn(
                      "group flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      n.is_read
                        ? "bg-card hover:bg-muted/40"
                        : "bg-primary/6 hover:bg-muted/50"
                    )}
                  >
                    {/* Unread indicator */}
                    <div className="mt-1.5 flex w-5 shrink-0 justify-center">
                      {!n.is_read ? (
                        <Circle
                          className="h-2.5 w-2.5 fill-primary text-primary"
                          strokeWidth={0}
                        />
                      ) : (
                        <Check className="h-3.5 w-3.5 text-muted-foreground/40" />
                      )}
                    </div>

                    {/* Message */}
                    <div className="min-w-0 flex-1">
                      <p
                        className={cn(
                          "text-sm leading-relaxed",
                          n.is_read
                            ? "text-muted-foreground"
                            : "text-foreground font-medium"
                        )}
                      >
                        {n.message}
                      </p>
                      {!n.is_read && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Tap to mark as read
                        </p>
                      )}
                    </div>

                    {/* Time */}
                    <span className="mt-0.5 shrink-0 text-[11px] tabular-nums text-muted-foreground/70">
                      {formatDistance(new Date(n.created_at), new Date(), {
                        addSuffix: true,
                      })}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {!isLoading && notification.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/70 bg-muted/20 px-6 py-16 text-center text-muted-foreground">
            <div className="rounded-2xl bg-background p-3 shadow-sm">
              <Inbox className="h-6 w-6 opacity-60" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground/80">
                No notifications yet
              </p>
              <p className="mt-1 text-xs">
                When something needs your attention, it’ll show up here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
