import {
  BackstageCredentials,
  BackstageUserPrincipal,
} from '@backstage/backend-plugin-api';

export interface WorkspaceService {
  createRun(
    request: { id: string },
    options: {
      credentials: BackstageCredentials<BackstageUserPrincipal>;
    },
  ): Promise<number>;
}
