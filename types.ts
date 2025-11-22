export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export enum View {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  EDUCATION = 'EDUCATION',
  EXPERTISE = 'EXPERTISE',
  VENTURES = 'VENTURES',
  PROJECTS = 'PROJECTS',
  CONTACT = 'CONTACT'
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  location: string;
  imageUrl: string;
}