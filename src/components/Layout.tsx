import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F5F5F3] flex justify-center">
      <div className="w-full max-w-full flex flex-col pb-10 shadow-xl min-h-screen bg-white md:bg-inherit">
        {children}
      </div>
    </div>
  );
};

export default Layout;
