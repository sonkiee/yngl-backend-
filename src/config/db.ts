import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { DATABASE_URL } from "./env";

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: true,
});
const db = drizzle(pool!);

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    client.release();
    console.log(
      "✅ Database connection successful."
      // client
    );
    return true;
  } catch (error) {
    console.error(`❌ Database connection error `, error);
    process.exit(1);
  }
};

export default db;
