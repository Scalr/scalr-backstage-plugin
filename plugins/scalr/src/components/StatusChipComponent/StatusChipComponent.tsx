import { CircularProgress } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PolicyOutlinedIcon from '@material-ui/icons/PolicyOutlined';
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
  // yellow / pending approval
  if (
    ['policy_override', 'planned', 'cost_estimated', 'policy_checked'].includes(
      status,
    )
  )
    return (
      <div style={{ ...pillStyle, color: '#fa8c16', margin: '6px 0 0 0' }}>
        <PolicyOutlinedIcon style={{ height: '18px', width: '18px' }} />
        approval required
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
  if (['applied', 'planned_and_finished'].includes(status))
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
    <div style={{ ...pillStyle, color: '#bbbbbb' }}>
      <ScheduleIcon style={{ height: '18px', width: '18px' }} />
      {status.replaceAll('_', ' ')}
    </div>
  );
};
