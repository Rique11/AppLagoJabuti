const fetch = require("node-fetch");
const admin = require("../firebase"); // Certifique-se que está usando firebase-admin
const crypto = require("crypto");

const hashCpf = (cpf) => {
  return crypto.createHash("sha256").update(cpf).digest("hex");
};

const register = async (req, res) => {
  const { email, password, cpf } = req.body;

  if (!cpf) {
    return res.status(400).json({ error: "CPF é obrigatório" });
  }

  try {
        const cpfHash = hashCpf(cpf);

        // Verificar se já existe usuário com esse CPF
        const snapshot = await admin.firestore()
          .collection("usuarios")
          .where("cpfHash", "==", cpfHash)
          .get();

        if (!snapshot.empty) {
          return res.status(400).json({ error: "CPF já cadastrado" });
        }

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }
    
    // ⬇️ Aqui salvamos no Firestore
    await admin.firestore().collection("usuarios").doc(data.localId).set({
      email: data.email,
      cpfHash,
      criadoEm: new Date(),
  userId: data.localId  
    });

    res.json({
      idToken: data.idToken,
      userId: data.localId,
      email: data.email,
    });

  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};

const login = async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;

  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(401).json({ error: data.error.message });
    }

    res.json({
      idToken: data.idToken,
      userId: data.localId,
      email: data.email,
    });

  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};

module.exports = { login, register};
