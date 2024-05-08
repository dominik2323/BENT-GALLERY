import { Metadata } from "next";
import React from "react";
import { Global } from "./(client)/Global";

export const metadata: Metadata = {};

interface PageProps {
  children?: React.ReactNode;
}

const page = ({ children }: PageProps) => {
  return (
    <html>
      <body>
        <Global />
        {children}
      </body>
    </html>
  );
};

export default page;
