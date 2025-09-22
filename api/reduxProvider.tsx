"use client";

import { makeStore } from "./store";
import { Provider } from "react-redux";
import { useRef } from "react";

export default function CustomProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef(makeStore());

  return <Provider store={storeRef.current}>{children}</Provider>;
}
