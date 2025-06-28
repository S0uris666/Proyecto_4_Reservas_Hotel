const express = require("express");
const router = express.Router();
const {
  crearReserva,
  obtenerReservas,
  obtenerReservaPorId,
  actualizarReserva,
  eliminarReserva
} = require("../controllers/controllers.js");

router.post("/", crearReserva);
router.get("/", obtenerReservas);
router.get("/:id", obtenerReservaPorId);
router.put("/:id", actualizarReserva);
router.delete("/:id", eliminarReserva);

module.exports = router;
