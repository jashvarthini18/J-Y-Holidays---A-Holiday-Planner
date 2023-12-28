const wrapper = document.querySelector(".wrapper"),
  inputPart = document.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-txt"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button"),
  weatherPart = wrapper.querySelector(".weather-part"),
  wIcon = weatherPart.querySelector("img"),
  arrowBack = wrapper.querySelector("header i");

let api;

//PLEASE PUT YOUR API KEY HERE
let apiKey = "b190a0605344cc4f3af08d0dd473dd25";

inputField.addEventListener("keyup", (e) => {
  // if user pressed enter btn and input value is not empty
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    // if browser support geolocation api
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser not support geolocation api");
  }
});

function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchData();
}

function onSuccess(position) {
  const { latitude, longitude } = position.coords; // getting lat and lon of the user device from coords obj
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  fetchData();
}

function onError(error) {
  // if any error occur while getting user location then we'll show it in infoText
  infoTxt.innerText = error.message;
  infoTxt.classList.add("error");
}

function fetchData() {
  infoTxt.innerText = "Getting weather details...";
  infoTxt.classList.add("pending");
  // getting api response and returning it with parsing into js obj and in another
  // then function calling weatherDetails function with passing api result as an argument
  fetch(api)
    .then((res) => res.json())
    .then((result) => weatherDetails(result))
    .catch(() => {
      infoTxt.innerText = "Something went wrong";
      infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info) {
  if (info.cod == "404") {
    // if user entered city name isn't valid
    infoTxt.classList.replace("pending", "error");
    infoTxt.innerText = `${inputField.value} isn't a valid city name`;
  } else {
    //getting required properties value from the whole weather information
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { temp, feels_like, humidity } = info.main;

    // using custom weather icon according to the id which api gives to us
    if (id == 800) {
      wIcon.src = "animated/day.svg";
    } else if (id >= 200 && id <= 232) {
      wIcon.src = "animated/thunder.svg";
    } else if (id >= 600 && id <= 622) {
      wIcon.src = "animated/cloudy.svg";
    } else if (id >= 701 && id <= 781) {
      wIcon.src = "animated/night.svg";
    } else if (id >= 801 && id <= 804) {
      wIcon.src = "animated/cloudy-day-3.svg";
    } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
      wIcon.src = "animated/rainy-1.svg";
    }

    //passing a particular weather info to a particular element
    weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
    weatherPart.querySelector(".weather").innerText = description;
    weatherPart.querySelector(
      ".location span"
    ).innerText = `${city}, ${country}`;
    weatherPart.querySelector(".temp .numb-2").innerText =
      Math.floor(feels_like);
    weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
    infoTxt.classList.remove("pending", "error");
    infoTxt.innerText = "";
    inputField.value = "";
    wrapper.classList.add("active");
  }
}

arrowBack.addEventListener("click", () => {
  wrapper.classList.remove("active");
});



//get the theme from local storage
function getTheme() {
  const theme = localStorage.getItem("theme");
  if (theme) {
    changeTheme(theme);
  }
}

//save the theme to local storage
function saveTheme(color) {
  localStorage.setItem("theme", color);
}

// ... your existing code ...

function updateWeather(data) {
  // ... your existing code ...

  // Get the temperature from the data (assuming the temperature is stored in a variable called 'temp')
  const temperature = data.main.temp;

  // Change the weather icon based on the temperature
  const weatherIcon = weatherPart.querySelector("img");
  if (temperature > 20) {
    weatherIcon.src = "animated/cloudy-day-2.svg"; // Replace with the path to the sunny weather icon
  } else {
    weatherIcon.src = "animated/rainy-1.svg"; // Replace with the path to the cloudy weather icon
  }

  // Change the background image based on the temperature
  const body = document.body;
  if (temperature > 20) {
    body.style.backgroundImage = "url('https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-cloud-background_41066-1948.jpg?w=900&t=st=1692536889~exp=1692537489~hmac=22f1eca3f0ef8d3878266019a84d0e331752c92fd788b1ae744f16d92fe2775b')";
  } else {
    body.style.backgroundImage = "url('cool-background.jpg')";
  }

  // ... rest of your code to update the DOM with weather information ...
}

// ... rest of your code ...

// Assuming you have weather icons in the "icons" folder named "sunny.svg" and "cloudy.svg"
// Replace the paths with your actual icon paths
