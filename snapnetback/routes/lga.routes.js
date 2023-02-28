const express = require("express");
const router = express.Router();
const { createLga, getLga, getLgas, updateLga } = require('../controllers/lga.controller');
const { verifyToken } = require('../middlewares/authorization.middleware');




//- - - - - - - - - - - - - - INSERT - DATA - IN - USER - TABLE - - - - - - - - - - - - - -
router.post("/create-lga", verifyToken, createLga);

router.get("/lga", verifyToken, getLga);

router.get("/lgas", verifyToken, getLgas);

router.put("/lga", verifyToken, updateLga);


module.exports = router;