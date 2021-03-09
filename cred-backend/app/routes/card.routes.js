const { authJwt } = require("../middleware");
const controller = require("../controllers/card.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/addcard",
    [authJwt.verifyToken],
    controller.addcard
  );

};
