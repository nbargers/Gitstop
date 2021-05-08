const db = require('../models/gitstopModel');

const dbController = {};

dbController.addUser = async (req, res, next) => {
  try {
    const queryString = `
    INSERT INTO "public"."User" (user_name, user_email)
    VALUES ($1, $2)
    `;

    const { name, email } = res.locals.userData;

    await db.query(queryString, [name, email], (resp) => {
      console.log(resp);
    });
    next();
  } catch (err) {
    next({
      log: `dbController.addUser: ${err}`,
      status: 500,
      message: `${err}`,
    });
  }
};

dbController.checkUser = async (req, res, next) => {
  try {
    const queryString = `
    SELECT * FROM "public"."User" WHERE user_name=$1
    `;

    const { name } = res.locals.userData;

    await db.query(queryString, [name], (returnedRes) => {
      try {
        req.query.userInfo = returnedRes;
      } catch (err) {
        next({
          log: `Query for checkUser: ${err}`,
          status: 500,
          message: `${err}`,
        });
      }
    });
  } catch (err) {
    next({
      log: `dbController.checkUser: ${err}`,
      status: 500,
      message: `${err}`,
    });
  }
  if (!req.query.userInfo) {
    dbController.addUser();
  }
  next();
};

module.exports = dbController;
