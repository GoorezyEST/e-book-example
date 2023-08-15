"use client";

import { GlobalProvider } from "./GlobalContext";
import LoadingScreen from "./LoadingScreen";

import React from "react";

export default function ThirdParty({ children }) {
  return (
    <GlobalProvider>
      <LoadingScreen>{children}</LoadingScreen>
    </GlobalProvider>
  );
}
