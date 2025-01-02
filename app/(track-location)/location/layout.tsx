"use client";

import { APIProvider } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

export default function LocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

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
      <APIProvider apiKey={"AIzaSyCnCGDCUjVm_19pvF9Zlv5o7xngU4wLKCY"}>
        {children}
      </APIProvider>
    </section>
  );
}
