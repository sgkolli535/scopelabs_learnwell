export type SiteConfig = typeof siteConfig;

// Site configuration
// This object contains information about the site, such as the name, description, and navigation links
export const siteConfig = {
  name: "Learnwell",
  description: "Learn, Create, Engage",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Videos",
      href: "/videos",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Videos",
      href: "/videos",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/",
    twitter: "https://twitter.com/",
    instagram: "https://instagram.com/",
  },
};
