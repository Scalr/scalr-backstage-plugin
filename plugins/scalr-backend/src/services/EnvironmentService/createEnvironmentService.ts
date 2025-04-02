import { AuthService, LoggerService } from '@backstage/backend-plugin-api';
import { NotFoundError } from '@backstage/errors';
import { catalogServiceRef } from '@backstage/plugin-catalog-node/alpha';
import { Environment, EnvironmentService } from './types';
import { mockEnvironments } from './mock';

// TEMPLATE NOTE:
// This is a simple in-memory todo list store. It is recommended to use a
// database to store data in a real application. See the database service
// documentation for more information on how to do this:
// https://backstage.io/docs/backend-system/core-services/database
export async function createEnvironmentService({
  auth,
  logger,
  catalog,
}: {
  auth: AuthService;
  logger: LoggerService;
  catalog: typeof catalogServiceRef.T;
}): Promise<EnvironmentService> {
  logger.info('Initializing EnvironmentService');

  return {
    async getEnvironment(request: { id: string }) {
      const environment: Environment | undefined = mockEnvironments.find(
        item => item.id === request.id,
      );
      if (!environment) {
        throw new NotFoundError(`No todo found with id '${request.id}'`);
      }
      return environment;
    },
  };
}
