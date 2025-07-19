import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
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
