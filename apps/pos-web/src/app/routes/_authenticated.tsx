import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useSessionStore } from "@/entities/session";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/shared/ui/sidebar";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";

import { AppSidebar } from "@/widgets/sidebar";

import { authApi } from "@/shared/lib/api";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    const { accessToken } = useSessionStore.getState();
    if (!accessToken) {
      try {
        const data = await authApi.refreshToken();
        useSessionStore.getState().setAccessToken(data.accessToken);
      } catch {
        const redirectPath = `${location.pathname}${location.search}${location.hash}`;
        throw redirect({
          to: "/login",
          search: {
            redirect: redirectPath,
          },
        });
      }
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
          <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-4"
            />
            <h1 className="text-base font-medium">Tables</h1>
            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="ghost"
                asChild
                size="sm"
                className="hidden sm:flex"
              >
                <a
                  href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="dark:text-foreground"
                >
                  Кіріній
                </a>
              </Button>
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6">
              <Outlet />
            </div>
          </div>
        </main>
        <footer></footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
