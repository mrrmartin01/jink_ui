"use client";

import * as React from "react";
import {
  BellDot,
  Bookmark,
  Home,
  LifeBuoy,
  MessagesSquare,
  Search,
  SendHorizontal,
  Settings2,
  User,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import ThemeToggle from "@/context/theme/theme-toggle";
import { IconMathTg } from "@tabler/icons-react";
import { useGetUser } from "@/hooks/users";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Explore",
      url: "/explore",
      icon: Search,
    },
    {
      title: "Messages",
      url: "/messages",
      icon: MessagesSquare,
    },
    {
      title: "Notifications",
      url: "/notifications",
      icon: BellDot,
    },
    {
      title: "Bookmarks",
      url: "/bookmarks",
      icon: Bookmark,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: SendHorizontal,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isLoading } = useGetUser();

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:bg-transparent"
            >
              <a href="#">
                <div className="relative flex aspect-square size-8 items-center justify-center rounded-lg bg-sky-900 text-sidebar-primary-foreground dark:bg-green-600">
                  <IconMathTg className="z-50 size-8" />
                  <div className="absolute inset-0 w-[70%] rounded-full bg-green-600 dark:bg-sky-900" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="text-md truncate font-mono font-semibold">
                    Thing
                  </span>
                  {isLoading ? (
                    <div className="h-5 w-1/2 animate-pulse rounded-xl bg-sidebar-accent duration-1000" />
                  ) : (
                    <span className="truncate font-thin text-gray-500">
                      {isLoading ? (
                        <span className="inline-block h-5 w-1/2 animate-pulse rounded-xl bg-sidebar-accent duration-1000" />
                      ) : (
                        <>@{user?.userName}</>
                      )}
                    </span>
                  )}
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
        <NavUser user={user ?? null} loading={isLoading} />
      </SidebarFooter>
    </Sidebar>
  );
}
