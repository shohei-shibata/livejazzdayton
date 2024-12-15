const GOOGLE_API_KEY = import.meta.env.GOOGLE_API_KEY;

function getGoogleMapsEmbedUrl(locationName: string, locationAddress: string) {
  const locationNameEscaped = locationName ? 
    locationName.replace("&", "and") : "";
  const queryString = locationAddress ? 
    `${locationNameEscaped}, ${locationAddress}`
    :
    `${locationNameEscaped} near Dayton, Ohio`;

  return `https://www.google.com/maps/embed/v1/search?q=${queryString.replaceAll(" ", "+")}&key=${GOOGLE_API_KEY}`
}

export {
  getGoogleMapsEmbedUrl
}