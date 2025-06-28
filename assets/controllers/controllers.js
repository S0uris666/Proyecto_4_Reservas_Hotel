let reservas = [];
let idCounter = 1;

const crearReserva = (req, res) => {
  const nuevaReserva = {
    id: idCounter++,
    ...req.body,
  };
  reservas.push(nuevaReserva);
  res.status(201).json(nuevaReserva);
};

const obtenerReservas = (req, res) => {
  let resultado = reservas;
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

const obtenerReservaPorId = (req, res) => {
  const reserva = reservas.find(r => r.id == req.params.id);
  if (!reserva) return res.status(404).json({ error: "Reserva no encontrada" });
  res.json(reserva);
};

const actualizarReserva = (req, res) => {
  const index = reservas.findIndex(r => r.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Reserva no encontrada" });
  reservas[index] = { ...reservas[index], ...req.body };
  res.json(reservas[index]);
};

const eliminarReserva = (req, res) => {
  const index = reservas.findIndex(r => r.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Reserva no encontrada" });
  reservas.splice(index, 1);
  res.status(204).send();
};

module.exports = {
  crearReserva,
  obtenerReservas,
  obtenerReservaPorId,
  actualizarReserva,
  eliminarReserva
};