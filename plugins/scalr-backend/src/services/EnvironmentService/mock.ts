import { Environment } from './types';

export const mockEnvironments: Environment[] = [
  {
    name: 'demo-environmet',
    id: 'env-pjosdj33er',
    workspaces: [
      {
        name: 'workspace-a',
        id: 'wsc-03sdqqw3323',
        type: 'development',
        state: 'error',
      },
      {
        name: 'workspace-b',
        id: 'wsc-0392233q22',
        type: 'staging',
        state: 'successfull',
      },
      {
        name: 'workspace-c',
        id: 'wsc-039223323',
        type: 'production',
        state: 'drifted',
      },
    ],
  },
  {
    name: 'demo-environmet-2',
    id: 'env-pjosdj33er2',
    workspaces: [
      {
        name: 'workspace-a2',
        id: 'wsc-03sdqqw33232',
        type: 'development',
        state: 'error',
      },
      {
        name: 'workspace-b2',
        id: 'wsc-0392233q222',
        type: 'staging',
        state: 'successfull',
      },
      {
        name: 'workspace-c2',
        id: 'wsc-0392233232',
        type: 'production',
        state: 'drifted',
      },
    ],
  },
];
