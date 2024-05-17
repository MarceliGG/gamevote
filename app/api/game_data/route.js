import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { jwtpass } from "../settings.js";
import sql from "../db.js";

async function get_by_id(id) {
  const result = await sql`
    SELECT * FROM Games WHERE company_id = ${id}
  `;
  if (!result[0]) return {};
  return result[0];
}

async function get_by_token(token) {
  const decoded = jwt.verify(token, jwtpass);
  return await get_by_id(decoded.id);
}

export async function GET(req) {
  const params = new URL(req.url).searchParams;
  if (params.get("id") !== null)
    return NextResponse.json({
      error: false,
      data: await get_by_id(params.get("id")),
    });
  if (params.get("token") !== null) {
    return NextResponse.json({
      error: false,
      data: await get_by_token(params.get("token")),
    });
  }

  return NextResponse.json({ error: true, message: "unknown id" });
}

export async function POST(req) {
    try {
  const data = await req.json();
  const token = data.token;
  const decoded = jwt.verify(token, jwtpass);
  const name = data.name;
  const website = data.website;
  const type = data.type;
  const premiere_date = data.premiere_date;
  const description = data.description;
  if (!name) return NextResponse.json({ error: true, message: "missing name" });
  if (!website)
    return NextResponse.json({ error: true, message: "missing website" });
  if (!type) return NextResponse.json({ error: true, message: "missing type" });
  if (!premiere_date)
    return NextResponse.json({ error: true, message: "missing premiere_date" });
  if (!description)
    return NextResponse.json({ error: true, message: "missing description" });

  await sql`
    INSERT INTO Games (company_id, name, website, type, premiere_date, description)
      VALUES (${decoded.id}, ${name}, ${website}, ${type}, ${premiere_date}, ${description})
    ON CONFLICT (company_id) DO UPDATE
      SET 
        name = excluded.name,
        website = excluded.website,
        type = excluded.type,
        premiere_date = excluded.premiere_date,
        description = excluded.description;
  `;
	} catch (r) {
console.log(r)
}

  return NextResponse.json({ error: false });
}
