"use client"

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
import { useEffect } from "react"

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
  const { notification, handleGetNotifcation } = UseUserStore()

  useEffect(() => {
    handleGetNotifcation(true)
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel('user:isread')
      .on('postgres_changes', {
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
                <Link href={item.url} className="relative">
                  <SidebarMenuButton tooltip={item.title} className="w-full h-full">
                    <span>{item.icon}</span>
                    {notification.filter((n) => !n.is_read).length > 0 &&
                      <div className={cn("absolute top-0 right-0 bg-red-400 p-1 rounded-full", item.url !== "/notification" && "hidden")}></div>
                    }
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
