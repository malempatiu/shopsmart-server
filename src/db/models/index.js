/* eslint-disable @typescript-eslint/no-var-requires */
const Sequelize = require('sequelize');
const config = require('../config/config');
const { userModel } = require('./User');

const env = process.env.NODE_ENV || 'development';
const configOptions = config[env];
const models = [userModel];
const db = {};

let sequelize = new Sequelize(
  configOptions.database, 
  configOptions.username, 
  configOptions.password, 
  configOptions
);
models.forEach(model => {
  const modelInstance = model(sequelize);
  db[modelInstance.name] = modelInstance;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

console.log('Connected to MySQL....');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
