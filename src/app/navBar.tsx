"use client";

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { XCircle } from "@deemlol/next-icons";
import styles from "./navBar.module.css";
import toast from "react-hot-toast";

import { logout } from "../../firebase/employeeService";
import { useRouter } from "next/navigation";

function NavBar({ onSearch, searchValue, clear }) {
  const router = useRouter();

  /*------------------------------- Handle Logout ------------------------*/
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("User is logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Unable to logout");
    }
  };

  return (
    <div>
      <nav className={styles.navBar}>
        {/* Header */}
        <div></div>

        {/*---------------- Search Bar -------------------- */}

        <div>
          <Form className={styles.form}>
            <Form.Control
              value={searchValue}
              type="text"
              placeholder="Search..."
              onChange={onSearch}
              className={styles.searchBar}
            />
            {searchValue ? (
              <button type="button" className={styles.searchx} onClick={clear}>
                <XCircle size={20} color="#090909ff" />
              </button>
            ) : (
              ""
            )}
          </Form>
        </div>

        {/*---------------- Buttons Container -------------------- */}

        <div className={styles.buttonsContainer}>
          {/*---------------- Light / Dark Mode -------------------- 
                    <Button className={styles.button}><Sun size={20} color="#FFF" /> / <Moon size={20} color="#FFF"/></Button>*/}

          {/*---------------- Menu Button -------------------- 
                    <ButtonComp text={<Menu size={20} color="#FFF" />} style={{width: "auto"}}onClick={null}/><br />*/}

          <button className={styles.logout} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
