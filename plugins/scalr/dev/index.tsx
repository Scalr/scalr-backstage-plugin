import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { ModulesPage, scalrPlugin } from '../src/plugin';

createDevApp()
  .registerPlugin(scalrPlugin)
  .addPage({
    element: <ModulesPage status="planning" />,
    title: 'Modules Page',
    path: '/modules',
  })
  .render();
