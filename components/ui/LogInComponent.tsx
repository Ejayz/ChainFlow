"use client";
import { Form, Formik } from "formik";
import { useEffect, useRef } from "react";
import * as yup from "yup";

export default function LogInComponent() {
  const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <Formik
        
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values) => console.log(values)}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form className="card-body" onSubmit={handleSubmit}>
                <div className="text-center lg:text-left">
                  <h1 className="text-5xl font-bold">Login </h1>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
