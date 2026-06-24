"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NAV_LINKS } from "../../data/nav";
import { cx } from "../../lib/cx";
import styles from "./Navbar.module.css";

function NavLinks({ pathname, linkClass, activeClass, onNavigate, tabIndex }) {
  return NAV_LINKS.map(({ href, label, active }) => (
    <Link
      key={href}
      href={href}
      className={cx(linkClass, active?.(pathname) && activeClass)}
      onClick={onNavigate}
      tabIndex={tabIndex}
    >
      {label}
    </Link>
  ));
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    close();
  }, [pathname]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" onClick={close}>
            Alexander Liu
          </Link>
        </div>

        <div className={styles.links}>
          <NavLinks
            pathname={pathname}
            linkClass={styles.link}
            activeClass={styles.linkActive}
            onNavigate={close}
          />
        </div>

        <button
          type="button"
          className={cx(styles.hamburger, open && styles.hamburgerOpen)}
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <button
        type="button"
        className={cx(styles.mobileBackdrop, open && styles.mobileBackdropOpen)}
        onClick={close}
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
      />

      <div
        id="mobile-nav-menu"
        className={cx(styles.mobileMenu, open && styles.mobileMenuOpen)}
        aria-hidden={!open}
      >
        <div className={styles.mobileMenuInner}>
          <NavLinks
            pathname={pathname}
            linkClass={styles.mobileLink}
            activeClass={styles.mobileLinkActive}
            onNavigate={close}
            tabIndex={open ? 0 : -1}
          />
        </div>
      </div>
    </nav>
  );
}