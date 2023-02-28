const express = require("express");
const router = express.Router();
const { createWard, getWard, getWards, updateWard } = require('../controllers/ward.controller');
const { verifyToken } = require('../middlewares/authorization.middleware');




//- - - - - - - - - - - - - - INSERT - DATA - IN - USER - TABLE - - - - - - - - - - - - - -
router.post("/create-ward", verifyToken, createWard);

router.get("/ward", verifyToken, getWard);

router.get("/wards", verifyToken, getWards);

router.put("/ward", verifyToken, updateWard);


module.exports = router;