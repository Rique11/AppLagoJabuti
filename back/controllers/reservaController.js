const admin = require("../firebase");

const criarReserva = async (req, res) => {
  console.log(req.body)
  const { dia, hora, quadra, nomeAtividade, seuNome, telefone } = req.body;
  const userId = req.user.uid;

  try {
    await admin.firestore().collection("reservas").add({
      userId,
      dia,              // formato: "01/07/2025"
      hora,             // formato: "09:00 - 10:00"
      quadra,
      nomeAtividade,
      seuNome,
      telefone,
      criadaEm: new Date(),
    });

    res.status(201).json({ message: "Reserva criada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar reserva" });
  }
};

const listarReservas = async (req, res) => {
  const userId = req.user.uid;

  try {
    const snapshot = await admin.firestore()
      .collection("reservas")
      .get();

    const reservas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar reservas" });
  }
};

module.exports = { criarReserva, listarReservas };
