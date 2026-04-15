"use client"

import { useEffect } from 'react'
import { supabase } from '@/lib/supbase/cient'
import { UseGroupStore } from '@/app/state/use-group-store'
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

    const hasTeams = (team?.length ?? 0) > 0
    return (
        <div className="p-5 sm:p-6 md:p-10 max-w-[1600px] mx-auto w-full">
            <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/40 backdrop-blur-sm p-6 sm:p-8 md:p-10 mb-8 md:mb-10">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
                </div>

                <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
                            Your Teams
                        </h1>
                        <p className="text-muted-foreground/80 text-base md:text-lg font-medium max-w-[70ch]">
                            Manage your groups, members, and upcoming tasks in one place.
                        </p>
                    </div>
                    <div className="shrink-0">
                        <CreateGroup />
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="p-6 border border-border/50 rounded-3xl bg-card/40 backdrop-blur-sm flex flex-col gap-5 shadow-sm"
                            aria-hidden="true"
                        >
                            <div className="flex items-start justify-between">
                                <div className="h-14 w-14 rounded-2xl bg-muted/70 animate-pulse shrink-0" />
                                <div className="h-8 w-8 rounded-xl bg-muted/70 animate-pulse" />
                            </div>
                            <div className="space-y-4">
                                <div className="h-6 w-3/4 bg-muted/70 animate-pulse rounded-lg" />
                                <div className="flex items-center gap-3">
                                    <div className="h-11 flex-1 bg-muted/70 animate-pulse rounded-2xl" />
                                    <div className="h-11 flex-1 bg-muted/70 animate-pulse rounded-2xl" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-6">
                    {!hasTeams ? (
                        <div className="rounded-3xl border border-dashed border-border/60 bg-card/30 p-10 md:p-14 text-center">
                            <div className="mx-auto h-14 w-14 rounded-2xl bg-primary/10 ring-1 ring-border/60" />
                            <h2 className="mt-5 text-xl md:text-2xl font-bold tracking-tight">No teams yet</h2>
                            <p className="mt-2 text-muted-foreground max-w-[65ch] mx-auto">
                                Create your first team to start adding members and tracking tasks.
                            </p>
                            <div className="mt-6 flex items-center justify-center">
                                <CreateGroup />
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                            {team?.map((t: any) => {
                                const isSelected = selectedTeam === t.group?.id
                                const groupName: string = t.group?.group_name ?? "Untitled"
                                const initials = groupName.substring(0, 2).toUpperCase()

                                return (
                                    <button
                                        key={t.id}
                                        type="button"
                                        onClick={() => setSelectedTeam(t.group.id)}
                                        className={[
                                            "group text-left relative overflow-hidden p-6 rounded-3xl border bg-card/40 backdrop-blur-sm",
                                            "transition-all duration-300",
                                            "hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                                            isSelected ? "border-primary/40 ring-1 ring-primary/20" : "border-border/50"
                                        ].join(" ")}
                                        aria-pressed={isSelected}
                                    >
                                        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -mr-14 -mt-14 transition-transform group-hover:scale-125 duration-500" />
                                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl -ml-14 -mb-14 transition-transform group-hover:scale-125 duration-500" />

                                        <div className="flex items-start justify-between relative z-10 gap-4">
                                            <div className="h-14 w-14 rounded-2xl bg-muted/40 flex items-center justify-center font-extrabold text-xl overflow-hidden shrink-0 ring-1 ring-border/60 group-hover:ring-primary/30 transition-all shadow-sm">
                                                {t.group?.photo ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img
                                                        src={t.group.photo}
                                                        alt={groupName}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-primary/70">{initials}</span>
                                                )}
                                            </div>

                                            {isSelected ? (
                                                <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold ring-1 ring-primary/20">
                                                    Selected
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center rounded-full bg-muted/40 text-muted-foreground px-3 py-1 text-xs font-semibold ring-1 ring-border/60 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    Open
                                                </span>
                                            )}
                                        </div>

                                        <div className="relative z-10 mt-5">
                                            <h2 className="font-bold text-xl tracking-tight text-foreground/90 group-hover:text-primary transition-colors truncate">
                                                {groupName}
                                            </h2>

                                            <div className="flex items-center gap-3 mt-4">
                                                <div className="w-full rounded-2xl border border-border/60 bg-background/40 hover:bg-background/60 transition-colors">
                                                    <MemberList members={members} isFetching={isFetching} />
                                                </div>
                                                <div className="w-full rounded-2xl border border-border/60 bg-background/40 hover:bg-background/60 transition-colors">
                                                    <TaskList />
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default TeamTask