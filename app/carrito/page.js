"use client";

import React, { useEffect, useState } from "react";
import { useGlobal } from "@/contexts/GlobalContext";
import Navbar from "@/components/Navbar";
import styles from "@/styles/modules/carrito.module.css";
import Link from "next/link";
import BookForm from "@/components/BookForm";
import Footer from "@/components/Footer";
import { formatPrice } from "@/functions/functions";

export default function Carrito() {
  const {
    cart,
    updateCart,
    setTotalPrice,
    setAddedProducts,
    success,
    setSuccess,
  } = useGlobal();
  const [quantities, setQuantities] = useState(cart.map(() => 1));

  setTotalPrice(
    cart.reduce(
      (total, item, index) => total + item.price * quantities[index],
      0
    )
  );

  const handleQuantityChange = (index, quantity) => {
    const newQuantities = [...quantities];
    newQuantities[index] = quantity;
    setQuantities(newQuantities);

    const newCart = cart.map((item, i) => {
      if (index === i) {
        return { ...item, quantity };
      }
      return item;
    });

    updateCart(newCart);
  };

  const handleRemoveProduct = ({ item, index }) => {
    const newCart = cart.filter((_, i) => i !== index);
    setQuantities(quantities.filter((_, i) => i !== index));
    updateCart(newCart);
    setAddedProducts((prev) =>
      prev.filter((product) => product.id !== item.id)
    );
  };

  return (
    <section className={styles.container}>
      <Navbar />

      {cart.length < 1 && !success && (
        <div className={styles.content_empty}>
          <div className={styles.empty}>
            <span>¡Tu carrito esta vacío!</span>
            <p>
              Para desplegar las opciones de reserva debes{" "}
              <Link href="/productos">agregar productos</Link>.
            </p>
            <Link href="/productos">Ver productos</Link>
          </div>
        </div>
      )}

      {cart.length >= 1 && (
        <div className={styles.content}>
          <div className={styles.ticket}>
            <div className={`${styles.rows} ${styles.product_row}`}>
              <span>Producto</span>
              <ul className={styles.row_content}>
                {cart.map((item, index) => {
                  return (
                    <li key={index} className={styles.product_name}>
                      <img src={item.img} />
                      <span>{item.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.rows}>
              <span>Precio</span>
              <ul className={styles.row_content}>
                {cart.map((item, index) => {
                  return (
                    <li key={index}>
                      {formatPrice(item.price * quantities[index])}
                    </li>
                  ); // Display individual price
                })}
              </ul>
            </div>
            <div className={styles.rows}>
              <span>Cantidad</span>
              <ul className={styles.row_content}>
                {cart.map((item, index) => {
                  return (
                    <span key={index}>
                      <input
                        type="number"
                        value={quantities[index]}
                        min={1}
                        onChange={(e) =>
                          handleQuantityChange(index, +e.target.value)
                        }
                      />
                    </span>
                  );
                })}
              </ul>
            </div>
            <div className={styles.erase}>
              <span>•</span>
              <ul>
                {cart.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => handleRemoveProduct({ item, index })}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"
                          fill="none"
                          stroke="red"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="32"
                        />
                        <path
                          stroke="red"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          strokeWidth="32"
                          d="M80 112h352"
                        />
                        <path
                          d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224"
                          fill="none"
                          stroke="red"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="32"
                        />
                      </svg>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <BookForm />
        </div>
      )}
      {success && (
        <div className={styles.content}>
          <BookForm />
        </div>
      )}
      <Footer />
    </section>
  );
}
