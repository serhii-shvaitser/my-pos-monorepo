import { create } from "zustand";
import { type SessionState } from "./types";

export const useSessionStore = create<SessionState>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
}));
