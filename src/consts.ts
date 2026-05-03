import type { Site, Metadata, Socials } from "@/types";

export const SITE: Site = {
  NAME: "All Leaders Initiative",
  URL: "https://all-leaders.fr",
  EMAIL: "contact@all-leaders.fr",
  AUTHOR: "All Leaders",
};

export const HOME: Metadata = {
  TITLE: "All Leaders Initiative",
  METATITLE: "All Leaders Initiative - Bâtir des équipes épanouies et performantes",
  METADESCRIPTION: "Découvrez comment bâtir des équipes épanouies et performantes grâce à nos conférences et ressources",
};


export const FAQ: Metadata = {
  TITLE: "FAQ",
  METATITLE: "FAQ - All Leaders Initiative",
  METADESCRIPTION: "Les questions/réponses du Bureau du Réel",
};

export const ACCOMPAGNEMENTS: Metadata = {
  TITLE: "Nos interventions",
  METATITLE: "Nos interventions - All Leaders Initiative",
  METADESCRIPTION: "Découvrez nos interventions et conférences",
};

export const CONTACT: Metadata = {
  TITLE: "Contact",
  METATITLE: "Contactez-nous - All Leaders Initiative",
  METADESCRIPTION: "Contactez-nous pour organiser une conférence ou obtenir plus d'informations",
};

export const SOCIALS: Socials = [
  { 
    NAME: "instagram",
    HREF: "https://twitter.com/markhorn_dev",
  },
  { 
    NAME: "youtube",
    HREF: "https://github.com/markhorn-dev"
  },
  { 
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/markhorn-dev",
  }
];
