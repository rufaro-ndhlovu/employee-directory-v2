import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  and,
  or,
  orderBy,
} from "firebase/firestore";

import { app, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

/*-------------------- CollectionReferences ----------------------- */

const employeesRef = collection(db, "employees");
const usersRef = collection(db, "users");
const eventsRef = collection(db, "events");
const announcementsRef = collection(db, "announcements");

let auth;
const getAuthClient = () => {
  if (typeof window === "undefined") {
    throw new Error("Auth functions must be called in the browser environment");
  }
  if (!auth) auth = getAuth(app);
  return auth;
};

/*-------------------- Get all employees ----------------------- */

export const getEmployees = async () => {
  const q = query(employeesRef, orderBy("firstName"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/*-------------------- Add Employee ----------------------- */
export const addEmployees = async (employeeData) => {
  const docRef = await addDoc(employeesRef, employeeData);
  return docRef;
};

/*-------------------- Delete Employee ----------------------- */
export const deleteEmployees = async (id) => {
  const emptyDoc = doc(db, "employees", id);
  return await deleteDoc(emptyDoc);
};

/*-------------------- Update Employee ----------------------- */
export const updateEmployee = async (id, updatedData) => {
  const editDoc = doc(db, "employees", id);
  return await updateDoc(editDoc, updatedData);
};

/*-------------------- Filter by country results ----------------------- */
export const findByCountry = async (location, department) => {
  let q;
  let locationQuery = query(employeesRef, where("location", "==", location));
  let departmentQuery = query(
    employeesRef,
    where("department", "==", department)
  );
  let landDQuery = query(
    employeesRef,
    and(
      where("location", "==", location),
      where("department", "==", department)
    )
  );

  if (location && department) {
    q = landDQuery;
  } else if (location && department == "") {
    q = locationQuery;
  } else if (department && location == "") {
    q = departmentQuery;
  } else {
    q = employeesRef;
  }

  const qResponse = await getDocs(q);
  const result = [];

  qResponse.docs.forEach((country) => {
    result.push({
      id: country.id,
      ...country.data(),
    });
  });
  const sortedResult = result.sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
  );

  return sortedResult;
};

/*-------------------- Search query results ----------------------- */

export const searchQuery = async (queryInput) => {
  let searchQ = query(
    employeesRef,
    or(
      where("firstName", "==", queryInput),
      where("lastName", "==", queryInput),
      where("email", "==", queryInput),
      where("location", "==", queryInput),
      where("department", "==", queryInput)
    )
  );

  const queryResponse = await getDocs(searchQ);
  const results = [];

  queryResponse.docs.forEach((q) => {
    results.push({
      id: q.id,
      ...q.data(),
    });
  });

  return results;
};

/*-------------------- Sign Up ----------------------- */
export const signUp = async (email, password) => {
  const a = getAuthClient();
  return await createUserWithEmailAndPassword(a, email, password);
};

/*-------------------- Login ----------------------- */
export const login = async (email, password) => {
  const a = getAuthClient();
  return await signInWithEmailAndPassword(a, email, password);
};

/*------------------------------- Handle Logout ------------------------*/

export const logout = async () => {
  const a = getAuthClient();
  return await signOut(a);
};

/*------------------------------- Forgot Password ------------------------*/

export const forgotPassword = async (email) => {
  try {
    const a = getAuthClient();
    await sendPasswordResetEmail(a, email);
    return { success: true, message: "Password reset link sent successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

/*-------------------- Get Logged In user data ----------------------- */

export const getUserUid = () => {
  return new Promise((resolve) => {
    const a = getAuthClient();
    onAuthStateChanged(a, (user) => {
      if (user) {
        resolve(user.uid);
      } else {
        resolve(null);
      }
    });
  });
};

export const getUserLoggedIn = async () => {
  const userid = await getUserUid();
  console.log("user id new:", userid);

  const q = query(usersRef, where("uid", "==", userid));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/*-------------------- Get all events ----------------------- */

export const getEvents = async () => {
  const q = query(eventsRef);

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/*-------------------- Add Events ----------------------- */
export const addEvent = async (eventsData) => {
  const docRef = await addDoc(eventsRef, eventsData);
  return docRef;
};

/*-------------------- Update event ----------------------- */
export const updateEvent = async (id, updatedData) => {
  const editDoc = doc(db, "events", id);
  return await updateDoc(editDoc, updatedData);
};

/*-------------------- Delete Event ----------------------- */
export const deleteEvent = async (id) => {
  const emptyDoc = doc(db, "events", id);
  return await deleteDoc(emptyDoc);
};

/*-------------------- Get all posts ----------------------- */

export const getPosts = async () => {
  const q = query(announcementsRef, orderBy("date", "desc"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/*-------------------- Add Posts ----------------------- */
export const addPost = async (postData) => {
  const docRef = await addDoc(announcementsRef, postData);
  return docRef;
};

/*-------------------- Update post ----------------------- */
export const updatePost = async (id, updatedData) => {
  const editDoc = doc(db, "announcements", id);
  return await updateDoc(editDoc, updatedData);
};

/*-------------------- Delete Post ----------------------- */
export const deletePost = async (id) => {
  const emptyDoc = doc(db, "announcements", id);
  return await deleteDoc(emptyDoc);
};
