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


export {
  getFullDateString,
  getYear,
  getMonthString,
  getDayOfWeekString,
  getDayString,
  getDateSlug,
  getTimeString,
}