const { Pool } = require('pg');

const myURI = process.env.DB_URI;

const URI = process.env.DB_URI || myURI;
const db = new Pool({
  connectionString: URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return db.query(text, params, callback);
  },
};
