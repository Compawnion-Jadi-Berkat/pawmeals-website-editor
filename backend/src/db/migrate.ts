import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, pool } from "./index.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runMigrations() {
  console.log("[Migrate] Running migrations on AWS RDS pawmeals_db...");
  try {
    await migrate(db, {
      migrationsFolder: path.join(__dirname, "migrations"),
    });
    console.log("[Migrate] All migrations applied successfully.");
  } catch (error) {
    console.error("[Migrate] Migration failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrations();
