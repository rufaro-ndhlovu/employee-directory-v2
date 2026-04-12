"use client";

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { forgotPassword } from "../../../firebase/employeeService";
import toast from "react-hot-toast";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import ButtonComp from "./button";
import Styles from "./forgotPassword.module.css";

export default function ForgotPasswordModal({ show, handleClose }: any) {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const response = await forgotPassword(email);
    if (response.success) {
      toast.success(
        "Link to reset your password has been sent, check your inbox."
      );
      setEmail("");
      handleClose();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className={Styles.modalHeader} closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <FloatingLabel controlId="emailAddress" label="Email Address">
                <Form.Control
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className={Styles.buttonCont}>
            <ButtonComp
              text="Cancel"
              style={{
                width: "auto",
                color: "#fff",
                background: "grey",
                marginRight: "0.5rem",
              }}
              onClick={handleClose}
            />

            <ButtonComp
              text="Submit"
              style={{
                width: "auto",
                color: "#fff",
                background: "linear-gradient(135deg, #6fc7c2, #a185ff)",
              }}
              onClick={handleSubmit}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
