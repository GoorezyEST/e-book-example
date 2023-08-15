"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/modules/home.module.css";
import Navbar from "@/components/Navbar";
import { useGlobal } from "@/contexts/GlobalContext";
import Link from "next/link";
import Footer from "@/components/Footer";
import { resizeImgurImages } from "@/functions/functions";
import FloatingCart from "@/components/FloatingCart";

export default function Home() {
  const { setIsHydrated } = useGlobal();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const loadingDiv = useRef(null);
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    const img = loadingDiv.current.querySelector("img");

    function loaded() {
      setImgLoading(false);
    }

    if (img.complete) {
      loaded();
    } else {
      img.addEventListener("load", loaded);
    }
  }, []);

  const backgroundImage = "https://i.imgur.com/U9oCVpW.jpg";

  return (
    <section className={styles.container}>
      <Navbar />
      <FloatingCart />
      <div className={styles.hero}>
        <div
          className={styles.hero_content}
          style={{
            backgroundColor: imgLoading ? "" : "#32383c30",
            backdropFilter: imgLoading ? "" : "blur(4px)",
          }}
        >
          <h1>
            Tus experiencia gaming en <span>otro nivel</span>.
          </h1>
          <p>
            Ofrecemos una amplia gama de productos gaming de primer nivel, para
            brindar confort y performance a tu pasión
          </p>

          <Link href="/productos">Ver productos</Link>
        </div>
        <div className={styles.hero_decorative} ref={loadingDiv}>
          <img
            src={backgroundImage}
            alt="Example image"
            className={imgLoading ? "loading" : "loaded"}
          />
          ;
        </div>
      </div>
      <Footer />
    </section>
  );
}
