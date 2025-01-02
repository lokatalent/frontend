"use client";

import { APIProvider } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

export default function LocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

  useEffect(() => {
    // This runs only on the client side
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return null during server-side rendering or until document is available
    return null;
  }
  
  return (
    <section className="">
      <APIProvider apiKey={API_KEY}>
        {children}
      </APIProvider>
    </section>
  );
}
