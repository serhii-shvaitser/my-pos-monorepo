export interface SessionState {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
}
