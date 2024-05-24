function onTimezoneChange(event) {
  if (event.target.value.length > 0) {
    let newTimezone = event.target.value;
    if (newTimezone === "current") {
      newTimezone = moment.tz.guess();
    }

    additionalTimezones.unshift(currentCityTimezone);
    additionalTimezones = additionalTimezones.filter(
      (tz) => tz !== newTimezone
    );
    currentCityTimezone = newTimezone;
    if (additionalTimezones > 5) {
      additionalTimezones.pop();
    }

    updateMainCityCard(currentCityTimezone);
    updateAdditionalCityCards();
  }
}

function updateMainCityCard(timezone) {
  titleElement.innerHTML = timezone.replace("_", " ").split("/")[1];
  timeElement.innerHTML = moment.tz(timezone).format("HH:mm:ss");
  dateElement.innerHTML = moment.tz(timezone).format("MMMM Do YYYY, Z");
  setTheme();
}

function updateAdditionalCityCards() {
  for (let i = 0; i < additionalCityCards.length; i++) {
    if (additionalTimezones[i]) {
      let timezone = additionalTimezones[i];
      additionalCityCards[i].querySelector(".city-title").innerHTML = timezone
        .replace("_", " ")
        .split("/")[1];
      additionalCityCards[i].querySelector(".city-time").innerHTML = moment
        .tz(timezone)
        .format("HH:mm:ss");
      additionalCityCards[i].querySelector(".city-date").innerHTML = moment
        .tz(timezone)
        .format("MMMM Do YYYY, Z");
    }
  }
}

function updateTime() {
  timeElement.innerHTML = moment.tz(currentCityTimezone).format("HH:mm:ss");
  additionalCityCards.forEach((card, index) => {
    if (additionalTimezones[index]) {
      card.querySelector(".city-time").innerHTML = moment
        .tz(additionalTimezones[index])
        .format("HH:mm:ss");
    }
  });
}

function setTheme() {
  let hour = parseInt(moment.tz(currentCityTimezone).format("HH"));
  let theme;
  switch (true) {
    case hour >= 6 && hour < 12:
      theme = "morning";
      break;
    case hour >= 12 && hour < 18:
      theme = "afternoon";
      break;
    case hour >= 18 && hour < 22:
      theme = "evening";
      break;
    case hour >= 22 || hour < 6:
      theme = "night";
      break;
    default:
      theme = "morning";
  }
  document.body.className = theme;
}

let currentCityTimezone = "Europe/London";
let additionalTimezones = [
  "Asia/Tokyo",
  "America/New_York",
  "Asia/Dubai",
  "Europe/Paris",
];

let mainCityCard = document.querySelector(".city-card.main");
let titleElement = mainCityCard.querySelector(".city-title");
let timeElement = mainCityCard.querySelector(".city-time");
let dateElement = mainCityCard.querySelector(".city-date");

let additionalCityCards = document.querySelectorAll(".additional");

let citiesSelectElement = document.querySelector("#city-select");
citiesSelectElement.addEventListener("change", onTimezoneChange);

updateMainCityCard(currentCityTimezone);
updateAdditionalCityCards();

setInterval(updateTime, 1000);
