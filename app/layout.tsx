import type { Metadata } from "next";
import Navbar from "../src/Components/Navbar/Navbar";
import "katex/dist/katex.min.css";
import "./theme.css";
import "./globals.css";
import styles from "./SiteShell.module.css";

export const metadata: Metadata = {
  title: "Alexander Liu",
  description: "?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className={styles.siteShell}>
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
