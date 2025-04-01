import React from 'react';
import {
  Table,
  TableColumn,
  Progress,
  ResponseErrorPanel,
} from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';
import Chip from '@material-ui/core/Chip';

export const exampleWorkspaces = {
  results: [
    {
      name: 'workspace-a',
      id: 'wsc-03sdqqw3323',
      type: 'development',
      state: 'error',
    },
    {
      name: 'workspace-b',
      id: 'wsc-0392233q22',
      type: 'staging',
      state: 'successfull',
    },
    {
      name: 'workspace-c',
      id: 'wsc-039223323',
      type: 'production',
      state: 'drifted',
    },
  ],
};

type Workspace = {
  name: string;
  id: string;
  type: string;
  state: string;
  last_execution?: Date;
};

type DenseTableProps = {
  workspaces: Workspace[];
};

export const DenseTable = ({ workspaces }: DenseTableProps) => {
  const columns: TableColumn[] = [
    { title: 'Name', field: 'name' },
    { title: 'ID', field: 'id' },
    { title: 'Type', field: 'type' },
    { title: 'State', field: 'state' },
  ];

  const data = workspaces.map(workspace => ({
    name: workspace.name,
    id: workspace.id,
    type: workspace.type,
    state: <Chip label={workspace.state} />,
  }));

  return (
    <Table
      title="Example User List"
      options={{ search: true, paging: false }}
      columns={columns}
      data={data}
    />
  );
};

export const ExampleFetchComponent = () => {
  const { value, loading, error } = useAsync(async (): Promise<Workspace[]> => {
    // Would use fetch in a real world example
    return exampleWorkspaces.results;
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  return <DenseTable workspaces={value || []} />;
};
