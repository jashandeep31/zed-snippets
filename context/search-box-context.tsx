"use client";

import { createContext, useState } from "react";

export const searchBoxContext = createContext<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

export const SearchBoxProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <searchBoxContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </searchBoxContext.Provider>
  );
};
