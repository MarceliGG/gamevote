import { NextResponse } from "next/server";
import sql from "../db.js";
import md5 from "md5";
import jwt from "jsonwebtoken";
import { jwtpass } from "../settings.js";

export async function POST(req) {
  const data = await req.json();
  const name = data.name;
  const domain = data.domain;
  const email = data.email;
  const pass = data.pass;

  if (name === undefined)
    return NextResponse.json({ error: true, message: "name missing" });
  if (email === undefined)
    return NextResponse.json({ error: true, message: "email missing" });
  if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
    return NextResponse.json({ error: true, message: "invalid email" });
  if (pass === undefined)
    return NextResponse.json({ error: true, message: "password missing" });
  if (domain === undefined)
    return NextResponse.json({ error: true, message: "domain missing" });
  if (
    !domain.match(
      /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/,
    )
  )
    return NextResponse.json({ error: true, message: "invalid domain" });
  const passwd = md5(pass);

  const comp = await sql`
  SELECT
    email
  FROM Companies
  WHERE 
    email = ${email}
  `;

  if (comp.length)
    return NextResponse.json({ error: true, message: "email arleady in use" });

  const result = await sql`
  INSERT INTO Companies (name, email, domain, password) VALUES (${name}, ${email}, ${domain}, ${passwd}) RETURNING id, email
  `;

  const token = jwt.sign({id: result[0].id, email: result[0].email}, jwtpass)

  return NextResponse.json({error: false, token: token});
}
