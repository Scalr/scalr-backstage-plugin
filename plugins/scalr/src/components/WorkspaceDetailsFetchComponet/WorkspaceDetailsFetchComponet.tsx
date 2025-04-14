import React from 'react';
import { RunsTable } from './RunsTable';
import { useParams } from 'react-router-dom';
import { useRuns } from '../../hooks';
import { Progress, ResponseErrorPanel } from '@backstage/core-components';

export const WorkspaceDetailsFetchComponet: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { workspace, loading, error } = useRuns(id!);

  if (loading) return <Progress />;
  if (error) return <ResponseErrorPanel error={error} />;
  if (id) return <RunsTable workspace={workspace!} />;
  return <p>No data</p>;
};
