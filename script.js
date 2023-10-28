// aguarda o evento de carregamento da página antes de executar o código
document.addEventListener("DOMContentLoaded", function() {

    const apiKey = "d73836f117cc5492eaaa0b56ab481f76";

    // define a URL base da API do OpenWeather para buscar dados de previsão do tempo
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

    // obtendo uma referência ao elemento HTML com o ID "weatherInfo" para exibir a previsão do tempo
    const weatherInfo = document.getElementById("weatherInfo");

    const getWeatherButton = document.getElementById("getWeather");

    // obtendo uma referência ao botão HTML com o ID "getWeather" para iniciar a busca do clima
    getWeatherButton.addEventListener("click", () => {
        // obtendo o valor inserdio pelo usuário no campo de entrada da cidade
        const cityInput = document.getElementById("cityInput").value;

        if (cityInput) {
            getWeather(cityInput);
        } else {
            alert("Por favor, insira o nome da cidade");
        }
    });

    // função assíncrona para buscar os dados de previsão do tempo com base na cidade
    async function getWeather(city) {
        // mostra a URL da API com a cidade e a chave da API
        const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

        try {
            // fazendo uma solicitação à API do OpenWeatherMap usando o método "fetch" e converte a resposta em JSON
            const response = await fetch(url);
            const data = await response.json();

            // verificando resposta da API e extraindo a temperatura, descrição do clima e nome da cidade
            if (data.cod === 200) {
                const temperature = Math.round(data.main.temp);
                const description = data.weather[0].description;
                const cityName = data.name;

                // exibindo as informações de previsão do tempo na página
                weatherInfo.innerHTML = `Previsão do tempo em ${cityName}: <br/>
                Temperatura: ${temperature}°C<br/>
                Condição: ${description}`;
            } else {
                weatherInfo.innerHTML = `Cidade não encontrada. Por favor, verifique o nome e tente novamente`;
            }
        } catch (error) {
            console.error("Erro ao buscar dados de previsão do tempo:", error);
            weatherInfo.innerHTML = "Erro ao buscar dados de previsão do tempo";
        }
    
    }
});
