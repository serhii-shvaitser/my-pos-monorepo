import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  createFileRoute,
  Outlet,
  Link,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ location }) => {
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { logout } = useAuth();
  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r bg-muted/40 p-4">
        <nav className="flex flex-col gap-2">
          <Link to="/" className="p-2 hover:bg-accent rounded">
            Головна
          </Link>
          <Link to="/tables" className="p-2 hover:bg-accent rounded">
            Зали
          </Link>
          <Button onClick={logout}>Logout</Button>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
