import {
  BackstageCredentials,
  BackstageUserPrincipal,
} from '@backstage/backend-plugin-api';
import { Environment } from '../types';

export interface EnvironmentService {
  getEnvironments(
    request: {},
    options: {
      credentials: BackstageCredentials<BackstageUserPrincipal>;
    },
  ): Promise<Environment[]>;

  getEnvironment(
    request: { id: string },
    options: {
      credentials: BackstageCredentials<BackstageUserPrincipal>;
    },
  ): Promise<Environment>;
}
