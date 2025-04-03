import {
  LoggerService,
  RootConfigService,
} from '@backstage/backend-plugin-api';
import { WorkspaceService } from './types';
import { ScalrApi } from './../../api/ScalrApi';

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

      await new Promise(resolve => setTimeout(resolve, 2000));

      return 200;
    },
  };
}
