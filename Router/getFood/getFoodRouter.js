var express = require("express");
var router = express.Router();
const getFood = require("./getFood");

router.post("/", async (req, res) => {
  try {
    console.log(`--------- start get food ---------`);
    const info = req.body;

    let ret = await getFood(info);

    res.send(ret);
  } catch (e) {
    console.error("error");
  } finally {
    console.log(`--------- end get food ---------`);
    res.end();
    return;
  }
});

module.exports = router;
