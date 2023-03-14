const express = require("express");
const router = express.Router();
const { checkLga, createLga, getLga, getLgas, updateLga } = require('../controllers/lga.controller');
const { verifyToken } = require('../middlewares/authorization.middleware');




//- - - - - - - - - - - - - - INSERT - DATA - IN - USER - TABLE - - - - - - - - - - - - - -
router.post("/create-lga", verifyToken, checkLga, createLga);

router.get("/lga/:id", verifyToken, getLga);

router.get("/lgas", verifyToken, getLgas);

router.put("/lga", verifyToken, updateLga);


module.exports = router;