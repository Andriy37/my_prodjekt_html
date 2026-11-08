const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;


app.use(cors()); 
app.use(express.json());


const tours = [
  { id: 1, title: 'Говерла', text: 'Чорногора · 2061 м', category: 'Гори' },
  { id: 2, title: 'Туркул', text: 'Чорногора · 1933 м', category: 'Гори' },
  { id: 3, title: 'Озеро Несамовите', text: 'найвище озеро · 1750 м', category: 'Озера' },
  { id: 4, title: 'Бануш і бринза', text: 'Гуцульська кухня', category: 'Культура' }
];


app.get('/api/projects', (req, res) => {
  res.json(tours);
});


app.post('/api/contact', (req, res) => {
  const { name, email, tour, message } = req.body;
  console.log('Отримано нову заявку:', { name, email, tour, message });

  res.status(201).json({
    ok: true,
    message: 'Заявка успішно прийнята сервером!'
  });
});

app.listen(PORT, () => {
  console.log(`Node.js API сервер запущено на http://localhost:${PORT}`);
});