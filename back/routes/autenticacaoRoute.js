const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/autenticacaoController");

router.post("/login", login);
router.post("/register", register);

module.exports = router;
