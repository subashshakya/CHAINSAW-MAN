'use strict';

const { Pool } = require('pg');
const pool = new Pool({
  host: 'db',
  port: 5432,
  user: 'saladhunter',
  password: 'postgresPWD',
  database: 'CHAINSAW-MAN'
});

module.exports = pool;