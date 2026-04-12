"use client";

import styles from "./addEvent.module.css";
import ButtonComp from "./button";
import Modal from "react-bootstrap/Modal";
import { addEvent } from "../../../firebase/employeeService";

export default function AddEvent({
  show,
  onHide,
  title,
  setTitle,
  selectedDate,
  setModalShow,
  setEvents,
}: any) {
  // Handle form submission to add event with Firestore integration
  const handleSubmit = async () => {
    const newEvent = await addEvent({ title, date: selectedDate });
    const newTitle = title;

    // Update the events state in the parent component
    const formattedEvents = {
      id: newEvent.id,
      title: newTitle,
      start: selectedDate,
    };

    // Append the new event to the existing events
    setEvents((prevEvents) => [...prevEvents, formattedEvents]);
    setTitle("");
    setModalShow(false);
    return newEvent;
  };

  return (
    <>
      {/* Modal for adding a new event */}
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        className={styles.modal}
      >
        <div className={styles.addEventContainer}>
          {/* Modal Header and Body */}
          <Modal.Header className={styles.modalHeader} closeButton>
            <Modal.Title>Add Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Form to input event title */}
            <form>
              <input
                className={styles.input}
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </form>
          </Modal.Body>
          {/* Modal Footer with action buttons */}
          <Modal.Footer>
            {/* Buttons to close the modal or submit the form */}
            <ButtonComp
              text="Close"
              style={{
                width: "auto",
                color: "#fff",
                background: "grey",
                marginRight: "0.5rem",
              }}
              onClick={onHide}
            />
            <ButtonComp
              text="Add"
              style={{
                width: "auto",
                color: "#fff",
                background: "linear-gradient(135deg, #6fc7c2, #a185ff)",
              }}
              onClick={handleSubmit}
            />
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}
