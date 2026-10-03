import pool from '../config/db.js';
import bcrypt from 'bcrypt';

class User {
    // Create a User Table
    static async createTable() {
        const query = `create table if not exists users(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        hpassword VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);`;
        await pool.query(query);
    }

    // Insert into table
    static async insert({ username, email, password }) {
        const salt = 10;
        const hpassword = await bcrypt.hash(password, salt);
        const query = `insert into users(username, email, hpassword) 
        values($1, $2, $3) returning *;`;
        const { rows } = await pool.query(query, [username, email, hpassword]);
        return rows[0];
    }

    // Find user by email
    static async findByEmail(email) {
        const query = "select * from users where email = $1;";
        const { rows } = await pool.query(query, [email.toLowerCase()]);
        return rows[0] || null;
    }
}

export default User;