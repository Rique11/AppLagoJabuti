const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verificaToken");
const { criarReserva, listarReservas } = require("../controllers/reservaController");

router.post("/criaReserva", verifyToken, criarReserva);
router.get("/listaReservas", verifyToken, listarReservas);

module.exports = router;
 