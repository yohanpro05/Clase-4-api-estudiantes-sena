const express = require('express');
const app = express();

//middleware para parsear el body de las solicitudes
app.use(express.json());

//importacion de rutas
const estudiantesRoutes = require('./routes/estudiantes');

//middleware 1 log de solicitudes (globales)
app.use((req, res, next) => {
    const horaActual = new Date().toLocaleTimeString();
    console.log(`[LOG] ${req.method} ${req.url} - ${horaActual}`);
    next(); // Pasa al siguiente middleware o ruta
});

//uso de rutas
app.use('/estudiantes', estudiantesRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});