import React from 'react';
import { Progress, ResponseErrorPanel } from '@backstage/core-components';
import { useModuleNamespaces } from '../../hooks/useModuleNamespaces';
import { ModulesTableComponent } from '../ModulesTableComponent/ModulesTableComponent';

export const ModulesFetchComponent: React.FC = () => {
  const { moduleNamespaces, loading, error } = useModuleNamespaces();

  if (loading) return <Progress />;
  if (error) return <ResponseErrorPanel error={error} />;

  return <ModulesTableComponent namespaces={moduleNamespaces ?? []} />;
};
