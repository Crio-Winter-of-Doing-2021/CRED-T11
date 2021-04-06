const { authJwt, validateCard } = require("../middleware");
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
    [authJwt.verifyToken, validateCard.checkCardValidation],
    controller.addCard
  );

  app.post(
    "/api/family/addcard",
    [authJwt.verifyToken, validateCard.checkFamilyAddValidation],
    controller.addFamilyCard
  );

  app.get(
    "/api/viewcard",
    [authJwt.verifyToken],
    controller.viewCard
  );

  app.get(
    "/api/viewcard/:id",
    [authJwt.verifyToken],
    controller.viewCardById
  );
  
  app.post(
    "/api/cards/:id/statements/:year/:month",
    [validateCard.checkCardById],
    controller.statementCard
  );

  app.get(
    "/api/cards/:id/statements/:year/:month",
    [authJwt.verifyToken,validateCard.checkCardById,validateCard.checkCardByUserId],
    controller.viewStatements
  )

  app.post(
    "/api/card/:id/pay/",
    [authJwt.verifyToken,validateCard.checkCardById,validateCard.checkCardByUserId],
    controller.amountPay
  )

};
