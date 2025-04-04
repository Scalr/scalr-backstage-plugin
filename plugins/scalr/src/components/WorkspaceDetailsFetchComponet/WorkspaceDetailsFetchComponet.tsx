import React from 'react';
import { useParams } from 'react-router-dom';
import { Content, Header } from '@backstage/core-components';

export const WorkspaceDetailsFetchComponet = () => {
  const { id } = useParams<{ id: string }>();

  return <p>More details about item {id} go here...</p>;
};
