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

  return (
    <section className={styles.container}>
      <Navbar />
      <FloatingCart />
      <div className={styles.hero}>
        <div className={styles.hero_content}>
          <h1>
            Tus experiencia gaming en <span>otro nivel</span>.
          </h1>
          <p>
            Ofrecemos una amplia gama de productos gaming de primer nivel, para
            brindar confort y performance a tu pasión
          </p>

          <Link href="/productos">Ver productos</Link>
        </div>
      </div>
      <Footer />
    </section>
  );
}
