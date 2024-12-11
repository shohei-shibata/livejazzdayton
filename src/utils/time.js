const roundDate = (date = new Date(), minutes) => {
  const ms = minutes * 60 * 1000;
  return new Date(Math.round(new Date(date).getTime() / ms) * ms);
}

const formatTime = (timeString, options) => {
  const dateObj = new Date(timeString)
  return new Intl.DateTimeFormat("en-US", {
    ...options,
    timeZone: "America/Detroit",
  }).format(dateObj)
}
const getFullDateString = (timeString) => (
  formatTime(timeString, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
)
const getShortDateString = (timeString) => (
  formatTime(timeString, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
)
const getYear = (timeString) => (
  formatTime(timeString, {
    year: "numeric"
  })
)
const getMonthString = (timeString) => (
  formatTime(timeString, {
    month: "long"
  })
)
const getDayString = (timeString) => (
  formatTime(timeString, {
    day: "numeric"
  })
)
const getDayOfWeekString = (timeString) => (
  formatTime(timeString, {
    weekday: "long"
  })
)
const getTimeString = (timeString) => (
  formatTime(timeString, {
    hour: "numeric",
    minute: "numeric",
  })
)

const getDateSlug = (timeString) => {
  const yyyy = formatTime(timeString, { year: "numeric" })
  const mm = formatTime(timeString, { month: "numeric" })
  const dd = formatTime(timeString, { day: "numeric" })
  return `${yyyy}-${mm}-${dd}`
}


const changeTimezone = (date, timezoneString) => {
  if (!date) { return null }
  const newTimezone = new Date(new Date().toLocaleString("en-US", { timeZone: timezoneString })).getTime();
  const offset = newTimezone - new Date().getTime();
  return roundDate(new Date(new Date(date).getTime() + offset), 5);
};

function rssPubDate() {
  // Find the date of last Thursday
  const pubDate = changeTimezone(new Date(), "America/New_York");
  const d = pubDate.getDate();
  const day = pubDate.getDay();
  const daysSinceThursday = day >= 4 ? day - 4 : day + 3;
  // Uncomment line below to set the date to last Thursday.
  // Leave it commented to update every day
  pubDate.setDate(d-daysSinceThursday);
  
  return pubDate;
};

export {
  getFullDateString,
  getShortDateString,
  getYear,
  getMonthString,
  getDayOfWeekString,
  getDayString,
  getDateSlug,
  getTimeString,
  rssPubDate,
}