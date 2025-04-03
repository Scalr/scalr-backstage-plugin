import React from 'react';
import { Progress, ResponseErrorPanel } from '@backstage/core-components';
import { useEnvironment } from '../../hooks';
import { WorkspaceTable } from './WorkspaceTable';

type EnvironmentFetchComponentProps = {
  id: string;
};

export const EnvironmentFetchComponent: React.FC<
  EnvironmentFetchComponentProps
> = ({ id }) => {
  const { environment, loading, error } = useEnvironment(id);

  if (loading) return <Progress />;
  if (error) return <ResponseErrorPanel error={error} />;

  return <WorkspaceTable environment={environment} />;
};
