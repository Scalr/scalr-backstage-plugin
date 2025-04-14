import React from 'react';
import { Table, TableColumn } from '@backstage/core-components';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useRouteRef } from '@backstage/core-plugin-api';
import { rootRouteRef } from '../../routes';
import { Workspace } from '../../types';
import { DateTimeDisplayComponent } from '../DateTimeComponent';
import { StatusChipComponent } from '../StatusChipComponent';
import { RunsActions } from './RunsActions';

type RunsTableProps = {
  workspace: Workspace;
};

export const RunsTable: React.FC<RunsTableProps> = ({ workspace }) => {
  const navigate = useNavigate();
  const rootLink = useRouteRef(rootRouteRef);

  const columns: TableColumn[] = [
    { title: 'ID', field: 'id' },
    { title: 'Message', field: 'message' },
    { title: 'State', field: 'state' },
    { title: 'Trigger', field: 'trigger' },
    { title: 'Actions', field: 'actions' },
  ];

  const data = (workspace.runs || []).map(run => {
    return {
      id: run.id,
      message: run.message,
      state: <StatusChipComponent status={run.state} />,
      trigger: (
        <>
          {run.source}
          <DateTimeDisplayComponent dateTime={run.time} />
          {run.user}
        </>
      ),
      actions: <RunsActions url={run.url || ''} />,
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
      options={{ search: true, paging: true }}
      // TODO: Add proper pagination with api or limit returned runs to resonable number
      columns={columns}
      data={data}
    />
  );
};
