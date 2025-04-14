import {
  BackstageCredentials,
  BackstageUserPrincipal,
} from '@backstage/backend-plugin-api';
import { Workspace } from '../../types';

export interface WorkspaceService {
  createRun(
    request: { id: string },
    options: {
      credentials: BackstageCredentials<BackstageUserPrincipal>;
    },
  ): Promise<number>;

  listRuns(
    request: { workspace: string },
    options: {
      credentials: BackstageCredentials<BackstageUserPrincipal>;
    },
  ): Promise<Workspace>;
}
