"use client";

import React, { useState, useEffect } from "react";
import AddUserForm from "@/components/components/addUserForm";
import EditUserForm from "@/components/components/editUserForm";
import DeleteUser from "@/components/components/deleteUserForm";
import NavBar from "../navBar";
import SideFilter from "@/components/components/sideFilter";
import {
  getEmployees,
  addEmployees,
  findByCountry,
  searchQuery,
  getUserLoggedIn,
} from "../../../firebase/employeeService";
import DashboardStats from "@/components/components/dashboardStats";

import Styles from "./page.module.css";
import { Edit3 } from "@deemlol/next-icons";
import { Trash2 } from "@deemlol/next-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { isAdmin, useUserRole } from "@/hooks/useUserRole";
import Loading from "@/components/components/loading";
import ButtonComp from "@/components/components/button";
import SideMenu from "@/components/components/sideMenu";

const EmployeeTable = ({
  data,
  isUserAdmin,
  setSelectedEmployee,
  setShowEditUserForm,
  setShowDeleteUser,
}: {
  data: any;
  isUserAdmin: boolean;
  setSelectedEmployee: any;
  setShowEditUserForm: any;
  setShowDeleteUser: any;
}) => (
  <div className={Styles.tableContainer}>
    <table className={Styles.table}>
      <thead className={Styles.tableHead}>
        <tr>
          <th className={Styles.personId}>Employee ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Location</th>
          <th>Department</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((person, index) => (
          <tr key={person.employeeId}>
            <td className={Styles.personId}>{person.employeeId}</td>
            <td>{person.firstName}</td>
            <td>{person.lastName}</td>
            <td>{person.email}</td>
            <td>{person.location}</td>
            <td>{person.department}</td>
            {isUserAdmin ? (
              <td>
                <div className={Styles.buttonContainer}>
                  <ButtonComp
                    text={<Edit3 size={20} color="#FFFFFF" />}
                    onClick={() => {
                      setSelectedEmployee(person);
                      setShowEditUserForm(true);
                    }}
                    style={{
                      height: "2.2rem",
                      background: "linear-gradient(135deg, #6fc7c2, #a185ff)",
                    }}
                  />
                  <button
                    className={Styles.deleteButton}
                    onClick={() => {
                      setSelectedEmployee(person);
                      setShowDeleteUser(true);
                    }}
                  >
                    <Trash2 size={20} color="#FFFFFF" />
                  </button>
                </div>
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function EmployeeInfo() {
  const { userRole } = useUserRole();
  const isUserAdmin = isAdmin(userRole);

  //console.log(isUserAdmin);

  const [personnel, setPersonnel] = useState([
    {
      employeeId: "",
      firstName: "",
      lastName: "",
      email: "",
      location: "",
      department: "",
    },
  ]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filteredLocations, setFilteredLocation] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);

  const [employeeInfoLoading, setEmployeeInfoLoading] = useState(true);

  /* ------------- Get Employee info using a firebase query -------------- */
  async function loadEmployees() {
    const data = await getEmployees();
    setPersonnel(data);
    setEmployeeInfoLoading(false);
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  /* ------------- Get User info using a firebase query -------------- */

  const loadUser = async () => {
    const userItem = await getUserLoggedIn();
    setUser(userItem[0]);
  };

  useEffect(() => {
    loadUser();
  }, []);

  /*------------------------- Handle Add User Function ----------------------------------*/
  const handleAddUser = async (newUser: any) => {
    //setPersonnel([...personnel, newUser]);
    await addEmployees(newUser);
    loadEmployees();
  };

  /*------------------------- Handle Filter Function ----------------------------------*/
  const handleCountryChange = async (country: any, department: any) => {
    setIsFiltering(true);
    setIsSearching(false);
    const countries = await findByCountry(country, department);
    setFilteredLocation(countries);
    if (!country && !department) {
      setIsFiltering(false);
      setIsSearching(false);
      await loadEmployees();
      return;
    }
    console.log(countries);
    return countries;
  };

  /*------------------------- Handle Search Function ----------------------------------*/
  const handleSearch = async (e: any) => {
    e.target.value;
    let value = e.target.value;
    setSearch(value);
    const searchRes = await searchQuery(value);
    const allEmployees = await getEmployees();
    setIsFiltering(false);
    setIsSearching(true);

    console.log(searchRes);
    if (isSearching && value === "") {
      setSearchResults(searchRes);
      setIsSearching(false);
      setIsFiltering(false);
      return allEmployees;
    } else {
      setSearchResults(searchRes);
      return searchRes;
    }
  };

  /* ------------ Clear search -------------- */

  const clearSearch = async () => {
    setSearch("");
    setIsFiltering(false);
    setIsSearching(false);
    setSearchResults([]);
    await loadEmployees();
  };

  /*------------------------- Table Data ----------------------------------*/

  const content = () => {
    let dataToRender = [];

    if (employeeInfoLoading) {
      return <Loading />;
    }

    if (isFiltering && filteredLocations.length > 0) {
      dataToRender = filteredLocations;
    } else if (isSearching && searchResults.length > 0) {
      dataToRender = searchResults;
    } else {
      dataToRender = personnel;
    }

    if (
      (isFiltering && filteredLocations.length === 0) ||
      (isSearching && searchResults.length === 0)
    ) {
      return (
        <div className={Styles.noresults}>
          <h3>No results found</h3>
        </div>
      );
    }

    return (
      <EmployeeTable
        data={dataToRender}
        isUserAdmin={isUserAdmin}
        setSelectedEmployee={setSelectedEmployee}
        setShowEditUserForm={setShowEditUserForm}
        setShowDeleteUser={setShowDeleteUser}
      />
    );
  };

  return (
    <div>
      {/*------------------------- Add User Form ----------------------------------*/}
      <AddUserForm
        onAddUser={handleAddUser}
        show={showAddUserForm}
        onHide={() => setShowAddUserForm(false)}
      />

      {/*------------------------- Edit User Form ----------------------------------*/}
      <EditUserForm
        show={showEditUserForm}
        employee={selectedEmployee}
        onAddUser={loadEmployees}
        onHide={() => setShowEditUserForm(false)}
      />

      {/*------------------------- Delete User Form ----------------------------------*/}
      <DeleteUser
        show={showDeleteUser}
        onHide={() => setShowDeleteUser(false)}
        employee={selectedEmployee}
        onDeleted={loadEmployees}
      />

      <div className={Styles.contentContainer}>
        <SideMenu />

        <div className={Styles.main}>
          <h3>Welcome back, {user && <>{user.firstName} 👋</>}</h3>
          <div className={Styles.sideMainContent}>
            <div className={Styles.contentandfilter}>
              <div className={Styles.headerContainer}>
                {/*------------------------- NavBar component ----------------------------------*/}
                <NavBar
                  onSearch={handleSearch}
                  searchValue={search}
                  clear={clearSearch}
                />
              </div>

              <DashboardStats />

              {/* Side Filter */}
              <div className={Styles.filter}>
                <SideFilter onCountryChange={handleCountryChange} />

                {
                  /*------------------------- Add Employee Button - Visible only when admin login ----------------------------------*/
                  isUserAdmin ? (
                    <ButtonComp
                      text="Add New Employee"
                      onClick={() => setShowAddUserForm(true)}
                      style={{
                        width: "auto",
                        background: "linear-gradient(135deg, #6fc7c2, #a185ff)",
                        color: "#fff",
                      }}
                    />
                  ) : null
                }
              </div>
              {/*------------------------- Employee Table ----------------------------------*/}

              {content()}
            </div>
          </div>
        </div>
        {/*main div end*/}
      </div>
    </div>
  );
}
