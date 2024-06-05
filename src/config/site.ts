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
  links: {
    github: "https://github.com/interledger",
    twitter: "https://twitter.com/interledger",
    slack:
      "https://communityinviter.com/apps/interledger/interledger-working-groups-slack",
    discord: "https://discord.gg/9b6yyZKmH4",
    openPayments: "https://openpayments.dev/",
  },
};
