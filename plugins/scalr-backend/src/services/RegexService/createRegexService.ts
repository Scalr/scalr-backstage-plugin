import { LoggerService, RootConfigService } from '@backstage/backend-plugin-api';
import { NotFoundError } from '@backstage/errors';

import { ScalrApi } from '../../api/ScalrApi';
import { Workspace } from '../../types';
import { RegexService } from './types';

export async function createRegexService({
  logger,
  config,
}: {
  logger: LoggerService;
  config: RootConfigService;
}): Promise<RegexService> {
  logger.info('Initializing EnvironmentService');

  const scalrApi = new ScalrApi(config, logger);

  return {
    async getRegex(request: { regex: string }) {
      logger.info(`/regex/${request.regex} was requested`);

      const workspaces = await scalrApi.listWorkspaces();
      if (!workspaces?.data || !Array.isArray(workspaces.data)) {
        throw new NotFoundError(
          `Error fetching workspaces for regex - '${request.regex}'`,
        );
      }

      const regex = new RegExp(request.regex);
      
      const filteredWorkspaces = workspaces.data.filter((workspace: any) => {
        const name = workspace.attributes?.name ?? '';
        return regex.test(name);
      });

      const workspacePromises = filteredWorkspaces.map(async (workspace: any) => {
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

        return {
          name: workspace.attributes?.name ?? 'Unnamed Workspace',
          id: workspace.id,
          type: workspace.attributes?.['environment-type'] ?? 'unknown',
          last_execution_state: run?.data?.attributes?.status ?? undefined,
          last_execution_time:
            workspace.attributes?.['updated-at'] ?? undefined,
          last_execution_user:
            workspace.attributes?.['updated-by-email'] ?? undefined,
        } as Workspace;
      });

      const result: Workspace[] = await Promise.all(workspacePromises);

      return result;
    },
  };
}
