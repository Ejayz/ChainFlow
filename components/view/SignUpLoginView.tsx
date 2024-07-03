"use client";

import { useState } from "react";
import ContentPage from "../ui/ContentPage";
import LandingPageHeader from "../ui/LandingPageHeader";
import LogInComponent from "../ui/LogInComponent";
import SignUpComponent from "../ui/SignUpComponent";

export default function SignUpLoginView() {
  const [mode, setMode] = useState("signup");

  return (
    <>
      <div className="flex swap flex-row min-h-screen min-w-screen bg-base-200 w-full">
        <section className="flex flex-col  items-center justify-center w-full bg-base-200 h-screen">
          <div
            className={`${
              mode == "signup"
                ? "block show-exchange-form"
                : "hidden vanish-exchange-form"
            }`}
          >
            <h1 className="text-4xl font-bold">A drop of crypto chain!</h1>
            <p className="py-6">Welcome back, Ready to collect crypto?</p>
            <button
              className="btn btn-primary"
              onClick={() => setMode("login")}
            >
              Log In
            </button>
          </div>
          <div
            className={`animate-exchange-form-from-right-to-left ${
              mode == "login" ? "block " : "hidden "
            }`}
          >
            <LogInComponent />
          </div>
        </section>
        <section
          className={` flex flex-col  items-center justify-center w-full bg-base-200 h-screen`}
        >
          <div
            className={` ${
              mode == "login"
                ? "block show-exchange-form"
                : "hidden vanish-exchange-form "
            }`}
          >
            <h1 className="text-4xl font-bold">A drop of crypto chain!</h1>
            <p className="py-6">
              Sign up and start collecting your crypto chain now!
            </p>
            <button
              className="btn btn-primary"
              onClick={() => setMode("signup")}
            >
              Sign Up
            </button>
          </div>
          <div
            className={`animate-exchange-form-from-left-to-right  ${
              mode == "signup" ? "block " : "hidden "
            }`}
          >
            <SignUpComponent />
          </div>
        </section>
      </div>
    </>
  );
}
