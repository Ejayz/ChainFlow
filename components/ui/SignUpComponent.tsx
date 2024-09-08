"use client";
import { error } from "console";
import { Form, Formik, FormikProps } from "formik";
import { CircleAlert, CircleHelp, Icon } from "lucide-react";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";

export default function SignUpComponent() {
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Valid email is required.")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Repeat Password is required"),
    acceptTerms: yup
      .boolean()
      .oneOf([true], "You must accept terms and conditions to continue")
      .required("Please accept terms and conditions."),
  });

  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <Formik
            initialValues={{
              email: "",
              password: "",
              repeatPassword: "",
              acceptTerms: "false",
            }}
            validationSchema={loginSchema}
            onSubmit={async (values, actions) => {
              const response = await fetch("/api/user/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              });
              if (response.status == 200) {
                toast.success("Account created successfully");
                actions.resetForm();
              } else if (response.status == 422) {
                toast.error("Email already exists. Please login instead.");
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
              resetForm,
            }) => (
              <Form
                className="card-body"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                <div className="text-center lg:text-left">
                  <h1 className="text-5xl font-bold">Signup</h1>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    name="email"
                    placeholder="Email"
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
                    type="password"
                    name="password"
                    placeholder="Password"
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
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Repeat Password</span>
                  </label>
                  <input
                    type="password"
                    name="repeatPassword"
                    placeholder="Repeat Password"
                    className="input input-bordered"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.repeatPassword}
                  />
                  <label className="label ">
                    {errors.repeatPassword && touched.repeatPassword ? (
                      <span className="label-text text-error flex flex-row">
                        <CircleAlert className="mr-2" />
                        {errors.repeatPassword}
                      </span>
                    ) : (
                      ""
                    )}
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text justify-center flex flex-row">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.acceptTerms}
                        className="checkbox mr-4"
                      />
                      <span className="checkbox-mark"></span>I agree to the
                      terms and conditions
                    </span>
                  </label>
                  <label className="label ">
                    {errors.acceptTerms && touched.acceptTerms ? (
                      <span className="label-text text-error flex flex-row">
                        <CircleAlert className="mr-2" />
                        {errors.acceptTerms}
                      </span>
                    ) : (
                      ""
                    )}
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button type="submit"
                    className={`${
                      isSubmitting ? "btn btn-disabled" : "btn btn-primary"
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
