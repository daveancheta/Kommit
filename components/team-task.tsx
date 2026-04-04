"use client"

import Sidebar from '@/components/sidebar-provider'
import React, { useEffect } from 'react'
import { supabase } from '@/lib/supbase/cient'
import { UseGroupStore } from '@/app/state/use-group-store'
import { Plus, Users, CheckSquare, MoreVertical } from 'lucide-react'
import CreateGroup from './create-group-fr-task'
import { TaskList } from './task-list'

function TeamTask() {
    const { handleGetGroups, team, isLoading } = UseGroupStore()

    useEffect(() => {
        handleGetGroups(true)
    }, [])

    useEffect(() => {
        const channel = supabase
            .channel('team:teams')
            .on('postgres_changes', {
                event: "*",
                schema: "public",
                table: "group"
            },
                async (payload) => {
                    await handleGetGroups(false)
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])
    return (
        <div className="p-6 md:p-10 max-w-[1600px] mx-auto w-full">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Your Teams</h1>
                    <p className="text-muted-foreground mt-2">Manage your groups, members, and upcoming tasks.</p>
                </div>
                <CreateGroup />
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="animate-pulse rounded-xl bg-muted/50 border border-border/50 h-[160px]"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {team?.map((t: any) => (
                        <div key={t.id} className="group p-5 border border-border/50 rounded-xl bg-card hover:bg-muted/30 transition-colors flex flex-col gap-4 cursor-pointer">
                            <div className="flex items-start justify-between">
                                <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center font-medium text-lg overflow-hidden shrink-0">
                                    {t.group?.photo ? (
                                        <img src={t.group.photo} alt={t.group.group_name} className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="text-muted-foreground">
                                            {t.group?.group_name?.substring(0, 2).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h2 className="font-semibold text-lg truncate">{t.group?.group_name}</h2>

                                <div className="flex items-center gap-4 text-sm mt-3 text-muted-foreground">
                                    <div className="flex items-center gap-1.5">
                                        <Users className="h-3.5 w-3.5" />
                                        <span>4</span>
                                    </div>
                                        <TaskList />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TeamTask