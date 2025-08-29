import {
  LoggerService,
  RootConfigService,
} from '@backstage/backend-plugin-api';
import { NotFoundError } from '@backstage/errors';
import { ScalrApi } from './../../api/ScalrApi';
import { ModuleService } from './types';
import { ModuleNamespace, Module } from '../../types/';

type Included = {
  id: string;
  type: string;
  attributes?: Record<string, any>;
};

export async function createModuleService({
  logger,
  config,
}: {
  logger: LoggerService;
  config: RootConfigService;
}): Promise<ModuleService> {
  logger.info('Initializing EnvironmentService');

  const scalrApi = new ScalrApi(config, logger);

  const buildRunUrl = (module: any): string => {
    const host = new URL(module.links.self).host;
    const accId = module.relationships?.account?.data?.id;
    const moduleId = module.id;
    return `https://${host}/v2/a/${accId}/modules/${moduleId}`;
  };

  const configModuleNamespaces = config.getOptionalConfigArray(
    'integrations.scalr.module-namepsaces',
  );

  return {
    async getModuleNamespaces(_: {}) {
      logger.info(`/module/namespaces was requested`);

      if (configModuleNamespaces) {
        return configModuleNamespaces.map(ns => ({
          name: ns.getString('display-name'),
          id: ns.getString('id'),
        })) satisfies ModuleNamespace[];
      }
      const moduleNamespaces = (await scalrApi.getModuleNamespaces()).data;
      if (!Array.isArray(moduleNamespaces)) {
        throw new NotFoundError('Error fetching module namespaces');
      }

      const result: ModuleNamespace[] = moduleNamespaces.map(
        (namespace: any) =>
          ({
            name: namespace?.attributes?.name,
            id: namespace?.id,
          } satisfies ModuleNamespace),
      );

      return result satisfies ModuleNamespace[];
    },

    async getModules(request: { namespaceId?: string }) {
      logger.info(`/modules was requested`);

      if (configModuleNamespaces && !request.namespaceId) return [];

      const response = await scalrApi.getModules(request.namespaceId);
      const modules: any[] = Array.isArray(response?.data) ? response.data : [];
      const included: Included[] = Array.isArray(response?.included)
        ? (response.included as Included[])
        : [];

      if (!Array.isArray(modules)) {
        throw new NotFoundError('Error fetching modules');
      }

      const includedMap = new Map<string, string | undefined>(
        included
          .filter(i => i?.type === 'module-versions')
          .map(i => [i.id, i?.attributes?.version as string | undefined]),
      );

      const result: Module[] = modules.map(m => {
        const latestId: string | undefined =
          m?.relationships?.['latest-module-version']?.data?.id;

        const version = latestId ? includedMap.get(latestId) : undefined;

        return {
          id: m?.id,
          name: m?.attributes?.name,
          provider: m?.attributes?.provider,
          description: m?.attributes?.description,
          version,
          url: buildRunUrl(m),
        } as Module;
      });

      return result satisfies Module[];
    },
  };
}
