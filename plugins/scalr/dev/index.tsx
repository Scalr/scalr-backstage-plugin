import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { scalrPlugin, ScalrPage } from '../src/plugin';

createDevApp()
  .registerPlugin(scalrPlugin)
  .addPage({
    element: <ScalrPage />,
    title: 'Root Page',
    path: '/scalr',
  })
  .render();
