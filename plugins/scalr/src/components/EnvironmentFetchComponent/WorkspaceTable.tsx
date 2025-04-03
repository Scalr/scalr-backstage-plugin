import React from 'react';
import { Table, TableColumn } from '@backstage/core-components';
import { DateTimeDisplayComponent } from '../DateTimeComponent';
import { StatusChipComponent } from '../StatusChipComponent';
import { WorkspaceActions } from './WorkspaceActions';

export interface Workspace {
  name: string;
  id: string;
  type?: string;
  last_execution_state?: string;
  last_execution_time?: string;
  last_execution_user?: string;
}

export interface Environment {
  name: string;
  id: string;
  baseUrl: string;
  workspaces: Workspace[];
}

type WorkspaceTableProps = {
  environment: Environment;
};

export const WorkspaceTable: React.FC<WorkspaceTableProps> = ({
  environment,
}) => {
  const columns: TableColumn[] = [
    { title: 'Name', field: 'name' },
    { title: 'ID', field: 'id' },
    { title: 'Type', field: 'type' },
    { title: 'Last Execution', field: 'last_execution' },
    { title: 'State', field: 'state' },
    { title: 'Actions', field: 'actions' },
  ];

  const data = environment.workspaces.map(workspace => ({
    name: workspace.name,
    id: workspace.id,
    type: workspace.type,
    last_execution: (
      <>
        <DateTimeDisplayComponent
          dateTime={workspace.last_execution_time || 'unknown'}
        />
        {workspace.last_execution_user}
      </>
    ),
    state: (
      <StatusChipComponent
        status={workspace.last_execution_state || 'unknown'}
      />
    ),
    actions: (
      <WorkspaceActions
        workspaceId={workspace.id}
        environmentId={environment.id}
        baseUrl={environment.baseUrl}
      />
    ),
  }));

  return (
    <Table
      title={environment.name}
      options={{ search: true, paging: false }}
      columns={columns}
      data={data}
    />
  );
};
