import {
  BackstageCredentials,
  BackstageUserPrincipal,
} from '@backstage/backend-plugin-api';

export interface Workspace {
  name: string;
  id: string;
  type?: string;
  last_execution_state?: string;
  last_execution_time?: string;
  last_execution_user?: string;
}

export interface Environment {
  name: string;
  id: string;
  baseUrl: string;
  workspaces: Workspace[];
}
