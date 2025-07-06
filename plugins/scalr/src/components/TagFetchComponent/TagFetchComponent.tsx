import React from 'react';
import { Progress, ResponseErrorPanel } from '@backstage/core-components';
import { useTag } from '../../hooks';
import { WorkspaceTableComponent } from '../WorkspaceTableComponent';

type TagFetchComponentProps = {
  tagName: string;
};

export const TagFetchComponent: React.FC<TagFetchComponentProps> = ({
  tagName,
}) => {
  const { tag, loading, error } = useTag(tagName);

  if (loading) return <Progress />;
  if (error) return <ResponseErrorPanel error={error} />;

  return (
    <WorkspaceTableComponent
      title={`Tag: ${tagName}`}
      workspaces={tag!.workspaces}
    />
  );
};
