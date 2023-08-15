"use client";

import Navbar from "@/components/Navbar";
import React from "react";
import styles from "@/styles/modules/nosotros.module.css";
import Link from "next/link";
import Footer from "@/components/Footer";
import FloatingCart from "@/components/FloatingCart";

export default function Nosotros() {
  return (
    <section className={styles.container}>
      <Navbar />
      <FloatingCart />
      <div
        className={`${styles.content} ${styles.first_content}`}
        style={{ paddingBottom: "0px" }}
      >
        <div className={styles.us}>
          <h1>¿Qué somos?</h1>
          <p>
            Nuestra tienda cuenta con una diversidad de productos, incluyendo
            detergentes, desinfectantes, suavizantes, accesorios y mucho más.
            Además, regularmente ofrecemos promociones especiales y descuentos
            exclusivos para nuestros clientes, permitiéndoles acceder a una
            limpieza efectiva a un precio económico.
          </p>
        </div>
        <div className={styles.contact}>
          <h2>Contactanos</h2>
          <ul>
            <li>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M391 480c-19.52 0-46.94-7.06-88-30-49.93-28-88.55-53.85-138.21-103.38C116.91 298.77 93.61 267.79 61 208.45c-36.84-67-30.56-102.12-23.54-117.13C45.82 73.38 58.16 62.65 74.11 52a176.3 176.3 0 0128.64-15.2c1-.43 1.93-.84 2.76-1.21 4.95-2.23 12.45-5.6 21.95-2 6.34 2.38 12 7.25 20.86 16 18.17 17.92 43 57.83 52.16 77.43 6.15 13.21 10.22 21.93 10.23 31.71 0 11.45-5.76 20.28-12.75 29.81-1.31 1.79-2.61 3.5-3.87 5.16-7.61 10-9.28 12.89-8.18 18.05 2.23 10.37 18.86 41.24 46.19 68.51s57.31 42.85 67.72 45.07c5.38 1.15 8.33-.59 18.65-8.47 1.48-1.13 3-2.3 4.59-3.47 10.66-7.93 19.08-13.54 30.26-13.54h.06c9.73 0 18.06 4.22 31.86 11.18 18 9.08 59.11 33.59 77.14 51.78 8.77 8.84 13.66 14.48 16.05 20.81 3.6 9.53.21 17-2 22-.37.83-.78 1.74-1.21 2.75a176.49 176.49 0 01-15.29 28.58c-10.63 15.9-21.4 28.21-39.38 36.58A67.42 67.42 0 01391 480z" />
                </svg>
              </span>
              <p>223 222 22222</p>
            </li>
            <li>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M480 257.35c0-123.7-100.3-224-224-224s-224 100.3-224 224c0 111.8 81.9 204.47 189 221.29V322.12h-56.89v-64.77H221V208c0-56.13 33.45-87.16 84.61-87.16 24.51 0 50.15 4.38 50.15 4.38v55.13H327.5c-27.81 0-36.51 17.26-36.51 35v42h62.12l-9.92 64.77H291v156.54c107.1-16.81 189-109.48 189-221.31z"
                    fillRule="evenodd"
                  />
                </svg>
              </span>
              <Link href="https://www.instagram.com" target="_blank">
                Facebook
              </Link>
            </li>
            <li>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M255.46 48.74c-114.84 0-208 93.11-208 208s93.12 208 208 208 208-93.12 208-208-93.15-208-208-208zM380.28 252c-2.85 32.63-16.79 49.7-28 58.26S327.61 322.58 316 320.5a41.61 41.61 0 01-26.82-17.19 62.06 62.06 0 01-44 17.57 51.66 51.66 0 01-38.55-16.83c-11.38-12.42-17-30.36-15.32-49.23 3-35 30.91-57.39 56.87-61.48 27.2-4.29 52.23 6.54 62.9 19.46l3.85 4.66-6.34 50.38c-1.19 14.34 3.28 23.48 12.29 25.1 2.39.42 8.1-.13 14.37-4.93 6.72-5.15 15.14-16 17.1-38.47 2.35-26.54-4.35-49.19-19.25-65.49-15.49-16.9-39.09-25.84-68.23-25.84-54 0-101.81 44.43-106.58 99-2.28 26.2 5.67 50.68 22.4 68.93 16.36 17.86 39.31 27.74 64.66 27.74 19 0 30.61-2.05 49.48-8.78a14 14 0 019.4 26.38c-21.82 7.77-36.68 10.4-58.88 10.4-33.28 0-63.57-13.06-85.3-36.77C138 321 127.42 288.94 130.4 254.82c2.91-33.33 18.45-64.63 43.77-88.12s57.57-36.49 90.7-36.49c37.2 0 67.93 12.08 88.87 34.93 20.09 21.91 29.51 52.75 26.54 86.86z" />
                  <path d="M252.57 221c-14.83 2.33-31.56 15.84-33.34 36.26-1 11.06 2 21.22 8.07 27.87a23.65 23.65 0 0017.91 7.75c20.31 0 34.73-14.94 36.75-38.06a14 14 0 01.34-2.07l3.2-25.45a49.61 49.61 0 00-32.93-6.3z" />
                </svg>
              </span>
              <p>unemail@gmail.com</p>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.help}>
          <h3>¿Cómo funciona?</h3>
          <p>
            Una vez que envíes tus datos, recibirás un correo electrónico de
            confirmación en tu casilla de correo electrónico, validando así tu
            reserva.
          </p>
          <p>
            Nos pondremos en contacto contigo para finalizar los detalles. Una
            vez que tu pedido esté listo para su entrega, coordinaremos contigo
            un horario de retiro a través de correo electrónico o teléfono
            celular.
          </p>
          <Link href="/productos">Ver productos</Link>
        </div>
        <div className={styles.map}>
          <h4>¿Dónde estámos?</h4>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1635.3440858636868!2d-57.93345607643381!3d-34.939356714505536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e8b94fad9b05%3A0xc2136c1278dc8454!2sCalle%2014%20%26%20C.%2074%2C%20B1912%20Altos%20de%20San%20Lorenzo%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1690661868798!5m2!1ses!2sar"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <Footer />
    </section>
  );
}
