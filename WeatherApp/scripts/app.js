const express = require('express');
const path = require('path');
const { GetTemp } = require('./weather');

const app = express();
app.use('/css', express.static(path.join(__dirname, '../css'))) // Подключение Css папки для EJS шаблонов

app.get('/', (req, res) => { // Обработка главной страницы
  const mainPath = path.join(__dirname, '../templates/html/main.html');
  res.sendFile(mainPath);
});

app.get('/weather', (req, res) => { // Обработка и логика страницы с погодой
  GetTemp()
    .then(({ temp, precipitation }) => {
      const weatherPath = path.join(__dirname, '../templates/ejs/weather.ejs');
      res.render(weatherPath, { temp: temp, weathernow: precipitation }); 
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send('Произошла ошибка');
    });
});

app.listen(3000, () => { // Запуск проекта
  console.log('Сервер запущен на порту 3000 - http://localhost:3000');
});
