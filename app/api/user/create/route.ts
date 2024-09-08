import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabaseUrl = process.env.supabaseUrl ?? "";
const supabaseKey = process.env.supabaseKey ?? "";

const supabase = createClient(supabaseUrl, supabaseKey);

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
