"use client"

import Sidebar from '@/components/sidebar-provider'
import React, { useEffect } from 'react'
import { supabase } from '@/lib/supbase/cient'
import { UseGroupStore } from '@/app/state/use-group-store'
import { Plus, Users, CheckSquare, MoreVertical } from 'lucide-react'
import CreateGroup from './create-group-fr-task'
import { TaskList } from './task-list'
import { MemberList } from './member-list'
import { UseChatStore } from '@/app/state/use-chat-store'

function TeamTask() {
    const { handleGetGroups, team, isLoading, handleGetTeamMembers, members, isFetching } = UseGroupStore()
    const { selectedTeam, setSelectedTeam } = UseChatStore()

    useEffect(() => {
        handleGetTeamMembers(selectedTeam as string)
    }, [handleGetTeamMembers, selectedTeam])

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
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">Your Teams</h1>
                    <p className="text-muted-foreground/80 text-base md:text-lg font-medium">Manage your groups, members, and upcoming tasks easily.</p>
                </div>
                <div className="shrink-0">
                    <CreateGroup />
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="p-6 border border-border/40 rounded-2xl bg-card/50 flex flex-col gap-5 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div className="h-14 w-14 rounded-2xl bg-muted animate-pulse shrink-0"></div>
                            </div>
                            <div>
                                <div className="h-6 w-3/4 bg-muted animate-pulse rounded mb-4"></div>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 flex-1 bg-muted animate-pulse rounded-xl"></div>
                                    <div className="h-10 flex-1 bg-muted animate-pulse rounded-xl"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {team?.map((t: any) => (
                        <div key={t.id} className="group relative overflow-hidden p-6 rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 flex flex-col gap-5 cursor-pointer">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
                            
                            <div className="flex items-start justify-between relative z-10">
                                <div className="h-14 w-14 rounded-2xl bg-muted/50 flex items-center justify-center font-bold text-xl overflow-hidden shrink-0 ring-2 ring-border/50 group-hover:ring-primary/30 transition-all shadow-sm">
                                    {t.group?.photo ? (
                                        <img src={t.group.photo} alt={t.group.group_name} className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="text-primary/70">
                                            {t.group?.group_name?.substring(0, 2).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="relative z-10">
                                <h2 className="font-bold text-xl tracking-tight text-foreground/90 group-hover:text-primary transition-colors truncate">{t.group?.group_name}</h2>

                                <div className="flex items-center gap-3 mt-4">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedTeam(t.group.id);
                                        }}
                                         className='w-full cursor-pointer'
                                    >
                                        <MemberList members={members} isFetching={isFetching} />
                                    </button>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedTeam(t.group.id);
                                        }}
                                        className='w-full cursor-pointer'
                                    >
                                        <TaskList />
                                    </button>
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