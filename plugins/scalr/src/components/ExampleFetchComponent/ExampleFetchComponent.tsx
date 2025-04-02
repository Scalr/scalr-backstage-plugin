import React from 'react';
import {
  Table,
  TableColumn,
  Progress,
  ResponseErrorPanel,
} from '@backstage/core-components';
import Chip from '@material-ui/core/Chip';
import { IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { useEnvironment } from '../../hooks';

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
  workspaces: Workspace[];
}

type DenseTableProps = {
  environment: Environment;
};

export const DenseTable = ({ environment }: DenseTableProps) => {
  const columns: TableColumn[] = [
    { title: 'Name', field: 'name' },
    { title: 'ID', field: 'id' },
    { title: 'Type', field: 'type' },
    { title: 'Updated At', field: 'updatedAt' },
    { title: 'Updated By', field: 'updatedBy' },
    { title: 'State', field: 'state' },
    { title: 'Actions', field: 'actions' },
  ];

  const data = environment.workspaces.map(workspace => ({
    name: workspace.name,
    id: workspace.id,
    type: workspace.type,
    updatedAt: workspace.last_execution_time,
    updatedBy: workspace.last_execution_user,
    state: <Chip label={workspace.last_execution_state} />,
    actions: (
      <>
        <IconButton aria-label="Trigger new Run" component="span">
          <PlayArrowIcon />
        </IconButton>
        <IconButton aria-label="Open Workspace in Scalr" component="span">
          <OpenInNewIcon />
        </IconButton>
      </>
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

type ExampleFetchComponentProps = {
  id: string;
};

export const ExampleFetchComponent = ({ id }: ExampleFetchComponentProps) => {
  const { environment, loading, error } = useEnvironment(id);

  if (loading) return <Progress />;
  if (error) return <ResponseErrorPanel error={error} />;
  return <DenseTable environment={environment} />;
};
