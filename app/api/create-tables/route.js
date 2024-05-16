import { NextResponse } from "next/server";

import sql from "../db.js";

export async function GET() {
  await sql`CREATE TABLE IF NOT EXISTS Companies (id SERIAL PRIMARY KEY, name VARCHAR(100), domain VARCHAR(253), email VARCHAR(320) UNIQUE, password VARCHAR(50))`;
  await sql`CREATE TABLE IF NOT EXISTS Games (id SERIAL PRIMARY KEY, company_id INTEGER REFERENCES Companies(id), name VARCHAR(100), website VARCHAR(253), type VARCHAR(20), premiere_date DATE, description TEXT)`;
  await sql`CREATE TABLE IF NOT EXISTS Ratings (game_id INTEGER REFERENCES Games(id), rating SMALLINT)`;
  return NextResponse.json({ error: false });
}
