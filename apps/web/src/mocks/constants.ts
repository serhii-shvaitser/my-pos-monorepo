import { type User } from "@repo/types";

export const MOCK_USERS: Record<string, User> = {
  "1234": {
    id: "w1",
    name: "Gordon Ramsay",
    role: "admin",
    permissions: ["all"],
  },
  "5555": {
    id: "w2",
    name: "Marco Pierre White",
    role: "waiter",
    permissions: ["print_bill"],
  },
};
