"use client";
import { Form, Formik } from "formik";
import { CircleAlert } from "lucide-react";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";

export default function LogInComponent() {
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format.")
      .required("Email is required."),
    password: yup.string().required("Password is required."),
  });

  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={async (values) => {
              let headersList = {
                Accept: "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                Referer: "",
                "Content-Type": "application/json",
              };

              let bodyContent = JSON.stringify({
                email: values.email,
                password: values.password,
              });

              let response = await fetch("/api/user/login", {
                method: "POST",
                body: bodyContent,
                headers: headersList,
              });

              let data = await response.json();
              if (response.status == 200) {
                setTimeout(() => {
                  window.location.href = "/tokens";
                }, 3000);
                toast.success("Logged in successfully");
              } else if (response.status == 400) {
                toast.error(
                  `Invalid email or password. ${data.attempts} left before account lock down.`
                );
              } else if (response.status == 429) {
                toast.error(
                  `Invalid email or password. Account locked down. Please contact support.`
                );
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form
                className="card-body"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                <div className="text-center lg:text-left">
                  <h1 className="text-5xl font-bold">Login </h1>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <label className="label ">
                    {errors.email && touched.email ? (
                      <span className="label-text text-error flex flex-row">
                        <CircleAlert className="mr-2" />
                        {errors.email}
                      </span>
                    ) : (
                      ""
                    )}
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    name="password"
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <label className="label ">
                    {errors.password && touched.password ? (
                      <span className="label-text text-error flex flex-row">
                        <CircleAlert className="mr-2" />
                        {errors.password}
                      </span>
                    ) : (
                      ""
                    )}
                  </label>
                </div>
                <div className="form-control mt-6">
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className={`btn ${
                      isSubmitting ? "btn-disabled" : "btn-primary"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner"></span>{" "}
                        Creating Account
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
