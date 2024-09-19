import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const PROJECT_URL = process.env.PROJECT_URL ?? "";
const ANON_PUBLIC = process.env.ANON_PUBLIC ?? "";

const supabase = createClient(PROJECT_URL, ANON_PUBLIC);

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        attempt: 0,
      },
    },
  });
  if (error) {
    console.log(error);
    return NextResponse.json(new Error(error.message), {
      status: error.status,
    });
  } else {
    return NextResponse.json("New account created successfully", {
      status: 200,
    });
  }
}
