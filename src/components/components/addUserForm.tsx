"use client";

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import styles from "./addUserForm.module.css";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Modal from "react-bootstrap/Modal";

import locations from "@/Data/locationData";
import departments from "@/Data/departmentsData";

import "bootstrap/dist/css/bootstrap.min.css";
import ButtonComp from "./button";

export default function AddUserForm({ show, onHide, onAddUser }: any) {
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    department: "",
    role: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Here you would typically send the formData to your backend or API
    console.log("Form submitted:", formData);
    onAddUser(formData); // Call the parent function to add the user

    //Reset the form after submission
    setFormData({
      employeeId: "",
      firstName: "",
      lastName: "",
      email: "",
      location: "",
      department: "",
      role: "",
    });

    onHide(); // Close the modal after submission
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        className={styles.modal}
      >
        {/*------------------------- Modal Title ----------------------------------*/}
        <Modal.Header className={styles.modalHead} closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Employee
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/*------------------------- Add User Form ----------------------------------*/}
          <Form onSubmit={handleSubmit}>
            {/*------------------------- Employee ID ----------------------------------*/}
            <FloatingLabel
              controlId="floatingInput"
              label="Employee ID"
              className="mb-1"
            >
              <Form.Control
                type="text"
                value={formData.employeeId}
                onChange={(e) =>
                  setFormData({ ...formData, employeeId: e.target.value })
                }
                required
              />
            </FloatingLabel>
            <br />

            {/*------------------------- First Name ----------------------------------*/}
            <FloatingLabel
              controlId="floatingInput"
              label="First Name"
              className="mb-1"
            >
              <Form.Control
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </FloatingLabel>
            <br />

            {/*------------------------- Last Name ----------------------------------*/}
            <FloatingLabel
              controlId="floatingInput"
              label="Last Name"
              className="mb-1"
            >
              <Form.Control
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </FloatingLabel>
            <br />

            {/*------------------------- Email ----------------------------------*/}
            <FloatingLabel
              controlId="floatingEmail"
              label="Email"
              className="mb-1"
            >
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </FloatingLabel>
            <br />

            {/*------------------------- Location ----------------------------------*/}
            <Form.Select
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            >
              <option>Location</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </Form.Select>
            <br />

            {/*------------------------- Department ----------------------------------*/}
            <Form.Select
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
            >
              <option>Department</option>
              {departments.map((dep) => (
                <option key={dep.id} value={dep.name}>
                  {dep.name}
                </option>
              ))}
            </Form.Select>

            {/*------------------------------------------------------------------------*/}
            <br />
            {/*--------------------------- Role -------------------------*/}
            <FloatingLabel
              controlId="floatingRole"
              label="Role"
              className="mb-3"
            >
              <Form.Select
                name="role"
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                value={formData.role}
              >
                <option value="">Select a role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className={styles.buttonsContainer}>
            {/*------------------------- Close Button ----------------------------------*/}
            <ButtonComp
              text="Close"
              onClick={onHide}
              style={{
                width: "auto",
                color: "#fff",
                background: "grey",
                marginRight: "0.5rem",
              }}
            />
            {/*------------------------- Add User Button ----------------------------------*/}
            <ButtonComp
              text="Add"
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
      <br />
    </div>
  );
}
