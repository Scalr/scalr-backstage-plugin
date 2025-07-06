import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './router';
import { createEnvironmentService } from './services/EnvironmentService';
import { createWorkspaceService } from './services/WorkspaceService';
import { createTagService } from './services/TagService';

/**
 * scalrPlugin backend plugin
 *
 * @public
 */
export const scalrPlugin = createBackendPlugin({
  pluginId: 'scalr',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        auth: coreServices.auth,
        httpAuth: coreServices.httpAuth,
        httpRouter: coreServices.httpRouter,
        config: coreServices.rootConfig,
      },
      async init({ logger, httpAuth, httpRouter, config }) {
        const environmentService = await createEnvironmentService({
          logger,
          config,
        });
        const workspaceService = await createWorkspaceService({
          logger,
          config,
        });
        const tagService = await createTagService({
          logger,
          config,
        });

        httpRouter.use(
          await createRouter({
            httpAuth,
            environmentService,
            workspaceService,
            tagService,
          }),
        );
      },
    });
  },
});
