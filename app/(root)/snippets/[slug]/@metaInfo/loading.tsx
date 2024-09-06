import React from "react";

const loading = () => {
  return (
    <div className="container md:mt-12 mt-6  h-16 grid">
      <div className="w-full h-full bg-accent animate-pulse flex items-center justify-center"></div>
    </div>
  );
};

export default loading;
