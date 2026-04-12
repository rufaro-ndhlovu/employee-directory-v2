"use client";

import React from "react";
import { Modal } from "react-bootstrap";
import ButtonComp from "./button";
import { updateEvent} from "../../../firebase/employeeService";
import DeleteEvent from "./deleteEvent";
import styles from "./editEvent.module.css";

export default function EditEvent({
  show,
  onHide,
  newTitle,
  setNewTitle,
  setEvents,
  editingEventId,
}: any) {
  // Handle saving the edited event
  const handleSave = async () => {
    try {
      // 1. Update Firestore
      await updateEvent(editingEventId, { title: newTitle });

      // 2. Update React state
      setEvents((prev: any[]) =>
        prev.map((event) =>
          event.id === editingEventId ? { ...event, title: newTitle } : event
        )
      );
      // Close the modal
      onHide();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header className={styles.modalHeader} closeButton>
          {/* Modal title */}
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Input for editing event title */}
          <input
            className={styles.input}
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          {/* Buttons to close or save changes */}
          <DeleteEvent
            eventId={editingEventId}
            onHide={onHide}
            setEvents={setEvents}
          />

          <ButtonComp
            text="Update"
            style={{
              width: "auto",
              color: "#fff",
              background: "linear-gradient(135deg, #6fc7c2, #a185ff)",
            }}
            onClick={handleSave}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}
