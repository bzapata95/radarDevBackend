const express = require("express");
const mongosse = require("mongoose");
const cors = require("cors");

const routes = require("./routes");

const app = express();

mongosse.connect(
  "URI_MONGODB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
);

app.use(cors());
// Para que entienda el servidor que estamos trabajando con JSON
app.use(express.json());
app.use(routes);

// Métodos HTTP: GET, PORST, PUT, DELETE

// Tipos de parámetos:
// Query Params: request.query (Filtros, ordenación, paginación)
// Route Params: request.params (Identificar un recurso para alterar)
// Body: request.body (Datos para creación o alreazación de un registro)

app.listen(3333);
