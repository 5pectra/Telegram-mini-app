const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Обслуживаем статические файлы
app.use(express.static(path.join(__dirname, 'dist')));

// Все маршруты ведут на index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
