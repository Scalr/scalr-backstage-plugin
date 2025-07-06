import {
  LoggerService,
  RootConfigService,
} from '@backstage/backend-plugin-api';
import { NotFoundError } from '@backstage/errors';
import { TagService } from './types';
import { ScalrApi } from './../../api/ScalrApi';
import { Tag, Workspace } from '../../types';

export async function createTagService({
  logger,
  config,
}: {
  logger: LoggerService;
  config: RootConfigService;
}): Promise<TagService> {
  logger.info('Initializing EnvironmentService');

  const scalrApi = new ScalrApi(config, logger);

  return {
    async getTag(request: { name: string }) {
      logger.info(`/tag/${request.name} was requested`);

      const tag = await scalrApi.getTag(request.name);
      if (!tag?.data) {
        throw new NotFoundError(
          `Error fetching tag - '${request.name}', response was malformed`,
        );
      }

      const workspaces = await scalrApi.getWorkspacesByTag(tag.data[0].id);
      if (!workspaces?.data || !Array.isArray(workspaces.data)) {
        throw new NotFoundError(
          `Error fetching workspaces for environment - '${request.name}'`,
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
        }/v2/e/${request.name}/workspaces/${workspace.id}/`;

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

      const result: Tag = {
        name: tag.data[0].attributes?.name ?? 'No run found',
        id: tag.data[0].id,
        baseUrl: new URL(tag.data[0].links?.self ?? '').host,
        workspaces: await Promise.all(workspacePromises),
      };

      return result;
    },
  };
}
