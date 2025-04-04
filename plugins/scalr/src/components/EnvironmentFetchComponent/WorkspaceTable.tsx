import React from 'react';
import { Table, TableColumn } from '@backstage/core-components';
import { DateTimeDisplayComponent } from '../DateTimeComponent';
import { StatusChipComponent } from '../StatusChipComponent';
import { WorkspaceActions } from './WorkspaceActions';
import { useRouteRef } from '@backstage/core-plugin-api';
import { workspaceRouteRef } from '../../routes';
import { Link } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Environment } from '../../types';

type WorkspaceTableProps = {
  environment: Environment;
};

export const WorkspaceTable: React.FC<WorkspaceTableProps> = ({
  environment,
}) => {
  const navigate = useNavigate();
  const detailsLink = useRouteRef(workspaceRouteRef);

  const columns: TableColumn[] = [
    { title: 'Name', field: 'name' },
    { title: 'ID', field: 'id' },
    { title: 'Type', field: 'type' },
    { title: 'Last Execution', field: 'last_execution' },
    { title: 'State', field: 'state' },
    { title: 'Actions', field: 'actions' },
  ];

  const data = environment.workspaces.map(workspace => ({
    name: (
      <Link onClick={() => navigate(detailsLink({ id: workspace.id }))}>
        {workspace.name}
      </Link>
    ),
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
