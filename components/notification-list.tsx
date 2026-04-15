"use client";

import { useEffect, useState } from "react";
import { Bell, Check, CheckCheck, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { UseUserStore } from "@/app/state/use-user-store";
import { supabase } from "@/lib/supbase/cient";
import { formatDistance } from "date-fns";

export default function NotificationList() {

  const { handleGetNotifcation, notification, isLoading, handleUpdateNotificationValidation, handleUpdateNotificationByIdValidation } = UseUserStore()

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
              {notification.filter((n) => !n.is_read).length > 0
                ? `${notification.filter((n) => !n.is_read).length} unread`
                : "All caught up"}
            </p>
          </div>
        </div>

        {notification.filter((n) => !n.is_read).length > 0 && (
          <button
            onClick={handleUpdateNotification}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-150 px-2.5 py-1.5 rounded-md hover:bg-muted"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all read
          </button>
        )}
      </div>

      {/* Groups */}
      <div className="flex flex-col gap-6">
        <section >
          <div className="flex flex-col divide-y divide-border rounded-xl border border-border overflow-hidden">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 px-4 py-3.5 bg-card"
                >
                  {/* Unread indicator skeleton */}
                  <div className="mt-1.5 shrink-0 w-4 flex justify-center">
                    <div className="w-2 h-2 rounded-full bg-muted animate-pulse" />
                  </div>

                  {/* Message skeleton */}
                  <div className="flex-1 space-y-2 py-0.5">
                    <div className="h-3.5 bg-muted rounded animate-pulse w-3/4" />
                    <div className="h-3.5 bg-muted rounded animate-pulse w-1/2 opacity-60" />
                  </div>

                  {/* Time skeleton */}
                  <div className="shrink-0 mt-0.5">
                    <div className="w-10 h-3 bg-muted rounded animate-pulse" />
                  </div>
                </div>
              ))
            ) : (
              notification.map((n) => (
                <div
                  key={n.id}
                  onClick={() => !n.is_read && handleUpdateNotificationByIdValidation(n.id)
                  }
                  className={cn(
                    "flex items-start gap-3 px-4 py-3.5 cursor-pointer transition-colors duration-150",
                    n.is_read
                      ? "bg-card hover:bg-muted/40"
                      : "bg-muted/20 hover:bg-muted/40"
                  )}
                >
                  {/* Unread indicator */}
                  <div className="mt-1.5 shrink-0 w-4 flex justify-center">
                    {!n.is_read ? (
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
                      n.is_read
                        ? "text-muted-foreground"
                        : "text-foreground font-medium"
                    )}
                  >
                    {n.message}
                  </p>

                  {/* Time */}
                  <span className="shrink-0 text-[11px] text-muted-foreground/60 mt-0.5 tabular-nums">
                    {formatDistance((new Date(), n.created_at), new Date(), { addSuffix: true })}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

        {!isLoading && notification.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
            <Bell className="w-8 h-8 opacity-20" />
            <p className="text-sm">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
