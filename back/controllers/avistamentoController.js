const admin = require("../firebase");
const nodemailer = require("nodemailer");

// Configure seu email aqui
const transporter = nodemailer.createTransport({
  service: "gmail", // ou "hotmail", "outlook", etc.
  auth: {
    user: process.env.EMAIL_ALERTA,       // configure no .env
    pass: process.env.EMAIL_SENHA,  // configure no .env
  },
});

const limparCamposUndefined = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  );
};

const registrarAvistamento = async (req, res) => {
  const { descricao, local, horario, data, suspeito, telefone, fotoUrl, nomeRelator } = req.body;
  const userId = req.user?.uid || "anônimo";

  try {
        // Salvar no Firestore
    const dadosAvistamento = {
    userId,
    descricao,
    local,
    data,
    horario,
    suspeito,
    nomeRelator,
    telefone,
    fotoUrl,
    criadoEm: new Date(),
    };

    await admin.firestore().collection("avistamentos").add(
    limparCamposUndefined(dadosAvistamento)
    );

    // Enviar e-mail
    const mailOptions = {
      from: process.env.EMAIL_ALERTA,
      to: process.env.EMAIL_DESTINO || "alertas@app.com",
      subject: "🚨 Novo Avistamento Suspeito Registrado",
      html: `
        <h2>🚨 Avistamento Suspeito</h2>
        <p><strong>Descrição:</strong> ${descricao}</p>
        <p><strong>Local:</strong> ${local}</p>
        <p><strong>Data:</strong> ${data} às ${horario}</p>
        <p><strong>Detalhes:</strong> ${suspeito}</p>
        ${fotoUrl ? `<p><strong>Foto:</strong> <a href="${fotoUrl}">${fotoUrl}</a></p>` : ""}
        <p><strong>Usuário:</strong> ${nomeRelator}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Avistamento registrado e e-mail enviado." });
  } catch (error) {
    console.error("Erro ao registrar avistamento:", error);
    res.status(500).json({ error: "Erro ao registrar avistamento." });
  }
};

module.exports = { registrarAvistamento };
