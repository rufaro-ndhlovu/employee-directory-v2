"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { getUserLoggedIn } from "../../../firebase/employeeService";
import UserAvatar from "@/components/components/userAvatar";
import SideMenu from "@/components/components/sideMenu";
import Loading from "@/components/components/loading";
import { FloatingLabel, Form } from "react-bootstrap";
import ButtonComp from "@/components/components/button";
import Calender from "../calender/page";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadUser = async () => {
    const userItem = await getUserLoggedIn();
    console.log("user item:", userItem);
    setUser(userItem[0]);
    if (!userItem) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const upcomingAppointments = [
    {
      id: 1,
      title: "Client check-in",
      date: "12 Apr",
      time: "10:00 AM",
      location: "Meeting Room 2",
    },
    {
      id: 2,
      title: "Project review",
      date: "13 Apr",
      time: "2:30 PM",
      location: "Zoom",
    },
    {
      id: 3,
      title: "HR onboarding",
      date: "15 Apr",
      time: "11:00 AM",
      location: "Office 4B",
    },
  ];

  return (
    <div className={styles.profilePage}>
      <SideMenu />
      <div className={styles.leftPanel}>
        <div className={styles.profileCard}>
          <div>
            {user ? (
              <>
                <div className={styles.profileContent}>
                  {/* User Avatar Section */}
                  <div className={styles.avatarSection}>
                    <UserAvatar
                      alt="User profile image"
                      user={user}
                      avatarStyle={{ width: 145, height: 145 }}
                    />
                    <br />
                    {/* User Information Section */}
                    <h2 className={styles.name}>
                      {user.firstName} {user.lastName}
                    </h2>

                    <span className={styles.roleBadge}>{user.role}</span>
                  </div>

                  <div className={styles.profileText}>
                    {/* Form displaying user details */}
                    <div className={styles.formContainer}>
                      <form>
                        {/* First Name Field */}
                        <FloatingLabel
                          controlId="floatingInput"
                          label="First Name"
                          className="mb-3"
                        >
                          <Form.Control
                            type="text"
                            value={user.firstName}
                            className={styles.input}
                            readOnly
                          />
                        </FloatingLabel>

                        {/* Last Name Field */}
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Last Name"
                          className="mb-3"
                        >
                          <Form.Control
                            type="text"
                            value={user.lastName}
                            readOnly
                          />
                        </FloatingLabel>

                        {/* Email Field */}
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Email"
                          className="mb-3"
                        >
                          <Form.Control
                            type="text"
                            value={user.email}
                            readOnly
                          />
                        </FloatingLabel>

                        {/* Role Field */}
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Role"
                          className="mb-3"
                        >
                          <Form.Control
                            type="text"
                            value={user.role}
                            readOnly
                          />
                        </FloatingLabel>
                      </form>
                    </div>

                    {/* Action Buttons */}
                    <div className={styles.buttonGroup}>
                      <ButtonComp
                        text="Update profile"
                        style={{
                          width: "auto",
                          color: "#fff",
                          background:
                            "linear-gradient(135deg, #6fc7c2, #a185ff)",
                        }}
                        onClick={() => router.push("/profile/editProfile")}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Loading />
            )}
          </div>
        </div>
        <div className={styles.calendarContainer}>
          <Calender />
        </div>
      </div>
      <div className={styles.rightPanel}>
        <div className={styles.appointmentsCard}>
          <div className={styles.appointmentsHeader}>Upcoming appointments</div>
          <ul className={styles.appointmentsList}>
            {upcomingAppointments.map((appointment) => (
              <li className={styles.appointmentItem} key={appointment.id}>
                <div className={styles.appointmentTitle}>
                  {appointment.title}
                </div>
                <div className={styles.appointmentMeta}>
                  {appointment.date} · {appointment.time}
                </div>
                <div className={styles.appointmentLocation}>
                  {appointment.location}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
