import Navbar from "@/components/navbar";
import SearchBoxDialog from "@/components/search-box-dialog";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <SearchBoxDialog />
      <header className="sticky top-0 bg-background ">
        <Navbar />
      </header>
      <main className="flex-1 grid">{children}</main>
    </div>
  );
}
