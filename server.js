const express = require("express");
const { expressRoutes } = require("./routes/expressRoutes");
const { connectToDB } = require("./db/dbConfig");
const cors = require("cors");
const app = express();
const res = require("dotenv").config();
// console.log(res.parsed);
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
connectToDB()
  .then((res) => {
    console.log("successfully connected");
  })
  .catch((err) => console.log(err));
app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
  expressRoutes(app);
});
