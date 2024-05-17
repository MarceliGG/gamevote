import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { jwtpass } from "../settings.js";
import sql from "../db.js";

async function get_by_id(id) {
  const result = await sql`
    SELECT * FROM Images WHERE company_id = ${id}
  `;
  if (!result.length) return [];
  return result;
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
  if (params.get("token") !== null){
    return NextResponse.json({
      error: false,
      data: await get_by_token(params.get("token")),
    })}

  return NextResponse.json({ error: true, message: "unknown id" });
}

export async function POST(req) {
  const data = await req.json();
  const token = data.token;
  const decoded = jwt.verify(token, jwtpass);
  const imgData = data.imgData;
  if (!imgData) return NextResponse.json({ error: true, message: "missing data" });
  await sql`
    INSERT INTO Images (company_id, data) VALUES (${decoded.id}, ${imgData});
  `;

  return NextResponse.json({ error: false });
}

export async function DELETE(req) {
  const data = await req.json();
  const token = data.token;
  const decoded = jwt.verify(token, jwtpass);
  const imgId = data.id;
  if (!imgId) return NextResponse.json({ error: true, message: "missing id" });

  await sql`
    DELETE FROM Images WHERE id = ${imgId} and company_id = ${decoded.id}
  `;

  return NextResponse.json({ error: false });
}
