'use client'

import { UseUserStore } from '@/app/state/use-user-store';
import { supabase } from '@/lib/supbase/cient';
import { formatDistance } from 'date-fns';
import { Bell, ChevronRight } from 'lucide-react'
import Link from 'next/link';
import React, { useEffect } from 'react'
import NotificationSkeleton from './notification-skeleton';

function Notification() {
    const {
        handleGetNotification,
        notification,
        isLoading,
        handleUpdateNotificationValidation,
        handleUpdateNotificationByIdValidation,
    } = UseUserStore();

    useEffect(() => {
        handleGetNotification(true)
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
                    handleGetNotification(false)
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    return (
        <>
            {isLoading
                ? <NotificationSkeleton />
                : <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-base font-semibold">Notifications</h2>
                        <Bell className="w-4 h-4 text-zinc-500 cursor-pointer" />
                    </div>

                    <div className="flex flex-col gap-4">
                        {notification.map((n) => (
                            <div key={n.id} className="flex gap-3 group cursor-pointer items-start">
                                <div className="mt-1 flex w-2 shrink-0 justify-center">
                                    {!n.is_read ? (
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    ) : (
                                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                                    )}
                                </div>
                                <div>
                                    <h3 className={`text-sm leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 ${n.is_read ? "text-zinc-500 dark:text-zinc-400 font-medium" : "text-zinc-800 dark:text-zinc-200 font-semibold"}`}>
                                        {n.message}
                                    </h3>
                                    <p className="text-xs text-zinc-500 mt-1">
                                        {formatDistance(new Date(n.created_at), new Date(), {
                                            addSuffix: true,
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link href="/notification" className="mt-4 pt-2 group cursor-pointer inline-flex items-center gap-1">
                        <span className="text-sm font-semibold text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-300">View all</span>
                        <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-300" />
                    </Link>
                </div>}
        </>
    )
}

export default Notification