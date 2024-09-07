import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";
import { SearchBoxProvider } from "@/context/search-box-context";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Zed Snippets: Code Marketplace for Developers | Create & Share",
  description:
    "Discover, create, and share Zed code snippets on our marketplace. Boost productivity with ready-to-use code fragments for various programming languages and frameworks.",
  keywords:
    "Zed snippets, code marketplace, developer tools, code sharing, programming snippets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SearchBoxProvider>{children}</SearchBoxProvider>
      </body>
    </html>
  );
}
