import { BackstageCredentials, BackstageUserPrincipal } from '@backstage/backend-plugin-api';

import { Workspace } from '../../types';

export interface RegexService {
  getRegex(
    request: { regex: string },
    options: {
      credentials: BackstageCredentials<BackstageUserPrincipal>;
    },
  ): Promise<Workspace[]>;
}
