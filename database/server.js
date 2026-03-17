const app = require('./app.js')
const database = require('./db/db.js')
const dotenv = require('dotenv')

dotenv.config();

const Port = process.env.PORT;

database()
  .then(() => {
    app.listen(Port, () => {
      console.log(`App is listening on http://localhost:${Port}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed:", err);
  });
  