// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    database: 'shoppingify',
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306,
  },
};
