"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import NavbarConverterMenu from "./navbar-conver-menu";
import { Search } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="border-primary/50 border-dashed border-b py-3">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className={`text-lg font-bold text-primary `}>Zed Snippets</h1>
          <div className="flex gap-4 items-center">
            <nav>
              <Link className="text-muted-foreground text-sm" href={"/"}>
                Home
              </Link>
            </nav>
            <nav>
              <Link className="text-muted-foreground text-sm" href={"/"}>
                Github
              </Link>
            </nav>
            <NavbarConverterMenu />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center text-muted-foreground gap-2">
            <Search size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground border rounded  px-1 font-medium">
              crtl + k
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
