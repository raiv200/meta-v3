// Get the current time in milliseconds since Unix Epoch
const currentTimeMillis = Date.now();

// Calculate one day in milliseconds (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
const oneDayMillis = 1 * 24 * 60 * 60 * 1000;

// Calculate the endTime by subtracting one day from the current time
const startTimeMillis = currentTimeMillis - oneDayMillis;

// Convert milliseconds to Date objects
const startTime = new Date(startTimeMillis);
const endTime = new Date(currentTimeMillis);

// You can also format these dates as strings if needed
export const startTimeString = startTime.toISOString();
export const endTimeString = endTime.toISOString();









