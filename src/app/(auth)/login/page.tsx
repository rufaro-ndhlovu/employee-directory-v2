"use client";
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import { useRouter } from "next/navigation";

import "bootstrap/dist/css/bootstrap.min.css";

import { useFormik } from "formik";
import * as Yup from "yup";

import styles from "./page.module.css";
import { login } from "../../../../firebase/employeeService";
import toast from "react-hot-toast";
import ButtonComp from "@/components/components/button";
import ForgotPasswordModal from "@/components/components/forgotPassword";

export default function LoginPage() {
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
        toast.success("login successful");
        router.push("/employeeInfo");
      } catch (error) {
        const firebaseError = error as { code?: string; message?: string };
        let errorMessage = "Error occurred during login";

        if (firebaseError.code === "auth/invalid-credential") {
          errorMessage = "Invalid email or password, please try again.";
        }

        // Temporarily show the real error in the toast
        toast.error(
          firebaseError.code || firebaseError.message || "Unknown error",
        );

        console.log(firebaseError);
        console.log(firebaseError.code);
      }
    },
  });

  return (
    <div className={styles.page}>
      <div className={styles.overlay}></div>
      <Card className={styles.form} style={{ width: "25rem" }}>
        {/*Logo */}
        <div className={styles.image}>
          <img src="/logo3nobg.png" alt="logo" width={310} height={100} />
        </div>
        {/*Greeting Header */}
        <h4 className={styles.header}>Nice to see you again</h4>
        <form onSubmit={formik.handleSubmit}>
          {/*Email Address */}
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="name@example.com"
            />
          </FloatingLabel>
          {formik.touched.email && formik.errors.email ? (
            <p className={styles.errors}>{formik.errors.email}</p>
          ) : null}

          {/*Password */}
          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
            />
          </FloatingLabel>
          {formik.touched.password && formik.errors.password ? (
            <p className={styles.errors}>{formik.errors.password}</p>
          ) : null}

          {/*Sign in button */}
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.signInButton}>
              Sign in
            </button>
          </div>
          <br />
          <br />
        </form>

        {/*Create an account link */}
        <a href="/signUp" className={styles.createAccount}>
          Create an account
        </a>
        <br />

        {/*Forgot password link */}
        <a
          className={styles.forgotPassword}
          onClick={() => setShowForgotPasswordModal(true)}
        >
          Forgot Password
        </a>
      </Card>

      <ForgotPasswordModal
        show={showForgotPasswordModal}
        handleClose={() => setShowForgotPasswordModal(false)}
      />
    </div>
  );
}
