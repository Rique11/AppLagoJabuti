const admin = require("firebase-admin");
require("dotenv").config();
const caminhoSDK = process.env.SDKFILE;
const serviceAccount = require(`./${caminhoSDK}`); // Caminho para sua chave

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: "https://SEU_PROJETO.firebaseio.com", // opcional se não usar Realtime DB
});

module.exports = admin;
