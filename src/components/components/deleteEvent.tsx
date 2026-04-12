"use client";

import React from "react";
import { deleteEvent } from "../../../firebase/employeeService";
import ButtonComp from "./button";

export default function DeleteEvent({ eventId, onHide, setEvents }: any) {
  const handleDelete = async (eventId: any) => {
    try {
      await deleteEvent(eventId);
      setEvents((prev: any[]) => prev.filter((event) => event.id !== eventId));
      onHide();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <>
      <div>
        <ButtonComp
          text="Delete"
          onClick={() => handleDelete(eventId)}
          style={{ width: "auto", backgroundColor: "#C64D24", color: "#fff" }}
        />
      </div>
    </>
  );
}
