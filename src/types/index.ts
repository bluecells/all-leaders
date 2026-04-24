export interface Site {
  NAME: string;
  URL: string;
  EMAIL: string;
  AUTHOR: string;
}

export interface Metadata {
  TITLE: string;
  DESCRIPTION: string;
}

export interface Social {
  NAME: string;
  HREF: string;
}

export type Socials = Social[];
