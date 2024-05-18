import { NextResponse } from "next/server";
import sql from "../db.js";

export async function GET(req) {
  const result = await sql`
    SELECT DISTINCT ON (Companies.id) Games.name as game_name, Companies.name as company_name, Companies.id, Images.data FROM Games JOIN Companies ON Companies.id = Games.company_id LEFT JOIN Images ON Images.company_id = Companies.id
  `;
  return NextResponse.json({games: result})
}
