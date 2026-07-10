export enum Page {
  Home = 'home',
  About = 'about',
  Services = 'services',
  Contact = 'contact',
  Privacy = 'privacy'
}

export interface ValueItem {
  title: string;
  description: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  bullets?: string[];
}
