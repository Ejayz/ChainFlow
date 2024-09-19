import { createClient, PostgrestSingleResponse } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { decodeJwt } from "jose";
import { insert } from "formik";
const PROJECT_URL = process.env.PROJECT_URL ?? "";
const ANON_PUBLIC = process.env.ANON_PUBLIC ?? "";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const supabase = createClient(PROJECT_URL, ANON_PUBLIC);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    const getAttempts = await supabase
      .from("tbl_attempts")
      .select("*")
      .eq("email", email);
    let attempts = 0;
    if (getAttempts.data && getAttempts.data.length != 0) {
      attempts = getAttempts.data[0].attempts;
    }

    if (attempts >= 2) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
          attempts: attempts + 1,
        },
        { status: 429 }
      );
    }
    const upSertAttempts = await supabase
      .from("tbl_attempts")
      .upsert(
        {
          email: email,
          attempts: attempts + 1,
        },
        {
          onConflict: "email",
        }
      )
      .select();

    return NextResponse.json(
      {
        message: "Invalid email or password",
        attempts: attempts + 1,
      },
      { status: 400 }
    );
  } else {
    const session_id = <any>await decodeJwt(data.session.access_token);
    const disableOldRefreshToken = await supabase
      .from("tbl_refresh_tokens")
      .update({ is_exist: false })
      .eq("uuid", data.user?.id);

    console.log(disableOldRefreshToken);
    const insertRefreshToken = await supabase
      .from("tbl_refresh_tokens")
      .insert({
        uuid: data.user?.id,
        refreshtoken: data.session?.refresh_token,
        session_id: session_id.session_id,
        is_exist: true,
      });

    await supabase
      .from("tbl_attempts")
      .upsert(
        {
          email: email,
          attempts: 0,
        },
        {
          onConflict: "email",
        }
      )
      .select();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Set-Cookie": `auth=${data.session.access_token}; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=3600`,
      },
    });
  }
}
