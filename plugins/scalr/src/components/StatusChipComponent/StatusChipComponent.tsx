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
      <div
        style={{ ...pillStyle, backgroundColor: '#276dee20', color: '#276dee' }}
      >
        <CircularProgress color="inherit" size={14} />
        {status}
      </div>
    );
  // yellow / warning
  if (['policy_override'].includes(status))
    return (
      <div
        style={{ ...pillStyle, backgroundColor: '#fa8c1620', color: '#fa8c16' }}
      >
        <ErrorOutlineIcon style={{ height: '18px', width: '18px' }} />
        {status}
      </div>
    );
  // red / errored
  if (['errored'].includes(status))
    return (
      <div
        style={{ ...pillStyle, backgroundColor: '#D3121220', color: '#D31212' }}
      >
        <ErrorOutlineIcon style={{ height: '18px', width: '18px' }} />
        {status}
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
          backgroundColor: '#389E8420',
          color: '#389E84',
        }}
      >
        <CheckCircleOutlineIcon style={{ height: '18px', width: '18px' }} />
        {status}
      </div>
    );
  // grey / default
  return (
    <div
      style={{ ...pillStyle, backgroundColor: '#00000020', color: '#000000' }}
    >
      {status}
    </div>
  );
};
