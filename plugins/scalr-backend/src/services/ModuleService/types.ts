import {
  BackstageCredentials,
  BackstageUserPrincipal,
} from '@backstage/backend-plugin-api';
import { ModuleNamespace, Module } from '../../types';

export interface ModuleService {
  getModuleNamespaces(
    request: {},
    options: {
      credentials: BackstageCredentials<BackstageUserPrincipal>;
    },
  ): Promise<ModuleNamespace[]>;

  getModules(
    request: { namespaceId?: string },
    options: {
      credentials: BackstageCredentials<BackstageUserPrincipal>;
    },
  ): Promise<Module[]>;
}
