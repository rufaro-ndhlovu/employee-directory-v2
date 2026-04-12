"use client";

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import locations from "@/Data/locationData";
import departments from "@/Data/departmentsData";
import toast from "react-hot-toast";
import ButtonComp from "./button";

import styles from "./sideFilter.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

function SideFilter({ onCountryChange }: any) {
  const [location, setLocation] = useState(locations);
  const [department, setDepartments] = useState(departments);

  const [locationFilter, setlocationFilter] = useState("");
  const [departmentFilter, setdepartmentFilter] = useState("");

  /* Location Change Function */

  const handleLocationChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    const locationValue = e.target.value;
    try {
      toast.success("Location successfully selected");
      setlocationFilter(locationValue);
      await onCountryChange(locationValue, departmentFilter);
    } catch (error) {
      toast.error("Error selecting location");
    }
  };

  /* Department Change Function */

  const handleDepartmentChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    const departmentValue = e.target.value;
    try {
      toast.success("Department selected successfully");
      setdepartmentFilter(departmentValue);
      await onCountryChange(locationFilter, departmentValue);
    } catch (error) {
      toast.error("Error selecting department");
    }
  };

  /* Clear Filter Function */
  const clearFilter = () => {
    /*Location Dropdown */
    let loc = document.getElementById("locDrop") as HTMLSelectElement | null;
    if (loc && loc.value !== "") {
      loc.value = "";
    }

    /*Department Dropdown */
    let dep = document.getElementById("depDrop") as HTMLSelectElement | null;
    if (dep && dep.value !== "") {
      dep.value = "";
    }
    onCountryChange("", "");
  };

  return (
    <div className={styles.dropdown}>
      {/* Locations Filter */}

      <Form.Select
        aria-label="Default select example"
        onChange={handleLocationChange}
        id="locDrop"
      >
        <option value="">Select Location</option>
        {location.map((loc, index) => (
          <option key={loc.id} value={loc.name} className={styles.tableData}>
            {loc.name}
          </option>
        ))}
      </Form.Select>

      {/* Departments Filter */}

      <Form.Select
        aria-label="Default select example"
        onChange={handleDepartmentChange}
        id="depDrop"
      >
        <option value="">Select Department</option>
        {department.map((dep, index) => (
          <option key={dep.id} value={dep.name} className={styles.tableData}>
            {dep.name}
          </option>
        ))}
      </Form.Select>

      {/* Clear Filter button */}

      <ButtonComp
        text="Clear"
        style={{
            width: "auto",
            background: "linear-gradient(135deg, #6fc7c2, #a185ff)",
            color: "#fff",
        }}
        onClick={clearFilter}
      />
    </div>
  );
}

export default SideFilter;
