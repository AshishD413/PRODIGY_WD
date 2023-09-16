document.addEventListener("DOMContentLoaded", () => {
    const locationInput = document.getElementById("locationInput");
    const searchButton = document.getElementById("searchButton");
    const weatherData = document.getElementById("weatherData");

    searchButton.addEventListener("click", () => {
        const location = locationInput.value.trim();

        if (location === "") {
            alert("Please enter a location.");
            return;
        }

        // Replace 'YOUR_API_KEY' with your actual API key
        const apiKey = 'YOUR_API_KEY';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const { name, main, weather } = data;
                const temperature = main.temp;
                const description = weather[0].description;

                weatherData.innerHTML = `
                    <p><strong>Location:</strong> ${name}</p>
                    <p><strong>Temperature:</strong> ${temperature}°C</p>
                    <p><strong>Condition:</strong> ${description}</p>
                `;
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                alert("Could not fetch weather data. Please try again.");
            });
    });
});
