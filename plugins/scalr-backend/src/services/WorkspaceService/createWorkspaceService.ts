import {
  LoggerService,
  RootConfigService,
} from '@backstage/backend-plugin-api';
import { WorkspaceService } from './types';
import { ScalrApi } from './../../api/ScalrApi';
import { NotAllowedError, NotFoundError } from '@backstage/errors';
import { Run } from '../../types';

export async function createWorkspaceService({
  logger,
  config,
}: {
  logger: LoggerService;
  config: RootConfigService;
}): Promise<WorkspaceService> {
  logger.info('Initializing WorkspaceService');

  const scalrApi = new ScalrApi(config, logger);
  const allowTriggerRun =
    config.getOptionalBoolean('integrations.scalr.allow-trigger-run') ?? false;

  const buildRunUrl = (run: any): string => {
    const host = new URL(run.links.self).host;
    const envId = run.relationships.environment.data.id;
    const workspaceId = run.relationships.workspace.data.id;
    return `https://${host}/v2/e/${envId}/workspaces/${workspaceId}/runs/${run.id}`;
  };

  const mapRun = (run: any): Run => ({
    id: run.id,
    message: run.attributes.message,
    state: run.attributes.status,
    time: run.attributes['created-at'],
    user: '',
    source: run.attributes.source,
    url: buildRunUrl(run),
  });

  return {
    async createRun({ id }) {
      logger.info(`workspace/runs/${id} was requested`);

      if (!allowTriggerRun) {
        const message =
          'Triggering a run is forbidden by Backstage config. Set "integrations.scalr.allow-trigger-run" to true to enable.';
        logger.warn(message);
        throw new NotAllowedError(message);
      }

      const workspaceResponse = await scalrApi.getWorkspace(id);
      const workspaceData = workspaceResponse?.data;

      if (!workspaceData) {
        throw new NotFoundError(
          `No workspace found with environment ID '${id}'`,
        );
      }

      const run = await scalrApi.createRun(
        workspaceData.id,
        workspaceData.relationships['configuration-version'].data.id,
        workspaceData.relationships['latest-run'].data.id,
      );

      return run;
    },

    async listRuns({ workspace }) {
      logger.info(`workspace/runs/${workspace} was requested`);

      const response = await scalrApi.listRuns(workspace);
      const runs = response?.data;

      if (!runs) {
        const message = `No runs found for workspace '${workspace}'`;
        logger.warn(message);
        throw new NotFoundError(message);
      }

      const runList: Run[] = runs.map(mapRun);

      return {
        id: workspace,
        runs: runList,
      };
    },
  };
}
