"use client";

import React, { useState, useEffect } from "react";
import { logOut } from "@/firebase/functions/auth";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/contexts/GlobalContext";
import styles from "@/styles/admin/cms.module.css";
import Categories from "@/components/CategoriesCMS";
import Products from "@/components/ProductsCMS";
import { AnimatePresence, motion } from "framer-motion";

export default function CMS() {
  const {
    logged,
    setShowCategories,
    setShowProducts,
    showCategories,
    showProducts,
  } = useGlobal();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [userSelection, setUserSelection] = useState();
  const router = useRouter();

  useEffect(() => {
    if (!logged) {
      router.back();
    }
  }, [logged]);

  const handleHamburgerClick = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleCheckClick = () => {
    setIsChecked((prev) => !prev);
  };

  function exit() {
    logOut();
  }

  return (
    <section className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.nav_container}>
          <svg
            width="279"
            height="190"
            viewBox="0 0 279 190"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.navbar_icon}
          >
            <path
              d="M0.970703 189.701V0.367188H140.064V29.8284H34.6199V77.8911H102.789V106.319H34.6199V162.304H140.064V189.701H0.970703Z"
              fill="var(--text-l)"
            />
            <path
              d="M140.063 189.712V0H200.69C213.84 0 225.444 1.4504 235.5 4.35119C245.749 7.25199 253.775 12.1833 259.576 19.1453C265.571 25.9138 268.569 35.0996 268.569 46.7028C268.569 55.5986 266.248 64.0109 261.607 71.9397C256.966 79.6752 250.487 84.9933 242.171 87.8941V89.0544C252.614 91.3751 261.22 96.3064 267.989 103.848C274.95 111.197 278.431 121.253 278.431 134.017C278.431 146.587 275.241 157.03 268.859 165.345C262.67 173.661 254.065 179.849 243.042 183.91C232.019 187.778 219.545 189.712 205.621 189.712H140.063ZM173.713 78.3215H197.789C210.94 78.3215 220.512 75.9041 226.507 71.0695C232.502 66.2348 235.5 59.7564 235.5 51.6342C235.5 42.3516 232.405 35.7765 226.217 31.9087C220.029 28.041 210.746 26.1072 198.369 26.1072H173.713V78.3215ZM173.713 163.605H202.14C216.064 163.605 226.797 161.091 234.339 156.063C241.881 150.841 245.652 142.913 245.652 132.276C245.652 122.22 241.978 114.968 234.629 110.52C227.281 105.879 216.451 103.558 202.14 103.558H173.713V163.605Z"
              fill="var(--text-l)"
            />
          </svg>

          <div className={styles.nav_menu} onClick={handleHamburgerClick}>
            {isMenuOpen ? (
              <svg
                className={styles.nav_icon}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{
                  fill: "var(--admin-primary-text)",
                }}
              >
                <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
              </svg>
            ) : (
              <svg
                className={styles.nav_icon}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{
                  fill: "var(--admin-primary-text)",
                }}
              >
                <path d="M4 6h16v2H4zm4 5h12v2H8zm5 5h7v2h-7z"></path>
              </svg>
            )}
          </div>

          <AnimatePresence mode="wait">
            {isMenuOpen && (
              <motion.div
                className={styles.dropdown}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                <li className={styles.dropdown_list}>
                  <div
                    className={styles.dropdown_link}
                    onClick={handleCheckClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.dropdown_icon}
                      viewBox="0 0 512 512"
                    >
                      <rect
                        x="48"
                        y="48"
                        width="176"
                        height="176"
                        rx="20"
                        ry="20"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                      />
                      <rect
                        x="288"
                        y="48"
                        width="176"
                        height="176"
                        rx="20"
                        ry="20"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                      />
                      <rect
                        x="48"
                        y="288"
                        width="176"
                        height="176"
                        rx="20"
                        ry="20"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                      />
                      <rect
                        x="288"
                        y="288"
                        width="176"
                        height="176"
                        rx="20"
                        ry="20"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                      />
                    </svg>
                    <span className={styles.dropdown_span}>Contenido</span>
                    <input
                      type="checkbox"
                      className={styles.dropdown_check}
                      readOnly
                      checked={isChecked}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.dropdown_arrow}
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="48"
                        d="M112 184l144 144 144-144"
                      />
                    </svg>
                  </div>

                  <div className={styles.dropdown_content}>
                    <ul className={styles.dropdown_sub}>
                      <li
                        className={styles.dropdown_li}
                        onClick={() => {
                          if (userSelection === "categorias") {
                            setUserSelection(null);
                            setShowCategories(false);
                          } else if (userSelection === "productos") {
                            setShowProducts(false);
                            setUserSelection("categorias");
                            setShowCategories(true);
                            setMenuOpen(false);
                          } else {
                            setShowCategories(true);
                            setUserSelection("categorias");
                            setMenuOpen(false);
                          }
                        }}
                        style={{
                          backgroundColor:
                            userSelection === "categorias"
                              ? "var(--admin-border)"
                              : "",
                        }}
                      >
                        <span className={styles.dropdown_anchor}>
                          Categorías
                        </span>
                      </li>

                      <li
                        className={styles.dropdown_li}
                        onClick={() => {
                          if (userSelection === "productos") {
                            setUserSelection(null);
                            setShowProducts(false);
                          } else if (userSelection === "categorias") {
                            setShowCategories(false);
                            setUserSelection("productos");
                            setShowProducts(true);
                            setMenuOpen(false);
                          } else {
                            setShowProducts(true);
                            setUserSelection("productos");
                            setMenuOpen(false);
                          }
                        }}
                        style={{
                          backgroundColor:
                            userSelection === "productos"
                              ? "var(--admin-border)"
                              : "",
                        }}
                      >
                        <span className={styles.dropdown_anchor}>
                          Productos
                        </span>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className={styles.dropdown_list} onClick={() => exit()}>
                  <div className={styles.dropdown_link}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.dropdown_icon}
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                      />
                    </svg>
                    <span className={styles.dropdown_span}>Cerrar sesión</span>
                  </div>
                </li>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
      <div className={styles.content}>
        {!showCategories && !showProducts && (
          <div className={styles.unselected_wrapper}>
            <div className={styles.unselected}>
              <span>¡Bienvenido!</span>
              <p>
                Este espacio te permite gestionar el contenido de tu sitio web.
                <br />
                Puedes encontrar tus colecciones dentro del menu, en la esquina
                superior derecha de tu pantalla. Elige una de ellas para
                comenzar a editar.
              </p>
              <button type="button" onClick={() => setMenuOpen(true)}>
                Ver menu
              </button>
            </div>
          </div>
        )}
        {showCategories && <Categories />}
        {showProducts && <Products />}
      </div>
    </section>
  );
}
