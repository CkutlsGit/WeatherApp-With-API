const fetch = require('node-fetch');

function GetTemp() {
  const apiKey = 'YOUR_API_KEY';
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Krasnodar/2023-07-09?&key=${apiKey}&include=currentConditions`;

  return new Promise((resolve, reject) => { // Запрос к API и получение ответа о погоде и температуре в данный момент.
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const tempF = data.days[0].temp;
        const tempC = (tempF - 32) * 5/9;

        const precipitationType = data.days[0].preciptype[0];
        const translatedPrecipitationType = translatePrecipitationType(precipitationType); 
        resolve({ temp: tempC.toFixed(0), precipitation: translatedPrecipitationType }); // Перевод с Английского на Русский
      })
      .catch(error => {
        console.error('Error:', error);
        reject(error);
      });
  });
}

function translatePrecipitationType(precipitationType) { // Функция для перевода, супер простая.
  if (precipitationType.toLowerCase() === 'rain') {
    return 'Дождь';
  }
  if (precipitationType.toLowerCase() === 'snow') {
    return 'Снег';
  }
  else {
    return 'Ясно';
  }
}

module.exports = {
  GetTemp
};
