
import * as React from "react"
import Link from "next/link"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  AudioLinesIcon,
  Bell,
  ChartNoAxesGantt,
  FrameIcon,
  MapIcon,
  MessageCircle,
  PieChartIcon,
  Puzzle,
  Sparkles,
  TerminalIcon,
} from "lucide-react"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"



export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  const data = {
    user: {
      name: session?.user?.name as string,
      email: session?.user?.email as string,
      avatar: session?.user?.image as string,
    },
    teams: [
      {
        name: "Kommit",
        logo: (
          <Sparkles />
        ),
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: (
          <AudioLinesIcon
          />
        ),
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: (
          <TerminalIcon
          />
        ),
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Timeline",
        url: "/timeline",
        icon: (
          <ChartNoAxesGantt
          />
        ),
      },
      {
        title: "Team",
        url: "/team",
        icon: (
          <Puzzle
          />
        ),
      },
      {
        title: "Chat",
        url: "/chat",
        icon: (
          <MessageCircle
          />
        ),
      },
      {
        title: "Notification",
        url: "/notification",
        icon: (
          <Bell
          />
        ),
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: (
          <FrameIcon
          />
        ),
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: (
          <PieChartIcon
          />
        ),
      },
      {
        name: "Travel",
        url: "#",
        icon: (
          <MapIcon
          />
        ),
      },
    ],
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
