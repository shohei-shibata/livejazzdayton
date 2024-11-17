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

const getDateSlug = (timeString) => {
  const yyyy = formatTime(timeString, { year: "numeric" })
  const mm = formatTime(timeString, { month: "numeric" })
  const dd = formatTime(timeString, { day: "numeric" })
  return `${yyyy}-${mm}-${dd}`
}

const getTimeString = (timeString) => (
  formatTime(timeString, {
    hour: "numeric",
    minute: "numeric",
  })
)

export {
  getFullDateString,
  getDateSlug,
  getTimeString,
}