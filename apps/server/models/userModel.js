import pool from '../config/db.js';
import bcrypt from 'bcrypt';

class User {
    // Create a User Table
    static async createTables() {
        const query = `create table if not exists users(
            id uuid primary key default gen_random_uuid(),
            username varchar(10) not null,
            email varchar(15) unique not null,
            hpassword varchar(50) not null,
            is_admin boolean default false,
            created_at timestamp with time zone default current_timestamp);`;
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

    // Update User details
    static async update(id, updates){
        const fields = Object.keys(updates);
        if(fields.length === 0) {
            throw new Error("No fields to update");
        }
        const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(", ");
        const values = Object.values(updates);
        values.push(id);
        const query = `update users set ${setClause} where id = $${fields.length + 1} returning *;`;
        const { rows } = await pool.query(query, values);
        return rows[0] || null;
    }
    
    // Change Password
    static async changePassword(id, newPassword) {
        const salt = 10;
        const hpassword = await bcrypt.hash(newPassword, salt);
        const query = `update users set hpassword = $1 where id = $2 returning *;`;
        const { rows } = await pool.query(query, [hpassword, id]);
        return rows[0] || null;
    }
}

export default User;