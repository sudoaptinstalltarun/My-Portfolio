import "dotenv/config";
import { db } from "./server/db";
import { skills, experience, education } from "./shared/schema";

async function checkData() {
  const s = await db.select().from(skills);
  const ex = await db.select().from(experience);
  const ed = await db.select().from(education);
  console.log(`Skills: ${s.length}, Experience: ${ex.length}, Education: ${ed.length}`);
  process.exit(0);
}

checkData();
