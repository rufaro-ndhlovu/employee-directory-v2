"use client";

import React, { useState } from "react";
import Styles from "./sideMenu.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideMenu() {
  const pathname = usePathname();

  return (
    <div className={Styles.sideMenucontainer}>
      {/*Logo */}

      <img src="/logo3nobg.png" className={Styles.logo} />

      <ul className={Styles.listContainer}>
        <li>
          <Link
            className={`${Styles.menuLink} ${pathname == "/employeeInfo" ? Styles.listItem : ""}`}
            href="/employeeInfo"
          >
            <img src="/icons8-home-24.png" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            className={`${Styles.menuLink} ${pathname == "/profile" ? Styles.listItem : ""}`}
            href="/profile"
          >
            <img src="/icons8-profile-24.png" />
            Profile
          </Link>
        </li>
        {/*<li>
          <Link
            className={`${Styles.menuLink} ${pathname === "/calender" ? Styles.listItem : ""}`}
            href="/calender"
          >
            <img src="/icons8-date-24.png" />
            Calender
          </Link>
        </li>*/}
        <li>
          <Link
            className={`${Styles.menuLink} ${pathname === "/documents" ? Styles.listItem : ""}`}
            href="/documents"
          >
            <img src="/icons8-document-24.png" />
            Announcements
          </Link>
        </li>
      </ul>
    </div>
  );
}
