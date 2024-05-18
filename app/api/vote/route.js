import { NextResponse } from "next/server";
import sql from "../db.js";
import { voting_password } from "../settings.js";

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
  const data = await req.json();
  if (data.pass !== voteing_password)
    return NextResponse.json({ error: true, message: "incorrect password" });
  await sql`
  UPDATE Games 
  SET votes = votes + 1
  WHERE company_id = ${data.id}
  `
  return NextResponse.json({ error: false });
}
