const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require('./config/env');

const app = express();
const PORT = process.env.PORT || 3200;

//Configuracion
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
    return res.send("Hello, World!");
});

//Llamadas a las rutas
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);


// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
  });
  
  // Manejo de errores
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
  });

app.listen( PORT, () => {
    console.log(`Escuchando en puerto ${PORT}`)
})