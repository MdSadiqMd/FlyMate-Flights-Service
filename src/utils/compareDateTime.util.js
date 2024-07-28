function compareDateTime(timeString1, timeString2) {
  let dateTime1 = new Date(timeString1);
  let dateTime2 = new Date(timeString2);
  return (
    dateTime1.getTime() > dateTime2.getTime() &&
    dateTime1.getDate() > dateTime2.getDate()
  );
}

module.exports = {
  compareDateTime,
};
