import {
  LoggerService,
  RootConfigService,
} from '@backstage/backend-plugin-api';
import { NotFoundError } from '@backstage/errors';
import { ScalrApi } from './../../api/ScalrApi';
import { ModuleService } from './types';
import { ModuleNamespace, Module } from '../../types/';

export async function createModuleService({
  logger,
  config,
}: {
  logger: LoggerService;
  config: RootConfigService;
}): Promise<ModuleService> {
  logger.info('Initializing EnvironmentService');

  const scalrApi = new ScalrApi(config, logger);

  return {
    async getModuleNamespaces(request: {}) {
      logger.info(`/module/namespaces was requested`);

      const moduleNamespaces = (await scalrApi.getModuleNamespaces()).data;
      if (!moduleNamespaces || !Array.isArray(moduleNamespaces)) {
        throw new NotFoundError('Error fetching module namespaces');
      }

      const result: ModuleNamespace[] = moduleNamespaces.map(
        (namespace: any) =>
          ({
            name: namespace.attributes.name,
            id: namespace.id,
          } satisfies ModuleNamespace),
      );

      return result satisfies ModuleNamespace[];
    },

    async getModules(request: { namespaceId?: string }) {
      logger.info(`/modules/:id was requested`);

      const modules = (await scalrApi.getModules(request.namespaceId)).data;
      if (!modules || !Array.isArray(modules)) {
        throw new NotFoundError('Error fetching module namespaces');
      }

      const result: Module[] = modules.map(
        (module: any) =>
          ({
            name: module.attributes.name,
            id: module.id,
          } satisfies Module),
      );

      return result satisfies Module[];
    },
  };
}
