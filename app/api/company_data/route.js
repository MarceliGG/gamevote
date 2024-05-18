import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { jwtpass } from "../settings.js";
import sql from "../db.js";

export async function GET(req) {
  const params = new URL(req.url).searchParams;
  const id = params.get("id");
  if (id === null)
    return NextResponse.json({ error: true, message: "missing id" });

  const result = await sql`
    SELECT name, domain FROM Companies WHERE id = ${id}
  `;
  console.log(result);
  if (!result[0]) return {};
  return NextResponse.json({ error: false, data: result[0] });
}
