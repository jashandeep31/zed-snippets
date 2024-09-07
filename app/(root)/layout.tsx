import Navbar from "@/components/navbar";
import SearchBoxDialog from "@/components/search-box-dialog";
import Link from "next/link";
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
          <div className="container flex justify-between">
            <p>
              <Link
                href={"https://x.com/Jashandeep31"}
                className="underline  text-primary duration-300 text-sm"
              >
                @Jashandeep31
              </Link>
            </p>
            <p className="text-sm text-primary">
              Not affiliated with or owned by Zed Industries.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
