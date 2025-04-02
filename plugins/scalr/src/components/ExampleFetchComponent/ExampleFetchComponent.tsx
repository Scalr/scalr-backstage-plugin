import React from 'react';
import {
  Table,
  TableColumn,
  Progress,
  ResponseErrorPanel,
} from '@backstage/core-components';
import Chip from '@material-ui/core/Chip';
import { useEnvironment } from '../../hooks';

export interface Workspace {
  name: string;
  id: string;
  type?: string;
  state?: string;
  last_execution?: Date;
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
    { title: 'Last Execution', field: 'lastExecution' },
    { title: 'State', field: 'state' },
    { title: 'Actions', field: 'actions' },
  ];

  const data = environment.workspaces.map(workspace => ({
    name: workspace.name,
    id: workspace.id,
    type: workspace.type,
    state: <Chip label={workspace.state} />,
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
