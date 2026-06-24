export const NAV_LINKS = [
  { href: "/", label: "Home", active: (path: string) => path === "/" },
  {
    href: "/blog",
    label: "Blog",
    active: (path: string) => path.startsWith("/blog"),
  },
  {
    href: "/projects",
    label: "Projects",
    active: (path: string) => path === "/projects",
  },
  // { href: "/#Contact", label: "Contact" },
] as const;