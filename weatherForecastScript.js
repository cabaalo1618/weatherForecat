
document.addEventListener('DOMContentLoaded', function () {
    const API_KEY = 'API_KEY';
    const citySelect = document.getElementById('city-select');
    const getForecastBtn = document.getElementById('get-forecast-btn');
    const forecastDiv = document.getElementById('forecast');
    const weatherImages = {
        "clear sky": "images/sun.png",
        "overcast clouds": "images/partly-cloudy.png",
        "scattered clouds": "images/cloudy.png",
        "broken clouds": "images/cloudy.png",
        "light rain": "images/shower-rain.png",
        "moderate rain": "images/rain.png",
        "thunderstorm": "images/thunderstorm.png",
        "snow": "images/snow.png",
        "mist": "images/mist.png"
    };

    getForecastBtn.addEventListener('click', function () {
        const city = citySelect.value;

        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falha ao obter os dados do clima.');
                }
                return response.json();
            })
            .then(data => {
                const forecastList = data.list.filter(item => item.dt_txt.includes('12:00:00')); 
                renderForecast(forecastList);
            })
            .catch(error => {
                console.error('Erro ao obter os dados do clima:', error);
            });
    });


    function renderForecast(forecastList) {
        forecastDiv.innerHTML = '';

        forecastList.forEach(item => {
            const forecastDate = new Date(item.dt * 1000);
            const dayOfWeek = forecastDate.toLocaleDateString('pt-BR', { weekday: 'long' });
            const temperature = item.main.temp.toFixed(1);
            const description = item.weather[0].description;

            const forecastItem = document.createElement('div');
            forecastItem.classList.add('container','sm','resposta');
            forecastItem.innerHTML = `
                <div><strong>${dayOfWeek}</strong></div>
                <div>Temperatura: ${temperature}°C</div>
                <div>Descrição: ${description}</div>
                <img src="images/${weatherImages[description]}" alt="${description}">
            `;

            forecastDiv.appendChild(forecastItem);
        });
    }

});




