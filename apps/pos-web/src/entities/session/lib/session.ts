import { type SessionData } from "@repo/types";
import { useSessionStore } from "../model/store";

export function saveSession({ accessToken }: SessionData) {
  useSessionStore.getState().setAccessToken(accessToken);
}

export function clearSession() {
  useSessionStore.getState().setAccessToken(null);
}
