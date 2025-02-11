// API key and URL for fetching weather data
const apiKey = "60eb10a42c45c10730395422682f8f9d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Selecting elements from the DOM for later use
const searchBox = document.querySelector(".search input");  // City input field
const searchBtn = document.querySelector(".search button"); // Search button
const weatherIcon = document.querySelector(".weather-icon"); // Weather icon

// Function to check the weather based on the city name
async function checkWeather(city) {
    // Check if city input is empty, if so, prompt the user to enter a city
    if (!city) {
        alert("Please enter a city name.");
        return;  // Exit the function if no city is entered
    }

    // Fetch weather data from the OpenWeatherMap API
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // Check if the response status is 404 (city not found)
    if (response.status === 404) {
        document.querySelector(".err").style.display = "block";  // Show error message
        document.querySelector(".weather").style.display = "none"; // Hide weather details
    } else {
        var data = await response.json();  // Parse the JSON data from the response
        
        // Check if the status code is 400 (bad request)
        if (data.cod === "400") {
            document.querySelector(".err").style.display = "block"; // Show error message
            document.querySelector(".err").innerHTML = "Invalid city name, please try again!"; // Error message
            document.querySelector(".weather").style.display = "none"; // Hide weather details
            return;  // Exit the function
        }

        console.log(data); // Log the weather data to the console for debugging

        // Update the HTML elements with the weather information
        document.querySelector(".city").innerHTML = data.name; // Display city name
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C"; // Display temperature
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; // Display humidity
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"; // Display wind speed

        // Get the weather condition (e.g., clear, clouds, rain) and update the weather icon
        const weatherConditionsSet = new Set(["clear", "clouds", "drizzle", "mist", "rain", "snow"]);  // Set of valid weather conditions
        if (weatherConditionsSet.has(data.weather[0].main.toLowerCase())) {
            // Set the weather icon based on the condition
            weatherIcon.src = "./images/" + data.weather[0].main.toLowerCase() + ".png";
            // Update the weather condition text
            document.querySelector(".div1 h2").innerHTML = data.weather[0].main.toLowerCase();
        }

        // Show the weather data and hide the error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".err").style.display = "none";
    }
}

// Add event listener for the search button to fetch weather data when clicked
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value); // Call checkWeather with the city name entered in the search box
});

// Optionally, you could call checkWeather() with a default city on page load
checkWeather("Ahmedabad");  // Set a default city (New York) to show weather on initial load
