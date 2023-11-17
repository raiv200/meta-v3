"use client";

import { SessionProvider as Provider } from "next-auth/react";
import { useEffect } from "react";
import { auth } from "./firebase";

export default function SessionProvider({ children }) {
  
  return <Provider>{children}</Provider>;
}
