const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 4000;



app.use(express.json());
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
