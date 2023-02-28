const express = require("express");
const router = express.Router();
const { findUser, registerUser, loginUser, getAllUser, requestAccessToken } = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/authorization.middleware');




//- - - - - - - - - - - - - - INSERT - DATA - IN - USER - TABLE - - - - - - - - - - - - - -
router.post("/create-user", findUser, registerUser);

router.post("/login-user", loginUser);

router.post("/get-users", verifyToken, getAllUser);

router.post("/token", requestAccessToken);



module.exports = router;