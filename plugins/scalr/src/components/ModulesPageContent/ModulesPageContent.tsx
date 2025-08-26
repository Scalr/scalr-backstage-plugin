import { Content, Header, Page } from '@backstage/core-components';
import React from 'react';
import { ModulesFetchComponent } from '../ModulesFetchComponent';

export function ModulesPageContent(): JSX.Element {
  return (
    <Page themeId="scalr">
      <Header
        title="Scalr Modules"
        subtitle="An overview of all your availibly Scalr Modules, filterable by namespaces"
      />
      <Content>
        <ModulesFetchComponent />
      </Content>
    </Page>
  );
}
