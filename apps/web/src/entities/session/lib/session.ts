import { type SessionData } from "../model/types";

export function saveSession({ token, user }: SessionData) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
