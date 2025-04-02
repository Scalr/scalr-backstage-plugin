import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './router';
import { catalogServiceRef } from '@backstage/plugin-catalog-node/alpha';
import { createEnvironmentService } from './services/EnvironmentService';

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
        catalog: catalogServiceRef,
      },
      async init({ logger, auth, httpAuth, httpRouter, catalog }) {
        const environmentService = await createEnvironmentService({
          logger,
          auth,
          catalog,
        });

        httpRouter.use(
          await createRouter({
            httpAuth,
            environmentService,
          }),
        );
      },
    });
  },
});
