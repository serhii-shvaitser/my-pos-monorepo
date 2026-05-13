import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";

import { LogoutButton } from "@/features/logout-button";

export function AppSidebarFooter() {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <LogoutButton />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
