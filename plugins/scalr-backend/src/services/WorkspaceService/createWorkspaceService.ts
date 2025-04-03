import {
  LoggerService,
  RootConfigService,
} from '@backstage/backend-plugin-api';
import { WorkspaceService } from './types';
import { ScalrApi } from './../../api/ScalrApi';
import { NotFoundError } from '@backstage/errors';

export async function createWorkspaceService({
  logger,
  config,
}: {
  logger: LoggerService;
  config: RootConfigService;
}): Promise<WorkspaceService> {
  logger.info('Initializing WorkspaceService');

  const scalrApi = new ScalrApi(config, logger);

  return {
    async createRun(request: { id: string }) {
      logger.info(`workspace/runs/${request.id} was requested`);

      const workspaces = await scalrApi.getWorkspace(request.id);
      if (!workspaces)
        throw new NotFoundError(
          `Error fetching workspaces with environment - '${request.id}'`,
        );

      const run = await scalrApi.createRun(
        workspaces.data.id,
        workspaces.data.relationships['configuration-version'].data.id,
        workspaces.data.relationships['latest-run'].data.id,
      );

      return run;
    },
  };
}
