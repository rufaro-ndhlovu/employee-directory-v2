"use client";

import React, { useState } from "react";
import Styles from "./sideMenu.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideMenu() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Overlay — closes menu when tapping outside */}
      {menuOpen && (
        <div className={Styles.overlay} onClick={() => setMenuOpen(false)} />
      )}

      {/* Side menu — slides in on mobile, always visible on desktop */}
      <div className={Styles.sideMenucontainer}>
        {/*Logo */}
        <div className={Styles.topBar}>
          <img src="/logo3nobg.png" className={Styles.logo} />

          {/* Hamburger button — only visible on mobile */}
          <button
            className={Styles.hamburger}
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
          >
            <img src="/icons8-menu-24.png" className={Styles.menu} />
          </button>
        </div>

        <ul
          className={`${Styles.listContainer} ${menuOpen ? Styles.open : Styles.closed}`}
        >
          <li>
            <Link
              className={`${Styles.menuLink} ${pathname == "/employeeInfo" ? Styles.listItem : ""}`}
              href="/employeeInfo"
              onClick={() => setMenuOpen(false)}
            >
              <img src="/icons8-home-24.png" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className={`${Styles.menuLink} ${pathname == "/profile" ? Styles.listItem : ""}`}
              href="/profile"
              onClick={() => setMenuOpen(false)}
            >
              <img src="/icons8-profile-24.png" />
              Profile
            </Link>
          </li>
          <li>
            <Link
              className={`${Styles.menuLink} ${pathname === "/calender" ? Styles.listItem : ""}`}
              href="/calender"
              onClick={() => setMenuOpen(false)}
            >
              <img src="/icons8-date-24.png" />
              Calender
            </Link>
          </li>
          <li>
            <Link
              className={`${Styles.menuLink} ${pathname === "/documents" ? Styles.listItem : ""}`}
              href="/documents"
              onClick={() => setMenuOpen(false)}
            >
              <img src="/icons8-document-24.png" />
              Announcements
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
