window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);
  const defaultHours = 2;
  const defaultMinutes = 0;

  const nameField = document.getElementById("username");
  const emailField = document.getElementById("email");
  const titleField = document.getElementById("name");
  const startField = document.getElementById("start");
  const hoursField = document.getElementById("hours");
  const minutesField = document.getElementById("minutes");
  const artistsField = document.getElementById("artists");
  const locationNameField = document.getElementById("locationName");
  const addressField = document.getElementById("address");
  const descField = document.getElementById("desc");
  const websiteUrlField = document.getElementById("websiteUrl");
  const ticketUrlField = document.getElementById("ticketUrl");
  const imageField = document.getElementById("imageUrl");

  nameField.value = urlParams.has("username") ? urlParams.get("username") : "";
  emailField.value = urlParams.has("email") ? urlParams.get("email") : "";
  titleField.value = urlParams.has("name") ? urlParams.get("name") : "";
  startField.value = urlParams.has("start") ? urlParams.get("start") : "";
  hoursField.value = urlParams.has("hours") ? urlParams.get("hours") : `${defaultHours}`;
  minutesField.value = urlParams.has("minutes") ? urlParams.get("minutes") : `${defaultMinutes}`;
  artistsField.value = urlParams.has("artists") ? urlParams.get("artists") : "";
  locationNameField.value = urlParams.has("locationName") ? urlParams.get("locationName") : "";
  addressField.value = urlParams.has("address") ? urlParams.get("address") : "";
  descField.value = urlParams.has("desc") ? urlParams.get("desc") : "";
  websiteUrlField.value = urlParams.has("websiteUrl") ? urlParams.get("websiteUrl") : "";
  ticketUrlField.value = urlParams.has("ticketUrl") ? urlParams.get("ticketUrl") : "";
  imageField.value = urlParams.has("imageUrl") ? urlParams.get("imageUrl") : "";

};
