const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const cors = require("cors");

const indexRouter = require("./Router/indexRouter");

const getFoodRouter = require("./Router/getFood/getFoodRouter");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(indexRouter);

app.use("/getFood", getFoodRouter);

const port = 5050;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
