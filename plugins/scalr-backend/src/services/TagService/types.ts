import {
  BackstageCredentials,
  BackstageUserPrincipal,
} from '@backstage/backend-plugin-api';
import { Tag } from '../../types';

export interface TagService {
  getTag(
    request: { name: string },
    options: {
      credentials: BackstageCredentials<BackstageUserPrincipal>;
    },
  ): Promise<Tag>;
}
