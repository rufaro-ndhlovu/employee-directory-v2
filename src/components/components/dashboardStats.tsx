"use client";

import React from "react";
import Styles from "./dashboardStats.module.css";
import Image from "next/image";

export default function DashboardStats() {
  return (
    <div className={Styles.dashContainer}>
      <div className={Styles.employees}>
        <Image
          alt="Employees icon"
          src="/icons8-employees-48.png"
          className={Styles.logo}
          width={60}
          height={48}
        />
        <div>
          <h3>7</h3>
          <p>Employees</p>
        </div>
      </div>
      <div className={Styles.departments}>
        <Image
          alt="Departments icon"
          src="/icons8-department-48.png"
          className={Styles.logo}
          width={60}
          height={48}
        />
        <div>
          <h3>7</h3>
          <p>Departments</p>
        </div>
      </div>
      <div className={Styles.locations}>
        <Image
          alt="Locations icon"
          src="/icons8-location-48.png"
          className={Styles.logo}
          width={60}
          height={48}
        />
        <div>
          <h3>9</h3>
          <p>Locations</p>
        </div>
      </div>
    </div>
  );
}
