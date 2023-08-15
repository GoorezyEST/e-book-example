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

  const backgroundImage = "https://i.imgur.com/cY55hCJ.jpg";

  return (
    <section className={styles.container}>
      <Navbar />
      <FloatingCart />
      <div className={styles.hero}>
        <div className={styles.hero_content}>
          <h1>
            Productos de calidad a <span> un buen precio</span>.
          </h1>
          <p>
            Aqui podrás encontrar diversos productos de limpieza precio calidad
            para el cuidado de tu hogar, no dudes y comienza a ver nuestros
            productos.
          </p>
          <Link href="/productos">Ver productos</Link>
        </div>

        <div
          className={styles.hero_decorative}
          ref={loadingDiv}
          style={{
            backgroundImage: `url(${resizeImgurImages(backgroundImage)})`,
          }}
        >
          <img
            src={backgroundImage}
            alt="Example image"
            className={imgLoading ? "loading" : "loaded"}
          />
        </div>
      </div>
      <Footer />
    </section>
  );
}
