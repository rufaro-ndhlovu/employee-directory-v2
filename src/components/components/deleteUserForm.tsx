"use client";

import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Styles from "./deleteUserForm.module.css";
import { deleteEmployees } from "../../../firebase/employeeService";
import toast from "react-hot-toast";
import ButtonComp from "./button";

function DeleteUser({ show, onHide, employee, onDeleted }: any) {
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteEmployees(employee.id);
      toast.success("Employee details deleted successfully");
      onDeleted();
      onHide();
    } catch (error) {
      toast.error("Failed to delete employee");
    }
  };

  return (
    <div>
      <Modal
        className={Styles.modalContent}
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        onHide={onHide}
        restoreBody={false}   // prevent padding changes
        autoFocus={false}
        centered
      >
        <Modal.Header className={Styles.header} closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className={Styles.form} onSubmit={handleDelete}>
            <p>
              Are you sure you want to delete{" "}
              <strong>
                {employee?.firstName} {employee?.lastName}
              </strong>
              ?
            </p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/*------------------------- Close Button ----------------------------------*/}
          <ButtonComp text="Close" onClick={onHide} style={{width: "auto", color: "#fff",
              background: "grey",
          }}/>
          {/*------------------------- Delete User Button ----------------------------------*/}
          <ButtonComp
            text="Delete"
            onClick={handleDelete}
            style={{ width: "auto", backgroundColor: "#C64D24", color: "#fff" }}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteUser;
