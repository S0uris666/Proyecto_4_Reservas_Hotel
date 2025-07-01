import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import specs from './assets/config/swagger/swagger.js';
import reservasRoutes from './assets/routes/routes.js';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json());
app.use('/api/reservas', reservasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});