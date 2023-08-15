import React from "react";
import styles from "@/styles/modules/footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <div className={styles.footer_wrapper}>
      <div className={styles.logo}>
        <svg
          width="279"
          height="190"
          viewBox="0 0 279 190"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
      </div>
      <div className={styles.nav}>
        <Link href="/">Inicio</Link>
        <Link href="/nosotros">Nosotros</Link>
        <Link href="/productos">Productos</Link>
        <Link href="/carrito">Carrito</Link>
      </div>
      <hr />
      <div className={styles.copy}>
        <span>La esquina de la limpieza &copy; 2023.</span>
        <span>Todos los derechos reservados.</span>
      </div>
    </div>
  );
}
