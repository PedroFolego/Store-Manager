const app = require('./app');
const router = require('./routes/index');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
require('dotenv').config();

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto
app.use(router);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
