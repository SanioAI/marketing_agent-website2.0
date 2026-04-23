export type BlogBlock =
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  kicker: string;
  date: string; // ISO YYYY-MM-DD
  tag: string;
  readMin: number;
  blocks: BlogBlock[];
};
