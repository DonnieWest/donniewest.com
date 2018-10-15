function getMonthName(numberOfMonth) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return monthNames[numberOfMonth];
}

export default function(date) {
  return `${getMonthName(
    date.getMonth(),
  )} ${date.getDate()}, ${date.getFullYear()}`;
}
