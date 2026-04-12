"use client";

import React, { useState } from "react";
import styles from "./postsForm.module.css";
import { FloatingLabel, Form } from "react-bootstrap";
import ButtonComp from "@/components/components/button";
import { addPost } from "../../firebase/employeeService";

const PostsForm = ({
  fetchPosts,
  user,
}: {
  fetchPosts: () => void;
  user: any;
}) => {
  // State for announcement title and description
  const [announcement, setAnnouncement] = useState("");
  const [description, setDescription] = useState("");

  // Post data object to be sent to the database
  const postData = {
    postTitle: announcement,
    postDescription: description,
    date: new Date().toISOString(),
    userFullName: user?.firstName + " " + user?.lastName || "Anonymous User",
  };

  // Handle form submission to post an announcement with Firestore integration
  const handlePostAnnouncement = async (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      await addPost(postData);
      setAnnouncement("");
      setDescription("");
      fetchPosts(); // Refresh the posts list after adding a new post
    } catch (error) {
      console.error("Error posting announcement:", error);
    }
  };

  return (
    <div>
      {/* Announcement Form Section */}

      <div>
        <form onSubmit={handlePostAnnouncement}>
          {/* Announcement Title */}
          <FloatingLabel
            controlId="floatingAnnouncementTitle"
            label="Announcement Title"
            className="mb-3"
          >
            <Form.Control
              type="text"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
            />
          </FloatingLabel>

          {/* Annuncement Description */}
          <FloatingLabel
            controlId="floatingTextarea2"
            label="Announcement Description"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FloatingLabel>

          {/* Annuncement Button */}
          <ButtonComp
            text="Post Announcement"
            style={{
              width: "auto",
              color: "#fff",
              background: "linear-gradient(135deg, #6fc7c2, #a185ff)",
            }}
            onClick={handlePostAnnouncement}
          />
        </form>
      </div>
    </div>
  );
};

export default PostsForm;
