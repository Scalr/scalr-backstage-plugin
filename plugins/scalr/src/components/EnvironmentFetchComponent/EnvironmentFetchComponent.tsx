import React from 'react';
import { Progress, ResponseErrorPanel } from '@backstage/core-components';
import { useEnvironment } from '../../hooks';
import { WorkspaceTableComponent } from '../WorkspaceTableComponent';

type EnvironmentFetchComponentProps = {
  id: string;
};

export const EnvironmentFetchComponent: React.FC<
  EnvironmentFetchComponentProps
> = ({ id }) => {
  const { environment, loading, error } = useEnvironment(id);

  if (loading) return <Progress />;
  if (error) return <ResponseErrorPanel error={error} />;

  return (
    <WorkspaceTableComponent
      title={environment!.name}
      workspaces={environment!.workspaces}
    />
  );
};
