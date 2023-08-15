"use client";

import React, { useRef, useState } from "react";
import styles from "@/styles/modules/booking.module.css";
import { useForm } from "react-hook-form";
import { useGlobal } from "@/contexts/GlobalContext";
import Link from "next/link";
import emailjs from "emailjs-com";

export default function BookForm() {
  const { totalPrice, cart, restartAfterSend, success, setSuccess } =
    useGlobal();
  const {
    register,
    formState: { errors },
    getFieldState,
    handleSubmit,
    reset,
  } = useForm();

  const form = useRef(null);
  const [sended, isSended] = useState(false);
  const [sending, isSending] = useState(false);

  const sign = (e) => {
    isSending(true);

    const { email, name, phone } = e;

    let data = {
      nombre: name,
      email: email,
      celular: phone,
      productos: "",
      total: `$ ${totalPrice}`,
    };

    cart.forEach((item, index) => {
      if (index === 0) {
        data.productos += `PRODUCTO: ${item.name}\nCANTIDAD: ${
          item.quantity === undefined ? 1 : item.quantity
        }\nPRECIO UNIDAD: $ ${item.price}`;
      } else {
        data.productos += `\n\nPRODUCTO: ${item.name}\nCANTIDAD: ${
          item.quantity === undefined ? 1 : item.quantity
        }\nPRECIO UNIDAD: $ ${item.price}`;
      }
    });

    emailjs
      .send("service_eijyayp", "template_rihm5qb", data, "aK54xJx9UA3rdUWrf")
      .then(() => {
        isSended(true);
        setSuccess(true);
        reset();
        restartAfterSend();
        isSending(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <section className={styles.wrapper}>
      {!success && (
        <div className={styles.content}>
          <div className={styles.payment}>
            <div>
              <p>Total</p>
              <span>$ {totalPrice}</span>
            </div>
          </div>
          <div className={styles.separator}>
            <div></div>
          </div>
          <form
            onSubmit={handleSubmit(sign)}
            ref={form}
            className={styles.form}
          >
            <div className={styles.form_title}>
              <h1>Ingresa tu información</h1>
            </div>
            <div className={styles.form_group}>
              <label
                className={styles.form_label}
                htmlFor="name"
                style={{
                  color:
                    errors.name?.type === "required" ||
                    errors.name?.type === "pattern" ||
                    errors.name?.type === "minLength"
                      ? "red"
                      : !errors.name && getFieldState("name").isDirty
                      ? "var(--accent)"
                      : "",
                }}
              >
                {errors.name?.type === "required" && "Este campo es requerido"}
                {errors.name?.type === "pattern" &&
                  "Sin números o caracteres especiales"}
                {errors.name?.type === "minLength" &&
                  "Un nombre de al menos 3 letras"}
                {!errors.name &&
                  !getFieldState("name").isDirty &&
                  "Nombre completo"}
                {!errors.name &&
                  getFieldState("name").isDirty &&
                  "Nombre válido"}
              </label>
              <input
                type="text"
                className={styles.form_field}
                placeholder="Nombre ..."
                name="name"
                id="name"
                {...register("name", {
                  required: true,
                  pattern: /^[A-Za-z][a-zA-Z]*(?: [A-Za-z][a-zA-Z]*)*$/,
                  minLength: 3,
                })}
                autoComplete="off"
              />
            </div>

            <div className={styles.form_group}>
              <label
                className={styles.form_label}
                htmlFor="email"
                style={{
                  color:
                    errors.email?.type === "required" ||
                    errors.email?.type === "pattern"
                      ? "red"
                      : !errors.email && getFieldState("email").isDirty
                      ? "var(--accent)"
                      : "",
                }}
              >
                {errors.email?.type === "required" && "Este campo es requerido"}
                {errors.email?.type === "pattern" && "Debe ser un email válido"}
                {!errors.email && !getFieldState("email").isDirty && "Email"}
                {!errors.email &&
                  getFieldState("email").isDirty &&
                  "Email válido"}
              </label>
              <input
                type="email"
                className={styles.form_field}
                placeholder="Email ..."
                name="email"
                id="email"
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                })}
                autoComplete="off"
              />
            </div>

            <div className={styles.form_group}>
              <label
                className={styles.form_label}
                htmlFor="phone"
                style={{
                  color:
                    errors.phone?.type === "required" ||
                    errors.phone?.type === "minLength" ||
                    errors.phone?.type === "pattern"
                      ? "red"
                      : !errors.phone && getFieldState("phone").isDirty
                      ? "var(--accent)"
                      : "",
                }}
              >
                {errors.phone?.type === "required" && "Este campo es requerido"}
                {errors.phone?.type === "pattern" &&
                  "Solo números, sin espacios o guiones"}
                {errors.phone?.type === "minLength" && "Al menos 10 números"}
                {!errors.phone && !getFieldState("phone").isDirty && "Celular"}
                {!errors.phone &&
                  getFieldState("phone").isDirty &&
                  "Celular válido"}
              </label>
              <input
                type="text"
                className={styles.form_field}
                placeholder="Celular ..."
                name="phone"
                id="phone"
                {...register("phone", {
                  required: true,
                  pattern: /^\d+$/,
                  minLength: 10,
                })}
                autoComplete="off"
              />
            </div>

            <input
              type="submit"
              className={styles.form_submit}
              value={sending ? "Reservando..." : "Reservar pedido"}
              disabled={sending || sended || (sending && sended)}
            />
          </form>
          <form id="dummyForm" style={{ display: "none" }}>
            <input type="hidden" name="nombre" />
            <input type="hidden" name="email" />
            <input type="hidden" name="celular" />
            <input type="hidden" name="total" />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {success && (
        <div className={styles.success}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29l-134.4 160a16 16 0 01-12 5.71h-.27a16 16 0 01-11.89-5.3l-57.6-64a16 16 0 1123.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0124.5 20.58z" />
          </svg>
          <span>¡Pedido reservado exitosamente!</span>
          <p>
            Llegará un mensaje de confirmación a tu bandeja de correo
            electrónico.
          </p>
          <p>
            En breve nos contactaremos contigo y comenzaremos a preparar tu
            pedido.
          </p>
          <Link href="/">Ir al inicio</Link>
        </div>
      )}
    </section>
  );
}
