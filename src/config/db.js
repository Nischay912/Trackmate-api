import { neon } from '@neondatabase/serverless'

// step14: this is another way to get access to the env variables instead of calling the dotenv.config() method seperately there, thus now here below.
import "dotenv/config"

// step15: now lets create the SQL connection using the environment variable here below.

// step16: we can import this "sql" in other files now to write the SQL queries to the database thus here below.

// step17: see the next steps in server.js file now there.
export const sql = neon(process.env.DATABASE_URL)

export async function initDB() {
    try{
        await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY, 
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
        console.log("Database initialized successfully!")
    }
    catch(error){
        console.error("Error initializing database:", error)
        process.exit(1)
    }
}