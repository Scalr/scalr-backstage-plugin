import React from 'react';
import { IconButton } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

interface ModuleActionsProps {
  url: string;
}

export const ModuleActions: React.FC<ModuleActionsProps> = ({ url }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <IconButton aria-label="Open Module in Scalr">
        <OpenInNewIcon />
      </IconButton>
    </a>
  );
};
