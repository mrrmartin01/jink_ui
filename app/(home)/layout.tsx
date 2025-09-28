import Navbar from "@/components/common/Navbar";
import React from "react";

const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex min-h-screen flex-col">
      <main>
        <Navbar>{children}</Navbar>
        </main>
    </div>
  );
};

export default HomeLayout;
