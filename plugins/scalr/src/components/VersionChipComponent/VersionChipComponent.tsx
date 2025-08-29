import React from 'react';

type VersionChipComponentProps = {
  version?: string;
};

export const VersionChipComponent = ({
  version,
}: VersionChipComponentProps) => {
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

  if (version)
    return <div style={{ ...pillStyle, color: '#ffffff' }}>{version}</div>;
  return <div style={{ ...pillStyle, color: '#D31212' }}>No Versions</div>;
};
