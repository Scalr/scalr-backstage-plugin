import {
  BackstageCredentials,
  BackstageUserPrincipal,
} from '@backstage/backend-plugin-api';

export interface Workspace {
  name: string;
  id: string;
  type?: string;
  state?: string;
  last_execution?: Date;
}

export interface Environment {
  name: string;
  id: string;
  workspaces: Workspace[];
}

export interface EnvironmentService {
  getEnvironment(
    request: { id: string },
    options: {
      credentials: BackstageCredentials<BackstageUserPrincipal>;
    },
  ): Promise<Environment>;
}
