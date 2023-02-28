const express = require("express");
const router = express.Router();
const { createState, getState, getStates, updateState } = require('../controllers/state.controller');
const { verifyToken } = require('../middlewares/authorization.middleware');




//- - - - - - - - - - - - - - INSERT - DATA - IN - USER - TABLE - - - - - - - - - - - - - -
router.post("/create-state", verifyToken, createState);

router.get("/state", verifyToken, getState);

router.get("/states", verifyToken, getStates);

router.put("/state", verifyToken, updateState);


module.exports = router;