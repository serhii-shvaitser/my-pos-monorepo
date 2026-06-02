import { useNavigate, useSearch } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { type ApiError } from "@repo/types";
import { toast } from "sonner";

import { saveSession, authApi } from "@/entities/session";
import { type LoginCredentials, type SessionData } from "@repo/types";
import { type LoginOptions } from "./types";

export function useLoginByPin({ onLoginError }: LoginOptions = {}) {
  const navigate = useNavigate();
  const { redirect: redirectPath } = useSearch({
    from: "/login",
  });

  const { mutate, isPending } = useMutation<
    SessionData,
    ApiError,
    LoginCredentials
  >({
    mutationFn: (credentials) => authApi.login(credentials),
    onSuccess: (data) => {
      saveSession(data);
      const safeRedirect =
        redirectPath && redirectPath.startsWith("/") ? redirectPath : "/";
      navigate({ to: safeRedirect });
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("Login error", {
        description: "Login error description",
      });
      onLoginError?.();
    },
  });

  return { login: mutate, isPending };
}
