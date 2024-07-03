import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.supabaseUrl ?? "";
const supabaseKey = process.env.supabaseKey ?? "";

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req: Request) {
  return NextResponse.json({ message:supabase.from("users").select("*") });
}
