import React from 'react';
import {
  MissingAnnotationEmptyState,
  useEntity,
} from '@backstage/plugin-catalog-react';
import {
  isScalrAvailable,
  SCALR_ENVIRONMENT_ANNOTATION,
} from '../../annotations';

export const EntityScalrEnvironmentContent = () => {
  const { entity } = useEntity();

  if (isScalrAvailable(entity)) {
    return <h1>Scalr Available</h1>;
  }

  return (
    <MissingAnnotationEmptyState annotation={[SCALR_ENVIRONMENT_ANNOTATION]} />
  );
};
