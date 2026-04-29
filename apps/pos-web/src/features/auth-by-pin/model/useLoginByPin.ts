import { useNavigate, useSearch } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { authApi } from "@/shared/lib/api";
import { saveSession } from "@/entities/session";
import { type PinLoginRequest, type AuthResponse } from "@repo/types";
import { type LoginOptions } from "./types";

export function useLoginByPin({ onLoginError }: LoginOptions = {}) {
  const navigate = useNavigate();
  const { redirect: redirectPath } = useSearch({
    from: "/login",
  });

  const { mutate, isPending } = useMutation<
    AuthResponse,
    Error,
    PinLoginRequest
  >({
    mutationFn: (pin) => authApi.loginWithPin(pin),
    onSuccess: (data) => {
      saveSession(data);
      navigate({ to: redirectPath || "/" });
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
