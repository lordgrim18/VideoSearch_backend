const app = require('./app');
const dotenv = require('dotenv').config();
const { checkConnection } = require('./db/dbConnection');

checkConnection();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });