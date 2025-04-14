import { createRouteRef, createSubRouteRef } from '@backstage/core-plugin-api';

export const rootRouteRef = createRouteRef({
  id: 'scalr',
});

export const workspaceRouteRef = createSubRouteRef({
  id: 'scalr-workspace',
  path: '/:id',
  parent: rootRouteRef,
});
