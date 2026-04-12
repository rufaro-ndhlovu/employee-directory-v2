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
          <div className={styles.image}>
            <img src="/logo3nobg.png" alt="logo" width={420} height={150} />
          </div>
          <br />
          {/*--------- Slogan -------------- */}
          <h4>People management, made effortless.</h4>
          <br />

          {/*--------- Login and Sign up buttons -------------- */}
          <div className={styles.buttonsContainer}>
            <ButtonComp
              text="Sign In"
              onClick={() => router.push("/login")}
              style={{
                width: "12rem",
                height: "3rem",
                color: "#fff",
                background: "linear-gradient(135deg, #6fc7c2, #a185ff)",
              }}
            />
            <ButtonComp
              text="Sign Up"
              onClick={() => router.push("/signUp")}
              style={{
                width: "12rem",
                height: "3rem",
                color: "#fff",
                background: "linear-gradient(135deg, #6fc7c2, #a185ff)",
              }}
            />
          </div>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
