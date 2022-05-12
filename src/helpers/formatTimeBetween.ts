import { formatDistanceToNowStrict } from 'date-fns';
import { pt } from 'date-fns/locale';

export const formatTimeBetween = (time: any) => {
  const newTime = formatDistanceToNowStrict(new Date(time), {
    addSuffix: true,
    locale: pt,
  });
  const formattedTime = newTime.charAt(0).toUpperCase() + newTime.slice(1);

  return formattedTime;
};
