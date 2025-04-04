import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef, workspaceRouteRef } from './routes';

export const scalrPlugin = createPlugin({
  id: 'scalr',
  routes: {
    root: rootRouteRef,
    workspace: workspaceRouteRef,
  },
});

export const EntityScalrEnvironmentContent = scalrPlugin.provide(
  createRoutableExtension({
    name: 'EntityScalrEnvironmentContent',
    component: () => import('./components/test').then(m => m.MyPage),
    mountPoint: rootRouteRef,
  }),
);
