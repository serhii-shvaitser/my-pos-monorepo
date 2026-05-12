import { Sidebar, SidebarRail } from "@/shared/ui/sidebar";

import { AppSidebarFooter } from "./SidebarFooter";
import { AppSidebarHeader } from "./SidebarHeader";
import { AppSidebarContent } from "./SidebarContent";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <AppSidebarHeader />
      <AppSidebarContent />
      <AppSidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
