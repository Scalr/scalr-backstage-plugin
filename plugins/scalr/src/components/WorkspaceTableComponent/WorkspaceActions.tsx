import React, { useState } from 'react';
import { IconButton, CircularProgress } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { useWorkspace } from '../../hooks';
import { useApi, configApiRef } from '@backstage/core-plugin-api';

interface WorkspaceActionsProps {
  url: string;
  workspaceId: string;
}

export const WorkspaceActions: React.FC<WorkspaceActionsProps> = ({
  url,
  workspaceId,
}) => {
  const [loading, setLoading] = useState(false);
  const { triggerRun } = useWorkspace(workspaceId);

  const config = useApi(configApiRef);
  const isTriggerRunAllowed =
    config.getOptionalBoolean('integrations.scalr.allow-trigger-run') ?? false;

  const handleTriggerRun = async () => {
    setLoading(true);
    try {
      await triggerRun();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        `Failed to trigger run for workspace ${workspaceId}`,
        error,
      );
    }
    setLoading(false);
  };

  return (
    <>
      <IconButton
        aria-label="Trigger new Run"
        onClick={handleTriggerRun}
        disabled={loading || !isTriggerRunAllowed}
      >
        {loading ? <CircularProgress size={20} /> : <PlayArrowIcon />}
      </IconButton>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <IconButton aria-label="Open Workspace in Scalr">
          <OpenInNewIcon />
        </IconButton>
      </a>
    </>
  );
};
