const pool = require("../../database/database");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

async function getFood(info) {
  var sql1 = `SELECT * from FOODS where name=?;`;
  var sql2 = `SELECT * from FOODS where name not like ?`;
  var sql3 = `SELECT * from FOODS`;
  let params = info;

  let ret = [];

  if (params.dislike.length !== 0) {
    for (let i = 0; i < params.dislike.length; i++) {
      params.dislike[i] = "%" + params.dislike[i] + "%";
      if (i === 0) continue;
      sql2 += "and name not like ?";
    }
    sql2 = sql2 + ";";

    [rows, col] = await pool.query(
      sql2,
      params.dislike,
      function (e, r, fields) {
        if (e) console.error(e);
      }
    );

    ret.push(rows);
  } else {
    [rows, col] = await pool.query(sql3, [], function (e, r, fields) {
      if (e) console.error(e);
    });
    ret.push(rows);
  }

  if (params.dislike.length !== 0) {
    for (let i = 0; i < params.like.length; i++) {
      [rows, col] = await pool.query(
        sql1,
        [params.like[i]],
        function (e, r, fields) {
          if (e) console.error(e);
        }
      );
      for (let j = 0; j < rows.length; j++) {
        for (let k = 0; k < 3; k++) {
          ret[0].push(rows[j]);
        }
      }
    }
  }

  let choice = getRandomInt(0, ret[0].length);

  return ret[0][choice];
}

module.exports = getFood;
