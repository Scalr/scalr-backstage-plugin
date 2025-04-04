import {
  LoggerService,
  RootConfigService,
} from '@backstage/backend-plugin-api';
import { NotFoundError } from '@backstage/errors';
import { EnvironmentService } from './types';
import { ScalrApi } from './../../api/ScalrApi';
import { Environment, Workspace } from '../../types';

export async function createEnvironmentService({
  logger,
  config,
}: {
  logger: LoggerService;
  config: RootConfigService;
}): Promise<EnvironmentService> {
  logger.info('Initializing EnvironmentService');

  const scalrApi = new ScalrApi(config, logger);

  return {
    async getEnvironments(request: {}) {
      logger.info(`/environments was requested`);

      const environments = await scalrApi.getEnvironments();
      if (!environments) throw new NotFoundError('Error fetching environments');

      const result: Environment[] = environments.map((environment: any) => {
        return {
          name: environment.data.attributes.name,
          id: environment.data.id,
          baseUrl: new URL(environment.data.links.self).host,
          workspaces: [],
        } as Environment;
      });

      return result;
    },

    async getEnvironment(request: { id: string }) {
      logger.info(`/environments/${request.id} was requested`);

      const environment = await scalrApi.getEnvironment(request.id);
      if (!environment)
        throw new NotFoundError(`Error fetching environment - '${request.id}'`);

      const workspaces = await scalrApi.getWorkspaces(request.id);
      if (!workspaces)
        throw new NotFoundError(
          `Error fetching workspaces with environment - '${request.id}'`,
        );

      const workspacePromises = workspaces.data.map(async (workspace: any) => {
        const run = await scalrApi.getRun(
          workspace.relationships['latest-run'].data.id,
        );
        if (!run)
          throw new NotFoundError(
            `Error fetching run - '${workspace.relationships['latest-run'].data.id}'`,
          );

        return {
          name: workspace.attributes.name,
          id: workspace.id,
          type: workspace.attributes['environment-type'],
          last_execution_state: run.data.attributes.status,
          last_execution_time: workspace.attributes['updated-at'],
          last_execution_user: workspace.attributes['updated-by-email'],
        } as Workspace;
      });

      const result: Environment = {
        name: environment.data.attributes.name,
        id: environment.data.id,
        baseUrl: new URL(environment.data.links.self).host,
        workspaces: await Promise.all(workspacePromises),
      };

      return result;
    },
  };
}
