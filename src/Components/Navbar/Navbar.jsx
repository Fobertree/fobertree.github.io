"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { href: "/", label: "Home", match: (path) => path === "/" },
  { href: "/blog", label: "Blog", match: (path) => path.startsWith("/blog") },
  { href: "/#Projects", label: "Projects", match: () => false },
  { href: "/#Contact", label: "Contact", match: () => false },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" onClick={closeMenu}>
            Alexander Liu
          </Link>
        </div>

        <div className={styles.links}>
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.link} ${
                item.match(pathname) ? styles.linkActive : ""
              }`}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ""}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-menu"
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <button
        type="button"
        className={`${styles.mobileBackdrop} ${isMenuOpen ? styles.mobileBackdropOpen : ""}`}
        onClick={closeMenu}
        aria-label="Close menu"
        tabIndex={isMenuOpen ? 0 : -1}
      />

      <div
        id="mobile-nav-menu"
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <div className={styles.mobileMenuInner}>
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.mobileLink} ${
                item.match(pathname) ? styles.mobileLinkActive : ""
              }`}
              onClick={closeMenu}
              tabIndex={isMenuOpen ? 0 : -1}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;