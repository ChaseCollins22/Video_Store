const express = require('express');
const genresRouter = require('./routes/genres');

const app = express();

app.use(express.json());
app.use('/api/genres', genresRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App started at http://localhost:${PORT}`);
})
