import React from 'react';
import {
  MissingAnnotationEmptyState,
  useEntity,
} from '@backstage/plugin-catalog-react';
import {
  isScalrEnvironmentAvailable,
  isScalrTagAvailable,
  SCALR_ENVIRONMENT_ANNOTATION,
  SCALR_TAG_ANNOTATION,
} from '../../annotations';
import { EnvironmentFetchComponent } from '../EnvironmentFetchComponent';
import { TagFetchComponent } from '../TagFetchComponent';

export const EntityScalrContent = () => {
  const { entity } = useEntity();

  if (isScalrTagAvailable(entity)) {
    const tag = entity.metadata.annotations![SCALR_TAG_ANNOTATION];
    return <TagFetchComponent tagName={tag} />;
  }

  if (isScalrEnvironmentAvailable(entity)) {
    const env = entity.metadata.annotations![SCALR_ENVIRONMENT_ANNOTATION];
    return <EnvironmentFetchComponent id={env} />;
  }

  return (
    <MissingAnnotationEmptyState
      annotation={[SCALR_TAG_ANNOTATION, SCALR_ENVIRONMENT_ANNOTATION]}
    />
  );
};
