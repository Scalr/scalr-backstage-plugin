import React from 'react';

import { Progress, ResponseErrorPanel } from '@backstage/core-components';

import { useRegex } from '../../hooks/useRegex';
import { WorkspaceTableComponent } from '../WorkspaceTableComponent';

type RegexFetchComponentProps = {
  regex: string;
};

export const RegexFetchComponent: React.FC<RegexFetchComponentProps> = ({
  regex,
}) => {
  const { workspaces, loading, error } = useRegex(regex);

  if (loading) return <Progress />;
  if (error) return <ResponseErrorPanel error={error} />;

  return (
    <WorkspaceTableComponent
      title={`Regex: ${regex}`}
      workspaces={workspaces || []}
    />
  );
};
