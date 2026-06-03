import { useSession } from "@/entities/session";

import { SidebarMenuButton } from "@/shared/ui/sidebar";

import { LogOut } from "lucide-react";

export function LogoutButton() {
  const { logout } = useSession();
  return (
    <SidebarMenuButton
      onClick={logout}
      className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground/90 flex cursor-pointer items-center gap-2"
    >
      <LogOut className="size-4" />
      <span>Logout</span>
    </SidebarMenuButton>
  );
}
