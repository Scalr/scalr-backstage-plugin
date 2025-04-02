import React from 'react';
import {
  MissingAnnotationEmptyState,
  useEntity,
} from '@backstage/plugin-catalog-react';
import {
  isScalrAvailable,
  SCALR_ENVIRONMENT_ANNOTATION,
} from '../../annotations';
import { ExampleFetchComponent } from '../ExampleFetchComponent/ExampleFetchComponent';

export const EntityScalrEnvironmentContent = () => {
  const { entity } = useEntity();

  if (isScalrAvailable(entity)) {
    const env = entity.metadata.annotations!['scalr/environment'];
    return <ExampleFetchComponent id={env} />;
  }

  return (
    <MissingAnnotationEmptyState annotation={[SCALR_ENVIRONMENT_ANNOTATION]} />
  );
};
