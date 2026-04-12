"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PostsForm from "@/components/postsForm";
import { getPosts } from "../../../firebase/employeeService";
import SideMenu from "@/components/components/sideMenu";
import { getUserLoggedIn } from "../../../firebase/employeeService";
import ButtonComp from "@/components/components/button";

const formatUKDateTime = (value: any) => {
  if (!value) return "";

  let date: Date;
  if (typeof value === "object" && value?.toDate) {
    date = value.toDate();
  } else if (typeof value === "object" && value?.seconds) {
    date = new Date(value.seconds * 1000);
  } else {
    date = new Date(value);
  }

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

export default function Announcements() { 
  // State to hold the list of posts
  const [posts, setPosts] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [reactions, setReactions] = useState<Record<string, { likes: number; dislikes: number }>>({});

  const handleReaction = (postId: string, type: "likes" | "dislikes") => {
    setReactions((prev) => ({
      ...prev,
      [postId]: {
        likes: type === "likes" ? (prev[postId]?.likes ?? 0) + 1 : prev[postId]?.likes ?? 0,
        dislikes: type === "dislikes" ? (prev[postId]?.dislikes ?? 0) + 1 : prev[postId]?.dislikes ?? 0,
      },
    }));
  };

  const getReactionCount = (postId: string, type: "likes" | "dislikes") => reactions[postId]?.[type] ?? 0;

  // Function to load the currently logged-in user
  const loadUser = async () => {
    const userItem = await getUserLoggedIn();
    console.log("user item:", userItem);
    setUser(userItem[0]);
  };

  // Function to fetch posts from the database and update the state
    const fetchPosts = async () => {
        try {
            // Fetch posts data from the database
            const postsData = await getPosts();
            setPosts(postsData);
            setReactions(
              postsData.reduce((acc: Record<string, { likes: number; dislikes: number }>, post: any) => {
                acc[post.id] = {
                  likes: post.likes ?? 0,
                  dislikes: post.dislikes ?? 0,
                };
                return acc;
              }, {})
            );
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    // Fetch posts when the component mounts
    useEffect(() => {
      fetchPosts();
    }, []);

    useEffect(() => {
      loadUser();
    }, [])

  return (
    <div className={styles.announcementsPage}>
      <SideMenu />

      <main className={styles.announcementsContent}>
        <section className={styles.pageHeader}>
          <div>
            <h1>Announcements</h1>
            <p className={styles.subtitle}>
              Company news, updates, and reminders are shared here for the whole team.
            </p>
          </div>

          <div className={styles.badge}>{posts.length} announcement{posts.length === 1 ? "" : "s"}</div>
        </section>

        <section className={styles.formSection}>
          <PostsForm fetchPosts={fetchPosts} user={user} />
        </section>

        <section className={styles.postsSection}>
          {posts.length > 0 ? (
            <div className={styles.posts}>
              {posts.map((post) => (
                <article key={post.id} className={styles.post}>
                  <div className={styles.postHeader}>
                    <div>
                      <p className={styles.postMeta}>Posted by {post.userFullName}</p>
                      <h3 className={styles.postTitle}>{post.postTitle}</h3>
                    </div>
                    <div className={styles.postHeaderActions}>
                      <span className={styles.postDate}>{formatUKDateTime(post.date)}</span>
                      <ButtonComp
                        text="Edit"
                        style={{
                          width: "auto",
                          color: "#fff",
                          background: "linear-gradient(135deg, #6fc7c2, #a185ff)",
                        }}
                        onClick={() => {}}
                      />
                    </div>
                  </div>

                  <p className={styles.postDescription}>{post.postDescription || "No details available for this announcement."}</p>

                  <div className={styles.postActions}>
                    <div className={styles.reactionGroup}>
                      <ButtonComp
                        text={`Like (${getReactionCount(post.id, "likes")})`}
                        style={{
                          width: "auto",
                          color: "#fff",
                          background: "linear-gradient(135deg, #6fc7c2, #a185ff)",
                        }}
                        onClick={() => handleReaction(post.id, "likes")}
                      />
                      <ButtonComp
                        text={`Dislike (${getReactionCount(post.id, "dislikes")})`}
                        style={{
                          width: "auto",
                          color: "#fff",
                          background: "linear-gradient(135deg, #ff7a7a, #ff4e4e)",
                        }}
                        onClick={() => handleReaction(post.id, "dislikes")}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              No announcements yet. Use the form above to share news with the team.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
