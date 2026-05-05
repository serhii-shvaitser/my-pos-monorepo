import "dotenv/config";

import { createDb } from "./client";
import { staffTable } from "./schema";
import bcrypt from "bcrypt";

async function main() {
  const db = createDb(process.env.DATABASE_URL!);

  console.log("Створюю офіціанта...");

  const saltRounds = 10;
  const hashedPin = await bcrypt.hash("1234", saltRounds);

  await db.insert(staffTable).values({
    code: "W01",
    name: "Кіріній",
    pinHash: hashedPin,
    role: "waiter",
  });

  console.log("Офіціанта додано!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Помилка під час сидингу офіціанта:", err);
  process.exit(1);
});
