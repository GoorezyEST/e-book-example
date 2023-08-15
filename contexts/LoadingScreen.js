"use client";

import React from "react";
import { useGlobal } from "./GlobalContext";

export default function LoadingScreen({ children }) {
  const { isHydrated } = useGlobal();

  return (
    <div>
      {!isHydrated && <p>carga</p>}
      {children}
    </div>
  );
}
