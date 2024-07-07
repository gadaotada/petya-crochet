import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";

import { db } from "@/database/conn";
import { sessionTable, userTable } from "@/database/schema";

export const adapter = new DrizzleMySQLAdapter(db, sessionTable, userTable);