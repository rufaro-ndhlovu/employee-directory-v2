"use client";

import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useFormik } from "formik";
import * as Yup from "yup";

import "bootstrap/dist/css/bootstrap.min.css";
import { signUp } from "../../../../firebase/employeeService";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export default function SignUp() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      userPhotoUrl: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: Yup.object({
      userPhotoUrl: Yup.string(),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
      role: Yup.string().required("Select a role"),
    }),
    onSubmit: async (values) => {
      try {
        //Create auth user
        const userCredential = await signUp(values.email, values.password);
        const user = userCredential.user;

        //Save user document
        const db = getFirestore();
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          userPhotoUrl: values.userPhotoUrl,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          role: values.role,
        });

        toast.success("Account created successfully, please login");
        router.push("/login");
      } catch (error: unknown) {
        const firebaseError = error as { code?: string };
        let errorMessage = "Error creating account";

        if (firebaseError.code === "auth/email-already-exists") {
          errorMessage =
            "This email is already registered, please use a different email";
        }

        toast.error(errorMessage);

        console.log(firebaseError);
        console.log(firebaseError.code);
      }
    },
  });

  return (
    <div className={styles.page}>
      <div className={styles.overlay}></div>
      <Card className={styles.form} style={{ width: "25rem" }}>
        <div className={styles.image}>
          <img src="/logo3nobg.png" alt="logo" width={310} height={100} />
        </div>

        {/*Greeting Header */}
        <h4 className={styles.header}>Great to meet you!</h4>
        <Form onSubmit={formik.handleSubmit}>
          {/*User profile image 
          <FloatingLabel
            controlId="floatingInput"
            label="User Profile Picture"
            className="mb-3"
          >
            <Form.Control
              name="userPhotoUrl"
              type="text"
              placeholder="Paste profile image path or url"
              onChange={formik.handleChange}
              value={formik.values.userPhotoUrl}
            />
          </FloatingLabel>*/}

          {/*First Name */}
          <FloatingLabel
            controlId="floatingInput"
            label="First Name"
            className="mb-3"
          >
            <Form.Control
              name="firstName"
              type="text"
              placeholder="First Name"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
          </FloatingLabel>
          {formik.touched.firstName && formik.errors.firstName ? (
            <p className={styles.errors}>{formik.errors.firstName}</p>
          ) : null}

          {/*Last Name */}
          <FloatingLabel
            controlId="floatingInput"
            label="Last Name"
            className="mb-3"
          >
            <Form.Control
              name="lastName"
              type="text"
              placeholder="Last Name"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </FloatingLabel>
          {formik.touched.lastName && formik.errors.lastName ? (
            <p className={styles.errors}>{formik.errors.lastName}</p>
          ) : null}

          {/*Email Address */}
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              name="email"
              type="email"
              placeholder="name@example.com"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </FloatingLabel>
          {formik.touched.email && formik.errors.lastName ? (
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
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </FloatingLabel>
          {formik.touched.password && formik.errors.password ? (
            <p className={styles.errors}>{formik.errors.password}</p>
          ) : null}

          {/*Role*/}
          <FloatingLabel controlId="floatingRole" label="Role" className="mb-3">
            <Form.Select
              name="role"
              onChange={formik.handleChange}
              value={formik.values.role}
            >
              <option value="">Select a role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </FloatingLabel>
          {formik.touched.role && formik.errors.role ? (
            <p className={styles.errors}>{formik.errors.role}</p>
          ) : null}

          {/*Sign Up Button */}
          <button type="submit" className={styles.signUpButton}>
            Sign Up
          </button>
          <br />
          <br />

          {/*Sign in link */}
          <p>
            Already have an account?{" "}
            <a href="/login" className={styles.createAccount}>
              Sign in
            </a>
          </p>
        </Form>
      </Card>
    </div>
  );
}
