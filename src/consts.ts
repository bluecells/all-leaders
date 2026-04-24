import type { Site, Metadata, Socials } from "@/types";

export const SITE: Site = {
  NAME: "All Leaders Initiative",
  URL: "https://all-leaders.fr",
  EMAIL: "contact@all-leaders.fr",
  AUTHOR: "All Leaders",
  PROPERTYID: "155172",
};

export const HOME: Metadata = {
  TITLE: "All Leaders Initiative",
  DESCRIPTION: "Bureau du Réel - Le réel prime sur la réputation. L'impact dépasse le spectacle.",
};

export const FAQ: Metadata = {
  TITLE: "FAQ",
  DESCRIPTION: "Les questions/réponses du Bureau du Réel",
};

export const INTERVENTIONS: Metadata = {
  TITLE: "Nos interventions",
  DESCRIPTION: "Découvrez nos interventions et conférences",
};

export const SPEAKERS: Metadata = {
  TITLE: "Nos conférenciers",
  DESCRIPTION: "Découvrez nos conférenciers et experts",
};

export const CONTACT: Metadata = {
  TITLE: "Contact",
  DESCRIPTION: "Contactez-nous pour organiser une conférence ou obtenir plus d'informations",
};

export const SOCIALS: Socials = [
  { 
    NAME: "twitter-x",
    HREF: "https://twitter.com/markhorn_dev",
  },
  { 
    NAME: "github",
    HREF: "https://github.com/markhorn-dev"
  },
  { 
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/markhorn-dev",
  }
];
