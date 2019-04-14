export default function(date, comparedTo) {
  const created_date = !!date ? new Date(date) : new Date();
  const current_date = !!comparedTo ? new Date(comparedTo) : new Date();

  let timestamp = {};

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const created_year = created_date.getFullYear();
  const created_month = created_date.getMonth();
  const created_day = created_date.getDate();

  let created_hour = created_date.getHours();
  let created_minute = created_date.getMinutes();

  created_hour =
    created_hour === 0
      ? 12
      : created_hour > 12
      ? created_hour - 12
      : created_hour;
  created_minute = created_minute < 10 ? `0${created_minute}` : created_minute;

  const toD = created_hour > 11 ? 'PM' : 'AM';

  const createdStr = `${created_hour}:${created_minute} ${toD} • ${
    months[created_month]
  } ${created_day}, ${created_year}`;

  timestamp.createdStr = createdStr;

  const dif_seconds = Math.floor((current_date - created_date) / 1000);
  const dif_minutes = Math.floor(dif_seconds / 60);
  const dif_hours = Math.floor(dif_minutes / 60);
  const dif_day = Math.floor(dif_hours / 24);

  if (
    (current_date.getFullYear() - created_year === 1 && dif_day < 1) ||
    dif_day < 1
  ) {
    if (dif_hours >= 1) {
      timestamp.since = `${dif_hours}h`;
    } else if (dif_minutes >= 1) {
      timestamp.since = `${dif_minutes}m`;
    } else {
      if (dif_seconds < 0) {
        timestamp.since = '0s';
      } else {
        timestamp.since = `${dif_seconds}s`;
      }
    }

    return timestamp;
  }

  if (created_year !== current_date.getFullYear()) {
    timestamp.since = `${
      months[created_month]
    } ${created_day}, ${created_year}`;
  } else if (
    created_month !== current_date.getMonth() ||
    created_day !== current_date.getDate()
  ) {
    timestamp.since = `${months[created_month]} ${created_day}`;
  } else if (dif_hours >= 1) {
    timestamp.since = `${dif_hours}h`;
  } else if (dif_minutes >= 1) {
    timestamp.since = `${dif_minutes}m`;
  } else {
    if (dif_seconds < 0) {
      timestamp.since = '0s';
    } else {
      timestamp.since = `${dif_seconds}s`;
    }
  }

  return timestamp;
}
