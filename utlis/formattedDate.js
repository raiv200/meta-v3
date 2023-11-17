export default function FormatDateTime(date) {
  let isoTimestamp = date;

  // Create a Date object from the ISO timestamp
  let newDate = new Date(isoTimestamp);

  // Extract the individual components
  let year = newDate.getFullYear();
  let month = newDate.getMonth() + 1; // Months are 0-based, so add 1
  let day = newDate.getDate();
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();
  let seconds = newDate.getSeconds();
  let milliseconds = newDate.getMilliseconds();

  // Format the components in the desired format
  let formattedDate =
    year +
    "." +
    month +
    "." +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds +
    "." +
    milliseconds;

return formattedDate
}
