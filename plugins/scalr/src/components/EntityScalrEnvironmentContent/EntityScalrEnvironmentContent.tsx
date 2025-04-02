import React from 'react';
import {
  MissingAnnotationEmptyState,
  useEntity,
} from '@backstage/plugin-catalog-react';
import {
  isScalrAvailable,
  SCALR_ENVIRONMENT_ANNOTATION,
} from '../../annotations';
import { EnvironmentFetchComponent } from '../EnvironmentFetchComponent';

export const EntityScalrEnvironmentContent = () => {
  const { entity } = useEntity();

  if (isScalrAvailable(entity)) {
    const env = entity.metadata.annotations![SCALR_ENVIRONMENT_ANNOTATION];
    return <EnvironmentFetchComponent id={env} />;
  }

  return (
    <MissingAnnotationEmptyState annotation={[SCALR_ENVIRONMENT_ANNOTATION]} />
  );
};
