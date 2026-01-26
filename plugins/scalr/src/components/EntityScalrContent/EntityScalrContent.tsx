import { MissingAnnotationEmptyState, useEntity } from '@backstage/plugin-catalog-react';

import {
    isScalrEnvironmentAvailable, isScalrRegexAvailable, isScalrTagAvailable,
    SCALR_ENVIRONMENT_ANNOTATION, SCALR_REGEX_ANNOTATION, SCALR_TAG_ANNOTATION
} from '../../annotations';
import { EnvironmentFetchComponent } from '../EnvironmentFetchComponent';
import { RegexFetchComponent } from '../RegexFetchComponent';
import { TagFetchComponent } from '../TagFetchComponent';
import React from 'react';

export const EntityScalrContent = () => {
  const { entity } = useEntity();

 if (isScalrRegexAvailable(entity)) {
    const regex = entity.metadata.annotations![SCALR_REGEX_ANNOTATION];
    return <RegexFetchComponent regex={regex} />;
  }

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
