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
    async getEnvironments(_request: {}) {
      logger.info(`/environments was requested`);

      const environments = await scalrApi.getEnvironments();
      if (!environments || !Array.isArray(environments)) {
        throw new NotFoundError('Error fetching environments');
      }

      const result: Environment[] = environments
        .map((environment: any) => {
          if (!environment?.data) {
            logger.warn(
              'Skipped environment due to missing data field:',
              environment,
            );
            return null;
          }

          return {
            name: environment.data.attributes?.name ?? 'Unknown',
            id: environment.data.id,
            baseUrl: new URL(environment.data.links?.self ?? '').host,
            workspaces: [],
          } as Environment;
        })
        .filter((env): env is Environment => env !== null);

      return result;
    },

    async getEnvironment(request: { id: string }) {
      logger.info(`/environments/${request.id} was requested`);

      const environment = await scalrApi.getEnvironment(request.id);
      if (!environment?.data) {
        throw new NotFoundError(
          `Error fetching environment - '${request.id}', response was malformed`,
        );
      }

      const workspaces = await scalrApi.getWorkspaces(request.id);
      if (!workspaces?.data || !Array.isArray(workspaces.data)) {
        throw new NotFoundError(
          `Error fetching workspaces for environment - '${request.id}'`,
        );
      }

      const workspacePromises = workspaces.data.map(async (workspace: any) => {
        let run: any = null;

        const latestRunRel = workspace.relationships?.['latest-run'];
        if (latestRunRel?.data?.id) {
          run = await scalrApi.getRun(latestRunRel.data.id);
          if (!run?.data) {
            logger.warn(
              `Run data not found for run ID '${latestRunRel.data.id}'`,
            );
            run = null;
          }
        }

        const url = `https://${
          new URL(workspace.links?.self ?? '').host
        }/v2/e/${request.id}/workspaces/${workspace.id}/`;

        return {
          name: workspace.attributes?.name ?? 'Unnamed Workspace',
          id: workspace.id,
          type: workspace.attributes?.['environment-type'] ?? 'unknown',
          last_execution_state: run?.data?.attributes?.status ?? undefined,
          last_execution_time:
            workspace.attributes?.['updated-at'] ?? undefined,
          last_execution_user:
            workspace.attributes?.['updated-by-email'] ?? undefined,
          url,
        } as Workspace;
      });

      const result: Environment = {
        name: environment.data.attributes?.name ?? 'No run found',
        id: environment.data.id,
        baseUrl: new URL(environment.data.links?.self ?? '').host,
        workspaces: await Promise.all(workspacePromises),
      };

      return result;
    },
  };
}
