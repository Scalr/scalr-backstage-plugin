import { Workspace } from '.';

export interface Environment {
  name: string;
  id: string;
  baseUrl: string;
  workspaces: Workspace[];
}
