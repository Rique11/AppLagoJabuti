const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verificaToken");
const { registrarAvistamento } = require("../controllers/avistamentoController");

router.post("/registrar", verifyToken, registrarAvistamento);

module.exports = router;
