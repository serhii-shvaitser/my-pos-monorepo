import { useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  function logout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");

    queryClient.clear();
    router.navigate({ to: "/login" });
  }

  return { logout };
}
