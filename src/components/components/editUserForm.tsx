"use client";

import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import styles from "./editUserForm.module.css";
import { updateEmployee } from "../../../firebase/employeeService";
import toast from "react-hot-toast";

import locations from "@/Data/locationData";
import departments from "@/Data/departmentsData";
import ButtonComp from "./button";

function EditUserForm({ show, onHide, onAddUser, employee }: any) {
  const initialFormData = {
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    department: "",
    role: "",
  };

  const [formData, setformData] = useState(initialFormData);

  useEffect(() => {
    if (employee) {
      setformData({
        employeeId: employee.id || "",
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        location: employee.location || "",
        department: employee.department || "",
        role: employee.role || "",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(employee.id, formData);
      onAddUser();
      onHide();
      toast.success("Employee details updated successfully");
    } catch (error) {}

    console.log(formData);
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
        <Modal.Header className={styles.header} closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/*------------------------- First Name ----------------------------------*/}
            <FloatingLabel
              controlId="floatingInput"
              label="First Name"
              className="mb-1"
            >
              <Form.Control
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                name="firstName"
                required
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
                onChange={handleChange}
                name="lastName"
                required
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
                onChange={handleChange}
                name="email"
                required
              />
            </FloatingLabel>
            <br />

            {/*------------------------- Location ----------------------------------*/}
            <Form.Select
              value={formData.location}
              onChange={handleChange}
              name="location"
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
              onChange={handleChange}
              name="department"
            >
              <option>Department</option>
              {departments.map((dep) => (
                <option key={dep.id} value={dep.name}>
                  {dep.name}
                </option>
              ))}
            </Form.Select>
            <br />

            {/*--------------------------- Role -------------------------*/}
            <FloatingLabel
              controlId="floatingRole"
              label="Role"
              className="mb-3"
            >
              <Form.Select
                name="role"
                onChange={handleChange}
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
              text="Save Changes"
              onClick={handleSubmit}
              style={{
                width: "auto",
                color: "#fff",
                background: "linear-gradient(135deg, #6fc7c2, #a185ff)",
              }}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditUserForm;
