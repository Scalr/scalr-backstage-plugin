import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const scalrPlugin = createPlugin({
  id: 'scalr',
  routes: {
    root: rootRouteRef,
  },
});

export const EntityScalrEnvironmentContent = scalrPlugin.provide(
  createRoutableExtension({
    name: 'EntityScalrEnvironmentContent',
    component: () =>
      import('./components/EntityScalrEnvironmentContent').then(
        m => m.EntityScalrEnvironmentContent,
      ),
    mountPoint: rootRouteRef,
  }),
);
