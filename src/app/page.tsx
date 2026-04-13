"use client";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

import "bootstrap/dist/css/bootstrap.min.css";
import ButtonComp from "@/components/components/button";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <div className={styles.overlay}></div>

      <main className={styles.main}>
        <div className={styles.content}>
          {/*Logo */}
          <div className={styles.logoContainer}>
            <img src="/logo3nobg.png" alt="logo" className={styles.logo} />
          </div>
          <br />
          {/*--------- Slogan -------------- */}
          <h4>People management, made effortless.</h4>
          <br />

          <hr className={styles.divider} />

          {/* Feature tiles */}
          <div className={styles.features}>
            <div className={styles.featCard}>
              <span className={styles.featIcon}>🔍</span>
              <p className={styles.featLabel}>Search</p>
              <p className={styles.featDesc}>Find anyone instantly</p>
            </div>
            <div className={styles.featCard}>
              <span className={styles.featIcon}>📋</span>
              <p className={styles.featLabel}>Manage</p>
              <p className={styles.featDesc}>Update employee info</p>
            </div>
            <div className={styles.featCard}>
              <span className={styles.featIcon}>📅</span>
              <p className={styles.featLabel}>Calendar</p>
              <p className={styles.featDesc}>Track events & leave</p>
            </div>
            <div className={styles.featCard}>
              <span className={styles.featIcon}>📢</span>
              <p className={styles.featLabel}>Announcements</p>
              <p className={styles.featDesc}>Stay in the loop</p>
            </div>
          </div>
          <hr className={styles.divider} />

          {/*--------- Login and Sign up buttons -------------- */}

          <div className={styles.buttonsContainer}>
            <button
              className={styles.btnPrimary}
              onClick={() => router.push("/login")}
            >
              Sign In
            </button>
            <button
              className={styles.btnSecondary}
              onClick={() => router.push("/signUp")}
            >
              Create an account
            </button>
          </div>

          <p className={styles.footerText}>Secure · Fast · Built for teams</p>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
