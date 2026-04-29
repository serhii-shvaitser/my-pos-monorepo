import { type User, type Table } from "@repo/types";

const MOCK_USERS: Record<string, User> = {
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

const MOCK_TABLES: Table[] = [
  {
    id: "123",
    number: 1,
    capacity: 4,
    status: "free",
  },
  {
    id: "123",
    number: 1,
    capacity: 4,
    status: "free",
  },
  {
    id: "123",
    number: 1,
    capacity: 4,
    status: "free",
  },
  {
    id: "123",
    number: 1,
    capacity: 4,
    status: "free",
  },
  {
    id: "123",
    number: 1,
    capacity: 4,
    status: "free",
  },
  {
    id: "123",
    number: 1,
    capacity: 4,
    status: "free",
  },
  {
    id: "123",
    number: 1,
    capacity: 4,
    status: "free",
  },
  {
    id: "123",
    number: 1,
    capacity: 4,
    status: "free",
  },
];

export { MOCK_USERS, MOCK_TABLES };
