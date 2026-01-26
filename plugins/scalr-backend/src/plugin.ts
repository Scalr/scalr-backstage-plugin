import { coreServices, createBackendPlugin } from '@backstage/backend-plugin-api';

import { createRouter } from './router';
import { createEnvironmentService } from './services/EnvironmentService';
import { createModuleService } from './services/ModuleService';
import { createRegexService } from './services/RegexService';
import { createTagService } from './services/TagService';
import { createWorkspaceService } from './services/WorkspaceService';

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
        const regexService = await createRegexService({
          logger,
          config,
        })
        const tagService = await createTagService({
          logger,
          config,
        });
        const moduleService = await createModuleService({
          logger,
          config,
        });

        httpRouter.use(
          await createRouter({
            httpAuth,
            environmentService,
            workspaceService,
            regexService,
            tagService,
            moduleService,
          }),
        );
      },
    });
  },
});
