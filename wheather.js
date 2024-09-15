const weatherEle = document.getElementById("wheather"); // Assuming this is the input field for city name
const formEle = document.getElementById("myForm"); // Form element
const weatherResultEle = document.getElementById("wheatherResult"); // Result display element

formEle.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page refresh on form submission

    const city = weatherEle.value; // Get city from input
    const apiKey = '8f4485f5f505ef4d2ad72e90b213a15f';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch weather data from API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) { // Corrected status code check
                // Build the weather result string
                const weatherResult = `
                    <h2>${data.name}</h2>
                    <p>Temperature: ${data.main.temp} °C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>`;

                // Display the result in the result element
                weatherResultEle.innerHTML = weatherResult;
            } else {
                // If city is not found, display an error message
                weatherResultEle.innerHTML = '<p>City not found. Please try again.</p>';
            }
        })
        .catch(error => {
            // Display error message if fetch fails
            weatherResultEle.innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
        });

    // Clear the input field after submitting
    weatherEle.value = '';
});
