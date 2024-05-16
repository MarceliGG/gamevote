import { NextResponse } from "next/server";
import sql from "../db.js";
import md5 from "md5";
import jwt from "jsonwebtoken";
import { jwtpass } from "../settings.js";

export async function POST(req) {
  const data = await req.json();
  const email = data.email;
  const pass = data.pass;

  if (email === null)
    return NextResponse.json({ error: true, message: "email missing" });
  if (pass === null)
    return NextResponse.json({ error: true, message: "password missing" });

  const passwd = md5(pass);

  const result = await sql`
  SELECT
    id,
    email,
    password
  FROM Companies
  WHERE
    email = ${email}
    and password = ${passwd}
  `;

  if (result.length) {
    const token = jwt.sign(
      { id: result[0].id, email: result[0].email },
      jwtpass,
    );
    return NextResponse.json({ error: false, token: token });
  }

  return NextResponse.json({ error: true, message: "incorrect credentials" });
}
