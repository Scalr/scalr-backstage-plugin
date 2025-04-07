import {
  LoggerService,
  RootConfigService,
} from '@backstage/backend-plugin-api';
import { WorkspaceService } from './types';
import { ScalrApi } from './../../api/ScalrApi';
import { NotFoundError } from '@backstage/errors';
import { Run, Workspace } from '../../types';

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

    async listRuns(request: { workspace: string }) {
      logger.info(`workspace/runs/${request.workspace} was requested`);

      const workspace: Workspace = {
        id: request.workspace,
        runs: (await scalrApi.listRuns(request.workspace)).data.map(
          (run: any) => {
            return {
              id: run.id,
              message: run.attributes.message,
              state: run.attributes.status,
              time: run.attributes['created-at'],
              user: '',
              source: run.attributes.source,
            } as Run;
          },
        ),
      };
      if (!workspace)
        throw new NotFoundError(
          `Error fetching runs from workspace - '${request.workspace}'`,
        );

      return workspace;
    },
  };
}
