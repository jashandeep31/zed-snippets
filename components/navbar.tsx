"use client";
import Link from "next/link";
// import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import NavbarConverterMenu from "./navbar-conver-menu";
import { Search, Star } from "lucide-react";
import { searchBoxContext } from "@/context/search-box-context";

const Navbar = () => {
  const { setIsOpen, isOpen } = useContext(searchBoxContext);

  return (
    <div className="border-primary/50 border-dashed border-b py-3 ">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-8 ">
          <Link href="/" className={`text-lg font-bold text-primary `}>
            Zed Snippets
          </Link>
          <div className="hidden md:flex gap-4 items-center ">
            <nav>
              <Link className="text-muted-foreground text-sm" href={"/"}>
                Home
              </Link>
            </nav>
            <nav>
              <Link
                className="text-muted-foreground text-sm"
                href={"https://github.com/jashandeep31/zed-snippets"}
              >
                Github
              </Link>
            </nav>
            <NavbarConverterMenu />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={"https://github.com/jashandeep31/zed-snippets"}
            className="border rounded p-1 text-sm text-muted-foreground  flex items-center  gap-1"
          >
            <Star size={16} />
            Star 0
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center text-muted-foreground gap-2"
          >
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
