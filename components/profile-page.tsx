"use client";

import { useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useInitials } from "@/hooks/use-initials";
import {
  CalendarClock,
  CheckCircle2,
  Clock3,
  FolderKanban,
  Layers3,
  ListTodo,
  Video,
  Users,
  AlarmClockCheck,
} from "lucide-react";
import { UseAuthStore } from "@/app/state/use-auth-store";
import { format } from "date-fns";
import { UseGroupStore } from "@/app/state/use-group-store";

type TabKey = "tasks" | "groups" | "meetings";

export default function ProfilePage() {
  const [tab, setTab] = useState<TabKey>("tasks");
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

  const groups = useMemo(
    () => [
      {
        id: "g1",
        name: "Kommit Core",
        role: "admin",
        members: 8,
        updated: "2h ago",
      },
      {
        id: "g2",
        name: "UI/UX",
        role: "member",
        members: 5,
        updated: "yesterday",
      },
      {
        id: "g3",
        name: "Meetings",
        role: "owner",
        members: 4,
        updated: "3d ago",
      },
    ],
    []
  );

  const meetings = useMemo(
    () => [
      {
        id: "m1",
        title: "Sprint planning",
        group: "Kommit Core",
        when: "Thu · 10:00 AM",
        duration: "45m",
        status: "Upcoming",
        statusTone: "secondary" as const,
      },
      {
        id: "m2",
        title: "Design review",
        group: "UI/UX",
        when: "Fri · 2:00 PM",
        duration: "30m",
        status: "Upcoming",
        statusTone: "outline" as const,
      },
      {
        id: "m3",
        title: "Retro",
        group: "Meetings",
        when: "Mon · 4:30 PM",
        duration: "60m",
        status: "Notes posted",
        statusTone: "default" as const,
      },
    ],
    []
  );

  return (
    <main className="mx-auto w-full max-w-5xl">
      <header className="rounded-3xl border border-border/60 bg-card/40 p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <Avatar size="lg" className="mt-0.5">
              {auth?.image ? (
                <AvatarImage src={auth?.image} alt={auth?.name} />
              ) : (
                <AvatarFallback>{getInitials(auth?.name)}</AvatarFallback>
              )}
            </Avatar>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-xl font-semibold tracking-tight">
                  {auth?.name}
                </h1>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {auth?.email}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-border/60 bg-background/40 px-3 py-2 text-sm">
                  <FolderKanban className="size-4 text-primary" />
                  <span className="font-medium">{groupCount}</span>
                  <span className="text-muted-foreground">groups</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-2xl border border-border/60 bg-background/40 px-3 py-2 text-sm">
                  <Layers3 className="size-4 text-primary" />
                  <span className="font-medium">{taskCount}</span>
                  <span className="text-muted-foreground">open tasks</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-2xl border border-border/60 bg-background/40 px-3 py-2 text-sm">
                  <CheckCircle2 className="size-4 text-primary" />
                  <span className="font-medium">
                    {task.filter((t) => t.status !== "pending").length}
                  </span>
                  <span className="text-muted-foreground">done this week</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Edit profile
            </Button>
          </div>
        </div>
      </header>

      <div className="mt-5 rounded-3xl border border-border/60 bg-card/40 p-2 shadow-sm">
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            variant={tab === "tasks" ? "secondary" : "ghost"}
            onClick={() => setTab("tasks")}
            className="flex-1 justify-center"
          >
            <ListTodo className="size-4" />
            Tasks
            <Badge
              variant={tab === "tasks" ? "default" : "outline"}
              className="ml-1"
            >
              {task.length}
            </Badge>
          </Button>

          <Button
            type="button"
            size="sm"
            variant={tab === "groups" ? "secondary" : "ghost"}
            onClick={() => setTab("groups")}
            className="flex-1 justify-center"
          >
            <Users className="size-4" />
            Groups
            <Badge
              variant={tab === "groups" ? "default" : "outline"}
              className="ml-1"
            >
              {groups.length}
            </Badge>
          </Button>

          <Button
            type="button"
            size="sm"
            variant={tab === "meetings" ? "secondary" : "ghost"}
            onClick={() => setTab("meetings")}
            className="flex-1 justify-center"
          >
            <Video className="size-4" />
            Meetings
            <Badge
              variant={tab === "meetings" ? "default" : "outline"}
              className="ml-1"
            >
              {meetings.length}
            </Badge>
          </Button>
        </div>
      </div>

      <section className="mt-4 rounded-3xl border border-border/60 bg-card/40 p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold tracking-tight">
              {tab === "tasks"
                ? "Your tasks"
                : tab === "groups"
                  ? "Your groups"
                  : "Your meetings"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {tab === "tasks"
                ? "A quick snapshot of what you’re working on."
                : tab === "groups"
                  ? "Team you’re currently part of."
                  : "Upcoming meetings and recent notes."}
            </p>
          </div>
          <Button variant="outline" size="sm">
            {tab === "tasks" ? "View all" : tab === "groups" ? "Manage" : "Open"}
          </Button>
        </div>

        <Separator className="my-5" />

        {tab === "tasks" ? (
          <div className="grid gap-3">
            {task.map((t) => {
              return (
                <div
                  key={t.id}
                  className="rounded-2xl border border-border/60 bg-background/40 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="inline-flex size-9 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-border">
                        <AlarmClockCheck className="size-4 text-primary" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {t.description}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {t.group.group_name}
                        </p>
                      </div>
                    </div>
                    <Badge className="capitalize">{t.status}</Badge>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/20 px-2 py-0.5">
                      <CalendarClock className="size-3.5" />
                      Due {format(t.deadline, "MMM d, yyyy")}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/20 px-2 py-0.5">
                      <FolderKanban className="size-3.5" />
                      {t.group.group_name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : tab === "groups" ? (
          <div className="grid gap-3 md:grid-cols-2">
            {team.map((g) => (
              <div
                key={g.id}
                className="rounded-2xl border border-border/60 bg-background/40 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{g.group.group_name}</p>
                    </div>
                    {(() => {
                      const d = g.created_at ? new Date(g.created_at) : null;
                      const memberSince =
                        d && !Number.isNaN(d.getTime()) ? format(d, "MMM d, yyyy") : null;

                      if (!memberSince) return null;

                      return (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/20 px-2 py-0.5 text-xs text-muted-foreground">
                          <CalendarClock className="size-3.5" />
                          Member since {memberSince}
                        </span>
                      );
                    })()}
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {g.role ?? "Member"}
                  </Badge>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/20 px-2 py-0.5">
                    <Users className="size-3.5" />
                    {memberCount.filter((m) => m.group_id === g.group.id).length} {memberCount.filter((m) => m.group_id === g.group.id).length > 1 ? "members" : "member"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/20 px-2 py-0.5">
                    <FolderKanban className="size-3.5" />
                    Team
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-3">
            {meetings.map((m) => (
              <div
                key={m.id}
                className="rounded-2xl border border-border/60 bg-background/40 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="inline-flex size-9 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-border">
                      <Video className="size-4 text-primary" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{m.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {m.group}
                      </p>
                    </div>
                  </div>
                  <Badge variant={m.statusTone}>{m.status}</Badge>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/20 px-2 py-0.5">
                    <CalendarClock className="size-3.5" />
                    {m.when}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/20 px-2 py-0.5">
                    <Clock3 className="size-3.5" />
                    {m.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/20 px-2 py-0.5">
                    <FolderKanban className="size-3.5" />
                    {m.group}
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

