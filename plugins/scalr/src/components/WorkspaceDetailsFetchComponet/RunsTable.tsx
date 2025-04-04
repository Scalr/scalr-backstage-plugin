import React from 'react';
import { Table, TableColumn } from '@backstage/core-components';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useRouteRef } from '@backstage/core-plugin-api';
import { rootRouteRef } from '../../routes';
import { Workspace } from '../../types';

type RunsTableProps = {
  workspace: Workspace;
};

export const RunsTable: React.FC<RunsTableProps> = ({ workspace }) => {
  const navigate = useNavigate();
  const rootLink = useRouteRef(rootRouteRef);

  const columns: TableColumn[] = [{ title: 'ID', field: 'id' }];

  const data = (workspace.runs || []).map(run => {
    return {
      id: run.id,
    };
  });

  return (
    <Table
      title={
        <>
          <IconButton
            aria-label="Back to Workspaces"
            size="small"
            onClick={() => {
              navigate(rootLink());
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          {workspace.id}
        </>
      }
      options={{ search: true, paging: false }}
      columns={columns}
      data={data}
    />
  );
};
