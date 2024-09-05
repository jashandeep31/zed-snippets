import Navbar from "@/components/navbar";
import SearchBoxDialog from "@/components/search-box-dialog";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <SearchBoxDialog />
      <header className="sticky top-0 bg-background z-10">
        <Navbar />
      </header>
      <main className="flex-1 grid">{children}</main>
      <footer>
        <div className="border-t border-dashed border-primary py-4 mt-12 ">
          <div className="container">
            <p>X @Jashandeep31</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
