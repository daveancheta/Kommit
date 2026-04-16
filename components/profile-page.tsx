"use client";

import { useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useInitials } from "@/hooks/use-initials";
import {
  CalendarClock,
  FolderKanban,
  ListTodo,
  Users,
  AlarmClockCheck,
  MessageSquare,
  MoreVertical,
  Share,
  Sparkles,
  FileText,
  Pencil,
} from "lucide-react";
import { UseAuthStore } from "@/app/state/use-auth-store";
import { format } from "date-fns";
import { UseGroupStore } from "@/app/state/use-group-store";

type TabKey = "posts" | "tasks" | "groups" | "meetings";

export default function ProfilePage() {
  const [tab, setTab] = useState<TabKey>("posts");
  const getInitials = useInitials();
  const { handleGetSession, auth, handleGetAuthProfile, task, taskCount, groupCount } = UseAuthStore()
  const { team, handleGetGroups, isLoading, handleGetTeamMembersCount, memberCount } = UseGroupStore()

  useEffect(() => {
    handleGetTeamMembersCount()
  }, [handleGetTeamMembersCount])

  useEffect(() => {
    handleGetGroups(true)
  }, [])

  useEffect(() => {
    handleGetAuthProfile()
  }, [handleGetAuthProfile])

  useEffect(() => {
    handleGetSession()
  }, [handleGetSession])

  return (
    <main className="mx-auto w-full max-w-5xl">
      <header className="rounded-xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
        <div className="h-44 sm:h-56 w-full relative">
          <img 
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop" 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          <button className="absolute top-3 right-3 z-20 h-8 w-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-colors">
            <Pencil className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-zinc-900 dark:bg-zinc-950 relative px-5 pb-5 pt-0">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <div className="-mt-[52px] shrink-0">
                <Avatar className="h-[104px] w-[104px] ring-4 ring-zinc-900 dark:ring-zinc-950 shadow-xl rounded-full">
                  {auth?.image ? (
                    <AvatarImage src={auth?.image} alt={auth?.name} className="rounded-full" />
                  ) : (
                    <AvatarFallback className="text-2xl rounded-full bg-zinc-700 text-white">{getInitials(auth?.name)}</AvatarFallback>
                  )}
                </Avatar>
              </div>

              <div className="pb-1 mt-2 sm:mt-0">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                  {auth?.name}
                </h1>
                <p className="text-sm text-zinc-400 mt-0.5">
                  {auth?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pb-1 self-end">
              <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white font-medium">
                Edit profile
              </Button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-6 sm:gap-10 border-t border-zinc-700/60 pt-4">
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white">{groupCount}</span>
              <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mt-0.5">Teams</span>
            </div>
            <div className="h-8 w-px bg-zinc-700" />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white">{taskCount}</span>
              <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mt-0.5">Open Tasks</span>
            </div>
            <div className="h-8 w-px bg-zinc-700 hidden sm:block" />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white">
                {task.filter((t) => t.status !== "pending").length}
              </span>
              <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mt-0.5">Completed</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mt-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1.5 shadow-sm">
        <div className="flex gap-1 text-sm overflow-hidden">
          <Button
            type="button"
            size="sm"
            variant={tab === "posts" ? "secondary" : "ghost"}
            onClick={() => setTab("posts")}
            className={`flex-1 min-w-[100px] justify-center ${tab === "posts" ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"}`}
          >
            <FileText className="size-4 mr-2" />
            Posts
          </Button>

          <Button
            type="button"
            size="sm"
            variant={tab === "tasks" ? "secondary" : "ghost"}
            onClick={() => setTab("tasks")}
            className={`flex-1 justify-center ${tab === "tasks" ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"}`}
          >
            <ListTodo className="size-4 mr-2" />
            Tasks
            <Badge
              variant={tab === "tasks" ? "default" : "outline"}
              className={`ml-2 px-1.5 h-5 min-w-5 flex items-center justify-center ${tab === "tasks" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800" : "border-zinc-200 dark:border-zinc-800 text-zinc-500"}`}
            >
              {task.length}
            </Badge>
          </Button>

          <Button
            type="button"
            size="sm"
            variant={tab === "groups" ? "secondary" : "ghost"}
            onClick={() => setTab("groups")}
            className={`flex-1 justify-center ${tab === "groups" ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"}`}
          >
            <Users className="size-4 mr-2" />
            Teams
            <Badge
              variant={tab === "groups" ? "default" : "outline"}
              className={`ml-2 px-1.5 h-5 min-w-5 flex items-center justify-center ${tab === "groups" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800" : "border-zinc-200 dark:border-zinc-800 text-zinc-500"}`}
            >
              {team.length}
            </Badge>
          </Button>
        </div>
      </div>

      <section className="mt-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {tab === "posts"
                ? "Your posts"
                : tab === "tasks"
                ? "Your tasks"
                : tab === "groups"
                  ? "Your groups"
                  : "Your meetings"}
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {tab === "posts"
                ? "Recent updates and snippets you've shared."
                : tab === "tasks"
                ? "A quick snapshot of what you’re working on."
                : tab === "groups"
                  ? "Team you’re currently part of."
                  : "Upcoming meetings and recent notes."}
            </p>
          </div>
          <Button variant="outline" size="sm" className="border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            {tab === "posts" ? "Create post" : tab === "tasks" ? "View all" : tab === "groups" ? "Manage" : "Open"}
          </Button>
        </div>

        <Separator className="my-5 bg-zinc-200 dark:bg-zinc-800" />

        {tab === "posts" ? (
          <div className="grid gap-4">
            <div className="bg-white dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{auth?.name || "Loading..."}</span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">• 2 hours ago</span>
                  </div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">Software Engineer</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-700 bg-transparent rounded-full -mt-2 -mr-2">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex gap-2 mb-3">
                <span className="text-[10px] font-medium uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 px-2.5 py-1 rounded-full">
                  update
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 px-2.5 py-1 rounded-full">
                  progress
                </span>
              </div>

              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 whitespace-pre-wrap">
                Just completed the new profile layout sections. Really liking how the UI is coming together! Here's a sneak peek... 🚀
              </p>

              <div className="mb-4 overflow-hidden rounded-xl border border-zinc-100 dark:border-zinc-800/80">
                <img 
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" 
                  alt="attachment" 
                  className="w-full h-auto max-h-[350px] object-cover hover:scale-[1.01] transition-transform duration-500"
                />
              </div>

              <div className="flex items-center gap-4 pt-3 mt-1 border-t border-zinc-100 dark:border-zinc-800/60">
                <button className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium transition-colors">
                  <div className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-sm">12</span>
                </button>
                <button className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium transition-colors">
                  <div className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="text-sm">4</span>
                </button>
                <button className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors ml-auto">
                  <div className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <Share className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        ) : tab === "tasks" ? (
          <div className="grid gap-3">
            {task.map((t) => {
              return (
                <div
                  key={t.id}
                  className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="inline-flex size-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-100 dark:ring-blue-800">
                        <AlarmClockCheck className="size-4 text-blue-500" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {t.description}
                        </p>
                        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                          {t.group.group_name}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-950">{t.status}</Badge>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-2 py-0.5">
                      <CalendarClock className="size-3.5" />
                      Due {format(t.deadline, "MMM d, yyyy")}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-2 py-0.5">
                      <FolderKanban className="size-3.5" />
                      {t.group.group_name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {team.map((g) => (
              <div
                key={g.id}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">{g.group.group_name}</p>
                    </div>
                    {(() => {
                      const d = g.created_at ? new Date(g.created_at) : null;
                      const memberSince =
                        d && !Number.isNaN(d.getTime()) ? format(d, "MMM d, yyyy") : null;

                      if (!memberSince) return null;

                      return (
                        <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-2 py-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                          <CalendarClock className="size-3.5" />
                          Member since {memberSince}
                        </span>
                      );
                    })()}
                  </div>
                  <Badge variant="outline" className="capitalize border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-950">
                    {g.role ?? "Member"}
                  </Badge>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-2 py-0.5">
                    <Users className="size-3.5" />
                    {memberCount.filter((m) => m.group_id === g.group.id).length} {memberCount.filter((m) => m.group_id === g.group.id).length > 1 ? "members" : "member"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-2 py-0.5">
                    <FolderKanban className="size-3.5" />
                    Team
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

