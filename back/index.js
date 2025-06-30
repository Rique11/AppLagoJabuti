require("dotenv").config();
const express = require("express");
const cors = require("cors"); // <-- importar o cors
const app = express();

const reservasRouter = require("./routes/reservasRoute");
const autenticacaoRouter = require("./routes/autenticacaoRoute");
const avistamentoRouter = require("./routes/avistamentoRoute");
// Habilita CORS para todas as origens (durante o desenvolvimento)
app.use(cors()); //PARA DEV TIRAR ANTES DE PROD 

// Se quiser restringir a uma origem específica:
// app.use(cors({ origin: "http://localhost:8081" }));

// Aumenta o limite do tamanho do body (para imagens base64, etc.)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use("/api/reservas", reservasRouter);
app.use("/api/autenticacao", autenticacaoRouter);
app.use("/api/avistamento", avistamentoRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
