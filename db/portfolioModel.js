const Sequelize = require('sequelize');
const connection = require('./dbConnect');

const Portfolio = connection.define('portfolios', {
  date: Sequelize.DATE,
  portfolioValue: Sequelize.FLOAT,
});

module.exports = Portfolio;