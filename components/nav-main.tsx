"use client"

import { UseAuthStore } from "@/app/state/use-auth-store"
import { UseUserStore } from "@/app/state/use-user-store"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { supabase } from "@/lib/supbase/cient"
import { cn } from "@/lib/utils"
import { ChevronRightIcon } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const { notification, handleGetNotification } = UseUserStore()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { handleGetSession, auth} = UseAuthStore()

  useEffect(() => {
    handleGetSession()
  }, [handleGetSession])

  useEffect(() => {
    audioRef.current = new Audio("/sound/notification-sound.mp3")
  }, [])

  useEffect(() => {
    handleGetNotification(true)
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel('user:isread')
      .on('postgres_changes', {
        event: "*",
        schema: "public",
        table: "notification"
      },
        async (payload: any) => {
          handleGetNotification(false)
          if (payload.new.user_id === auth?.id) {
            audioRef.current?.play()
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <Link href={item.url} >
                  <SidebarMenuButton tooltip={item.title}>
                    <span className="relative">
                      {item.icon}
                      {notification.filter((n) => !n.is_read).length > 0 &&
                        <div className={cn("absolute -top-1 -right-1 bg-red-400 p-1 rounded-full border border-white dark:border-zinc-900", item.url !== "/notification" && "hidden")}></div>
                      }
                    </span>
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
