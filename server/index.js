const cors = require('cors');
const express = require('express');

const data = require('./sales.json');


const app = express();
app.use(cors());
app.get('/sales', (request, response) => response.json(data));
// eslint-disable-next-line no-console
app.listen(8000, () => console.log('🚀 Server is listening on port 8000'));
