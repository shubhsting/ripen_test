const express = require("express");
const app = express();
// console.log(res.parsed);
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.get("/api/ping", (req, res) => {
    res.send("hello");
  });
app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});
