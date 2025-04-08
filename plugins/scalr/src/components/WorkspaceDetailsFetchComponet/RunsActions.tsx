import React from 'react';
import { IconButton } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

interface RunsActionsProps {
  url: string;
}

export const RunsActions: React.FC<RunsActionsProps> = ({ url }) => {
  return (
    <>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <IconButton aria-label="Open Workspace in Scalr">
          <OpenInNewIcon />
        </IconButton>
      </a>
    </>
  );
};
