import { Entity } from '@backstage/catalog-model';

export const SCALR_ENVIRONMENT_ANNOTATION = 'scalr.com/environment';

export const isScalrAvailable = (entity: Entity) => {
  const annotations = entity.metadata.annotations;

  return !!annotations?.[SCALR_ENVIRONMENT_ANNOTATION];
};
