import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Limit the number of connections in the pool
  queueLimit: 0, // Unlimited queued requests
});

const query = async (sql, params = []) => {
    try {
      const res = await pool.query(sql, params);
      return res;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  };
// Export the pool for reuse
export  {query};
