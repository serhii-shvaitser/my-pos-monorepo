import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/shared/ui/sidebar";

import { Pizza } from "lucide-react";

export function AppSidebarHeader() {
  return (
    <SidebarHeader className="flex flex-row">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="data-[slot=sidebar-menu-button]:p-1.5!"
          >
            <a href="#">
              <Pizza className="size-5!" />
              <span className="text-base font-semibold">MyKeeper</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
