require('dotenv').config();
const express = require("express");
const app = express();
const reservasRoutes = require("./assets/routes/routes.js");

app.use(express.json());
app.use("/api/reservas", reservasRoutes);

const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});