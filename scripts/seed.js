const mongoose = require("mongoose");
const Ciudad = require("../models/Ciudad");
const Persona = require("../models/Persona");
const Sitio = require("../models/Sitio");
require("dotenv").config();

async function seed() {
    await mongoose.connect(process.env.MONGODB_URI);

    await Ciudad.deleteMany({});
    await Persona.deleteMany({});
    await Sitio.deleteMany({});

    const ciudadesCol = await Ciudad.insertMany([
        { nombre: "Bogotá", pais: "Colombia" },
        { nombre: "Medellín", pais: "Colombia" },
        { nombre: "Cali", pais: "Colombia" }
    ]);

    const ciudadesArg = await Ciudad.insertMany([
        { nombre: "Buenos Aires", pais: "Argentina" },
        { nombre: "Córdoba", pais: "Argentina" }
    ]);

    await Persona.insertMany([
        { nombre: "Shakira", tipo: "Cantante", ciudad_id: ciudadesCol[0]._id },
        { nombre: "Juanes", tipo: "Cantante", ciudad_id: ciudadesCol[1]._id },
        { nombre: "Messi", tipo: "Deportista", ciudad_id: ciudadesArg[0]._id },
        { nombre: "Maradona", tipo: "Deportista", ciudad_id: ciudadesArg[1]._id }
    ]);

    await Sitio.insertMany([
        {
            nombre: "Museo del Oro",
            tipo: "Museo",
            ciudad_id: ciudadesCol[0]._id,
            ubicacion: { type: "Point", coordinates: [-74.0721, 4.5981] },
            platos: [{ nombre: "Ajiaco", precio: 25000 }]
        },
        {
            nombre: "Teatro Colón",
            tipo: "Teatro",
            ciudad_id: ciudadesArg[0]._id,
            ubicacion: { type: "Point", coordinates: [-58.3816, -34.6037] },
            platos: []
        }
    ]);

    await Sitio.insertMany([
        {
            nombre: "Cristo Rey",
            tipo: "Estatua",
            ciudad_id: ciudadesCol[2]._id,
            ubicacion: { type: "Point", coordinates: [-76.5589, 3.4182] },
            platos: []
        },
        {
            nombre: "Zoológico de Cali",
            tipo: "Parque",
            ciudad_id: ciudadesCol[2]._id,
            ubicacion: { type: "Point", coordinates: [-76.5493, 3.4406] },
            platos: []
        },
        {
            nombre: "Restaurante Ringlete",
            tipo: "Restaurante",
            ciudad_id: ciudadesCol[2]._id,
            ubicacion: { type: "Point", coordinates: [-76.5315, 3.4372] },
            platos: [
                { nombre: "Sancocho de gallina", precio: 28000 },
                { nombre: "Chontaduro con miel", precio: 8000 }
            ]
        }
    ]);


    console.log("Datos insertados correctamente");
    process.exit();
}

seed();
