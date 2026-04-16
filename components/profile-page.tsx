"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  ChevronDown,
  Circle,
  Loader,
  CheckCircle2,
  Link2,
  Flag,
  Edit2,
  Trash2,
} from "lucide-react";
import { UseAuthStore } from "@/app/state/use-auth-store";
import { format, formatDistance } from "date-fns";
import { UseGroupStore } from "@/app/state/use-group-store";
import { UseTaskStore } from "@/app/state/use-task-store";
import { UsePostStore } from "@/app/state/use-post-store";
import { supabase } from "@/lib/supbase/cient";
import { cn } from "@/lib/utils";

type TabKey = "posts" | "tasks" | "groups" | "meetings";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending", icon: Circle, color: "text-zinc-400" },
  { value: "in-progress", label: "In Progress", icon: Loader, color: "text-blue-500" },
  { value: "done", label: "Done", icon: CheckCircle2, color: "text-emerald-500" },
] as const;

type StatusValue = typeof STATUS_OPTIONS[number]["value"];

export default function ProfilePage() {
  const [tab, setTab] = useState<TabKey>("posts");
  const [taskStatuses, setTaskStatuses] = useState<Record<string, StatusValue>>({});
  const getInitials = useInitials();
  const { handleGetSession, auth, handleGetAuthProfile, task, taskCount, groupCount } = UseAuthStore()
  const { team, handleGetGroups, isLoading, handleGetTeamMembersCount, memberCount } = UseGroupStore()
  const { handleUpdateTaskStatus, isSubmitting } = UseTaskStore()
  const { handleGetPostByUser, posts, handleDeletePost } = UsePostStore()

  useEffect(() => {
    handleGetPostByUser(true)
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel('user:post')
      .on('postgres_changes',
        {
          event: "*",
          schema: "public",
          table: "post"
        },
        async (payload) => {
          handleGetPostByUser(false)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const getStatus = (id: string, fallback: string): StatusValue => {
    if (taskStatuses[id]) return taskStatuses[id];
    const match = STATUS_OPTIONS.find((s) => s.value === fallback);
    return match ? match.value : "pending";
  };

  const setStatus = (id: string, status: StatusValue) => {
    setTaskStatuses((prev) => ({ ...prev, [id]: status }));
  };

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
              <div className="-mt-13 shrink-0">
                <Avatar className="h-26 w-26 ring-4 ring-zinc-900 dark:ring-zinc-950 shadow-xl rounded-full">
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
                {auth?.bio &&
                  <p className="text-sm font-medium text-zinc-200 mt-2.5">
                    {auth?.bio}
                  </p>
                }
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
            className={`flex-1 min-w-25 justify-center ${tab === "posts" ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"}`}
          >
            <FileText className="size-4 mr-2" />
            Posts
            <Badge
              variant={tab === "posts" ? "default" : "outline"}
              className={`ml-2 px-1.5 h-5 min-w-5 flex items-center justify-center ${tab === "posts" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800" : "border-zinc-200 dark:border-zinc-800 text-zinc-500"}`}
            >
              {posts.length}
            </Badge>
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
          <div className={cn("grid", posts.length > 1 && "grid-cols-2 gap-4 items-start")}>
            {posts.map((p) =>
              <div key={p.id} className="bg-white dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">{auth?.name || "Loading..."}</span>
                      <span className="text-xs text-zinc-400 dark:text-zinc-500">•
                        {formatDistance(new Date(p.created_at), new Date(), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">Software Engineer</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 bg-transparent rounded-full -mt-2 -mr-2 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-1"
                    >
                      <DropdownMenuLabel className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-2 pb-1">
                        Post Actions
                      </DropdownMenuLabel>
                      <DropdownMenuItem className="flex items-center gap-2.5 px-2 py-2 text-sm text-zinc-700 dark:text-zinc-300 rounded-lg cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800">
                        <Edit2 className="w-3.5 h-3.5 text-zinc-500" />
                        Edit post
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2.5 px-2 py-2 text-sm text-zinc-700 dark:text-zinc-300 rounded-lg cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800">
                        <Link2 className="w-3.5 h-3.5 text-zinc-500" />
                        Copy link
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2.5 px-2 py-2 text-sm text-zinc-700 dark:text-zinc-300 rounded-lg cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800">
                        <Flag className="w-3.5 h-3.5 text-zinc-500" />
                        Report
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="my-1 border-zinc-100 dark:border-zinc-800" />
                      {auth?.id === p.user_id &&
                        <DropdownMenuItem className="flex items-center gap-2.5 px-2 py-2 text-sm text-red-500 rounded-lg cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/30 focus:bg-red-50 dark:focus:bg-red-950/30 focus:text-red-500"
                          onClick={() => handleDeletePost(p.id)}>
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete post
                        </DropdownMenuItem>
                      }
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 whitespace-pre-wrap">
                  {p.content}
                </p>

                {p.image &&
                  <div className="mb-4 overflow-hidden rounded-xl border border-zinc-100 dark:border-zinc-800/80">
                    <img
                      src={p.image}
                      alt="attachment"
                      className="w-full h-auto max-h-87.5 object-cover hover:scale-[1.01] transition-transform duration-500"
                    />
                  </div>
                }
              </div>
            )}
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        {(() => {
                          const current = STATUS_OPTIONS.find((s) => s.value === getStatus(t.id, t.status))!;
                          const Icon = current.icon;
                          return (
                            <button className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm">
                              <Icon className={`size-3 ${current.color}`} />
                              <span className="capitalize">{current.label}</span>
                              <ChevronDown className="size-3 text-zinc-400" />
                            </button>
                          );
                        })()}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        {STATUS_OPTIONS.map(({ value, label, icon: Icon, color }) => (
                          <DropdownMenuItem
                            key={value}
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => {
                              setStatus(t.id, value)
                              handleUpdateTaskStatus(t.id, value)
                            }}
                          >
                            <Icon className={`size-3.5 ${color}`} />
                            <span>{label}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
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

