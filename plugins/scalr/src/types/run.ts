export interface Run {
  id: string;
  message: string;
  state: string;
  time: string;
  user?: string;
  source: string;
  url?: string;
}
