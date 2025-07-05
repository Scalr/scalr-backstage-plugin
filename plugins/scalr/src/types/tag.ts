import { Workspace } from '.';

export interface Tag {
  name: string;
  id: string;
  baseUrl: string;
  workspaces: Workspace[];
}
