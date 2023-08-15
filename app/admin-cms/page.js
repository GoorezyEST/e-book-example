"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "@/styles/admin/login.module.css";
import { useForm } from "react-hook-form";
import { logIn } from "@/firebase/functions/auth";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/contexts/GlobalContext";

export default function AdminCMS() {
  const {
    register,
    formState: { errors },
    getFieldState,
    handleSubmit,
    setValue,
    reset,
  } = useForm();

  const form = useRef(null);
  const { logged } = useGlobal();
  const router = useRouter();

  useEffect(() => {
    if (logged) {
      router.push("admin-cms/cms");
    }
  }, [logged]);

  const sign = (e) => {
    const { email, password } = e;
    logIn(email, password);
    reset();
  };

  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmit(sign)} ref={form} className={styles.form}>
        <div className={styles.form_title}>
          <h3>Inicia sesión</h3>
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
                  : "",
            }}
          >
            {errors.email?.type === "required" && "Este campo es requerido"}
            {errors.email?.type === "pattern" && "Debe ser un email valido"}
            {!errors.email &&
              !getFieldState("email").isDirty &&
              "Ingresa tu email"}
            {!errors.email &&
              getFieldState("email").isDirty &&
              "Ingresa tu email"}
          </label>
          <input
            type="text"
            className={styles.form_field}
            placeholder="Email"
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
            htmlFor="password"
            style={{
              color: errors.password?.type === "required" ? "red" : "",
            }}
          >
            {errors.password?.type === "required" && "Este campo es requerido"}
            {!errors.password &&
              !getFieldState("password").isDirty &&
              "Ingresa tu contraseña"}
            {!errors.password &&
              getFieldState("password").isDirty &&
              "Ingresa tu contraseña"}
          </label>
          <input
            type="password"
            className={styles.form_field}
            placeholder="Contraseña"
            name="password"
            id="password"
            {...register("password", {
              required: true,
            })}
            autoComplete="off"
          />
        </div>

        <input type="submit" className={styles.form_submit} value="Ingresar" />
      </form>
    </section>
  );
}
