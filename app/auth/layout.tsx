import React from "react";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex min-h-screen flex-col">
      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;
