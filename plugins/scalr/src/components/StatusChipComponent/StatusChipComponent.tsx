import { CircularProgress } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import React from 'react';

type StatusChipComponentProps = {
  status: string;
};

export const StatusChipComponent = ({ status }: StatusChipComponentProps) => {
  const pillStyle: React.CSSProperties = {
    display: 'inline-flex',
    flexDirection: 'row',
    gap: '6px',
    padding: '6px 6px',
    alignItems: 'center',
    borderRadius: '9999px',
    fontSize: '14px',
    fontWeight: 500,
    backgroundColor: '#00000020',
  };

  // blue / pending;
  if (
    [
      'pending',
      'plan_queued',
      'planning',
      'confirmed',
      'cost_estimating',
      'applying',
    ].includes(status)
  )
    return (
      <div style={{ ...pillStyle, color: '#276dee' }}>
        <CircularProgress color="inherit" size={14} />
        {status.replaceAll('_', ' ')}
      </div>
    );
  // yellow / warning
  if (['policy_override'].includes(status))
    return (
      <div style={{ ...pillStyle, color: '#fa8c16' }}>
        <ErrorOutlineIcon style={{ height: '18px', width: '18px' }} />
        {status.replaceAll('_', ' ')}
      </div>
    );
  // red / errored
  if (['errored'].includes(status))
    return (
      <div style={{ ...pillStyle, color: '#D31212' }}>
        <ErrorOutlineIcon style={{ height: '18px', width: '18px' }} />
        {status.replaceAll('_', ' ')}
      </div>
    );
  // green / success
  if (
    [
      'planned',
      'cost_estimated',
      'policy_checked',
      'applied',
      'planned_and_finished',
    ].includes(status)
  )
    return (
      <div
        style={{
          ...pillStyle,
          color: '#18AE94',
        }}
      >
        <CheckCircleOutlineIcon style={{ height: '18px', width: '18px' }} />
        {status.replaceAll('_', ' ')}
      </div>
    );
  // grey / default
  return (
    <div style={{ ...pillStyle, color: '#ffffff' }}>
      {status.replaceAll('_', ' ')}
    </div>
  );
};
