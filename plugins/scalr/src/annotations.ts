import { Entity } from '@backstage/catalog-model';

export const SCALR_ENVIRONMENT_ANNOTATION = 'scalr.com/environment';
export const SCALR_TAG_ANNOTATION = 'scalr.com/tag';

export const isScalrAvailable = (entity: Entity): boolean => {
  const { annotations = {} } = entity.metadata;

  const hasEnvironment = annotations[SCALR_ENVIRONMENT_ANNOTATION];
  const hasTag = annotations[SCALR_TAG_ANNOTATION];

  return Boolean(hasEnvironment || hasTag);
};

export const isScalrEnvironmentAvailable = (entity: Entity): boolean => {
  const { annotations = {} } = entity.metadata;

  return Boolean(annotations[SCALR_ENVIRONMENT_ANNOTATION]);
};

export const isScalrTagAvailable = (entity: Entity): boolean => {
  const { annotations = {} } = entity.metadata;

  return Boolean(annotations[SCALR_TAG_ANNOTATION]);
};
