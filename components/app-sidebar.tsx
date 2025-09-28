"use client";

import * as React from "react";
import {
  BellDot,
  Bookmark,
  Command,
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
import { useAppSelector } from "@/api/reduxHook";
import ThemeToggle from "@/context/theme/theme-toggle";

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
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Jink</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
        <ThemeToggle/>
      </SidebarContent>
      <SidebarFooter>
        {isAuthenticated && user ? <NavUser user={user} /> : <span>Login</span>}
      </SidebarFooter>
    </Sidebar>
  );
}
