import React from 'react';

type DateTimeDisplayComponentProps = {
  dateTime: string;
};

export const DateTimeDisplayComponent = ({
  dateTime,
}: DateTimeDisplayComponentProps) => {
  const date = new Date(dateTime);
  // eslint-disable-next-line new-cap
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const formattedDate = new Intl.DateTimeFormat('us-en', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: userTimeZone,
  }).format(date);

  return <p>{formattedDate}</p>;
};
