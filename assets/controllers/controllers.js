const fs= require('fs');
const path = require('path');
let reservas = [];

const filePath = path.join(__dirname, '../data/reservas.json');

const leerReservas = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const guardarReservas = async (reservas) => {
  await fs.writeFile(filePath, JSON.stringify(reservas, null, 2));
};

let idCounter = 1;

const crearReserva = async(req, res) => {
   const reservas = await leerReservas();
   const nuevaReserva = {
    id: idCounter++,
    ...req.body,
  };
  reservas.push(nuevaReserva);
  await guardarReservas(reservas);
  res.status(201).json(nuevaReserva);
};

const obtenerReservas = async(req, res) => {
  let resultado = await leerReservas();
  const { hotel, fecha_inicio, fecha_fin, tipo_habitacion, estado, num_huespedes } = req.query;

  if (hotel) resultado = resultado.filter(r => r.hotel === hotel);
  if (tipo_habitacion) resultado = resultado.filter(r => r.tipo_habitacion === tipo_habitacion);
  if (estado) resultado = resultado.filter(r => r.estado === estado);
  if (num_huespedes) resultado = resultado.filter(r => r.num_huespedes == num_huespedes);
  if (fecha_inicio && fecha_fin) {
    resultado = resultado.filter(r => {
      const fecha = new Date(r.fecha);
      return fecha >= new Date(fecha_inicio) && fecha <= new Date(fecha_fin);
    });
  }

  res.json(resultado);
};

const obtenerReservaPorId = async(req, res) => {
  const reservas= await leerReservas();
  const reserva = reservas.find(r => r.id == req.params.id);
  if (!reserva) return res.status(404).json({ error: "Reserva no encontrada" });
  res.json(reserva);
};

const actualizarReserva = async(req, res) => {
  const reservas = await leerReservas();
  const index = reservas.findIndex(r => r.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Reserva no encontrada" });
  reservas[index] = { ...reservas[index], ...req.body };
  await guardarReservas(reservas);
  res.json(reservas[index]);
};

const eliminarReserva = async(req, res) => {
  const reservas = await leerReservas();
  const index = reservas.findIndex(r => r.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Reserva no encontrada" });
  reservas.splice(index, 1);
  await guardarReservas(reservas);
  res.status(204).send();
};

module.exports = {
  crearReserva,
  obtenerReservas,
  obtenerReservaPorId,
  actualizarReserva,
  eliminarReserva
};