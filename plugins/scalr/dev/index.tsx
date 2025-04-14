import { createDevApp } from '@backstage/dev-utils';
import { scalrPlugin } from '../src/plugin';

createDevApp()
  .registerPlugin(scalrPlugin)
  // .addPage({
  //   element: <ScalrPage />,
  //   title: 'Root Page',
  //   path: '/scalr',
  // })
  .render();
