"use client";

import React, { useState, useEffect } from "react";
import SideMenu from "@/components/components/sideMenu";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Styles from "./page.module.css";
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import {
  getEvents
} from "../../../firebase/employeeService";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AddEvent from "@/components/components/addEvent";
import EditEvent from "@/components/components/editEvent";

// Add this interface
interface CalendarEvent {
  id: string;
  title: string;
  start: string;
}

export default function Calender() {
  // State to hold calendar events
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [modalShow, setModalShow] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  // Fetch events from Firestore on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents();

        const formattedEvents = eventsData.map((event: any) => ({
          id: event.id,
          title: event.title,
          start: event.date,
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, []);

  // Enhanced date click handler to add event with Firestore integration
  const handleDateClick = (info: any) => {
    try {
      setModalShow(true);
      setSelectedDate(info.dateStr);
      //Reset the title after submission
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // Enhanced event click handler to edit event title
  const handleEventClick = (clickInfo: any) => {
    const eventId = clickInfo.event.id;
    const currentTitle = clickInfo.event.title;
    setEditingEventId(eventId);
    setNewTitle(currentTitle);
    setShowEditModal(true);
  };

  return (
    <div>
      {/* Side Menu Component */}
      <SideMenu />

      {/* Add Event Modal Component */}
      <AddEvent
        show={modalShow}
        setModalShow={setModalShow}
        onHide={() => setModalShow(false)}
        title={title}
        setTitle={setTitle}
        selectedDate={selectedDate}
        setEvents={setEvents}
      />

      {/* Edit Event Modal Component */}
      <EditEvent
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        title={title}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        setEvents={setEvents}
        editingEventId={editingEventId}
      />

      {/* FullCalendar Component */}
      <div className={Styles.calendarContainer}>
        <FullCalendar
          events={events}
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            bootstrap5Plugin,
          ]}
          initialView="dayGridMonth"
          weekends={true}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          nowIndicator={true}
          editable={true}
          selectable={true}
          selectMirror={true}
          themeSystem="bootstrap5"
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventContent={(eventInfo) => {
            return (
              <>
                <div className={Styles.eventContent}>
                  <b>{eventInfo.timeText}</b>
                  <i>{eventInfo.event.title}</i>
                </div>
              </>
            );
          }}
        />
      </div>
    </div>
  );
}
