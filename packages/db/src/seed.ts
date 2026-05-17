import "dotenv/config";

import { createDb } from "./client";
import { staffTable } from "./schema";
import bcrypt from "bcrypt";
// import { InsertStaffSchema } from "./schema";

async function main() {
  const db = createDb(process.env.DATABASE_URL!);

  console.log("Створюю офіціанта...");

  const saltRounds = 10;
  const hashedPin = await bcrypt.hash("5555", saltRounds);

  const newUser = {
    code: "W02",
    name: "Пердіній",
    pinHash: hashedPin,
  };

  await db.insert(staffTable).values(newUser);

  console.log("Офіціанта додано!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Помилка під час сидингу офіціанта:", err);
  process.exit(1);
});
