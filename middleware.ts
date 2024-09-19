import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";
import * as jose from "jose";

const PROJECT_URL = process.env.PROJECT_URL ?? "";
const ANON_PUBLIC = process.env.ANON_PUBLIC ?? "";
export default async function RoutesMiddleWare(request: NextRequest) {
  const baseUrl = "http://localhost:3000";
  const supabase = createClient(PROJECT_URL, ANON_PUBLIC);
  return NextResponse.next();
  // if (request.nextUrl.pathname.includes("/api/protected")) {
  //   //Get the token from the cookie
  //   const token = request.cookies.get("auth")?.value;

  //   //No token found, redirect to login
  //   if (!token) {
  //     return NextResponse.redirect(baseUrl);
  //   } else {
  //     //Token found try to verify via supabase
  //     const verify = await supabase.auth.getUser(token);
  //     console.log("Verfiying Token:", verify);
  //     if (verify.error && verify.error.message.includes("illegal base64")) {
  //       return NextResponse.redirect(baseUrl);
  //     }
  //     if (
  //       verify.error &&
  //       verify.error.message.includes("signature is invalid")
  //     ) {
  //       return NextResponse.redirect(baseUrl);
  //     }
  //     if (verify.error && verify.error.message.includes("token is expired")) {
  //       console.log("Token is expired, trying to refresh");
  //       const decoded = <any>await jose.decodeJwt(token);
  //       const uuid = decoded.session_id;
  //       const refreshToken = await supabase
  //         .from("tbl_refresh_tokens")
  //         .select()
  //         .eq("session_id", uuid)
  //         .is("is_exist", true);
  //       console.log("Refresh Token:", refreshToken);
  //       if (!refreshToken.data?.length) {
  //         return NextResponse.redirect(baseUrl);
  //       }
  //       if (refreshToken.data?.length == 0) {
  //         return NextResponse.redirect(baseUrl);
  //       }
  //       const updateDate = refreshToken.data[0].created_at;
  //       const currentDate = new Date();
  //       const diff = DateTime.fromISO(updateDate)
  //         .diff(DateTime.fromISO(currentDate.toISOString()), ["hours"])
  //         .toObject();
  //       console.log("Diff:", diff);
  //       if (!diff.hours) return NextResponse.redirect(baseUrl);
  //       console.log(diff.hours > 3);
  //       if (diff.hours > 3) {
  //         return NextResponse.redirect(baseUrl);
  //       }
  //       const newAccessToken = await supabase.auth.refreshSession({
  //         refresh_token: refreshToken.data[0].refreshtoken,
  //       });
  //       console.log("newAccessToken:", newAccessToken);
  //       if (!newAccessToken) {
  //         return NextResponse.redirect(baseUrl);
  //       }
  //       if (newAccessToken.error) {
  //         return NextResponse.redirect(baseUrl);
  //       }
  //       const updateRefreshToken = await supabase
  //         .from("tbl_refresh_tokens")
  //         .update({
  //           refreshtoken: newAccessToken.data.session?.refresh_token,
  //           updated_at: new Date().toISOString(),
  //         })
  //         .eq("session_id", uuid);
  //       console.log("updateRefreshToken:", updateRefreshToken);
  //       return NextResponse.next({
  //         headers: {
  //           "Set-Cookie": `auth=${newAccessToken.data.session?.access_token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax`,
  //         },
  //       });
  //     } else {
  //       //Token is valid, check if the refresh token is still valid
  //       const uuid = verify.data.user?.id;
  //       const refreshToken = await supabase
  //         .from("tbl_refresh_tokens")
  //         .select()
  //         .eq("uuid", uuid);
  //       if (!refreshToken.data) {
  //         return NextResponse.redirect(baseUrl);
  //       }
  //       if (refreshToken.data?.length == 0) {
  //         return NextResponse.redirect(baseUrl);
  //       }
  //       const updateDate = refreshToken.data[0].updated_at;
  //       const currentDate = new Date();
  //       const diff = DateTime.fromISO(updateDate)
  //         .diff(DateTime.fromISO(currentDate.toISOString()), ["hours"])
  //         .toObject();
  //       if (!diff.hours) return NextResponse.redirect(baseUrl);
  //       if (diff.hours > 3) {
  //         return NextResponse.redirect(baseUrl);
  //       }
  //       return NextResponse.next();
  //     }
  //   }
  // }
}
export const config = {
  matcher: "/:path*", // This will apply the middleware to all routes
};
