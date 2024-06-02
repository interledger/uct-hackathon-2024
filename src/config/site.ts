export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Tippy",
  description: "Fund your favourite creators",
  navItems: [
    {
      label: "Open Payments",
      href: "https://openpayments.dev/",
    },
    {
      label: "Interledger Protocol",
      href: "https://interledger.org/developers/get-started/",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/interledger",
    twitter: "https://twitter.com/interledger",
    slack:
      "https://communityinviter.com/apps/interledger/interledger-working-groups-slack",
    discord: "https://discord.gg/9b6yyZKmH4",
  },
};
