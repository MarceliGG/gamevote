import { NextResponse } from "next/server";
import sql from "../db.js";

async function get_by_id(id) {
  const result = await sql`
    SELECT * FROM Images WHERE company_id = ${id} LIMIT 1
  `;
  if (!result.length) return [];
  return result[0];
}

export async function GET(req) {
  const params = new URL(req.url).searchParams;
  if (params.get("id") !== null)
    return NextResponse.json({
      error: false,
      img: await get_by_id(params.get("id")),
    });
  return NextResponse.json({ error: true, message: "missing id" });
}
