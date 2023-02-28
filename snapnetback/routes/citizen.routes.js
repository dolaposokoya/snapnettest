const express = require("express");
const router = express.Router();
const { createCitizen, getCitizen, getCitizens, updateCitizen } = require('../controllers/citizen.controller');
const { verifyToken } = require('../middlewares/authorization.middleware');




//- - - - - - - - - - - - - - INSERT - DATA - IN - USER - TABLE - - - - - - - - - - - - - -
router.post("/create-citizen", verifyToken, createCitizen);

router.get("/citizen/:id", verifyToken, getCitizen);

router.get("/citizens", verifyToken, getCitizens);

router.put("/citizen", verifyToken, updateCitizen);


module.exports = router;