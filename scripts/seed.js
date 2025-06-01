const mongoose = require("mongoose");
const Pais = require("../models/Pais");
const Ciudad = require("../models/Ciudad");
const Persona = require("../models/Persona");
const Sitio = require("../models/Sitio");
require("dotenv").config();

async function seed() {
    await mongoose.connect(process.env.MONGODB_URI);

    await Pais.deleteMany({})
    await Ciudad.deleteMany({});
    await Persona.deleteMany({});
    await Sitio.deleteMany({});

    const paises = await Pais.insertMany([
        { nombre: "Colombia", ubicacion: "4.5709,-74.2973", continente: "Sur América" },
        { nombre: "Argentina", ubicacion: "-38.4161,-63.6167", continente: "Sur América" },
    ]);

    const ciudades = await Ciudad.insertMany([
        { nombre: "Bogotá", poblacion: 8000000, pais_id: paises[0]._id },
        { nombre: "Medellín", poblacion: 2500000, pais_id: paises[0]._id },
        { nombre: "Cali", poblacion: 2200000, pais_id: paises[0]._id },
        { nombre: "Cartagena", poblacion: 1000000, pais_id: paises[0]._id },
        { nombre: "Barranquilla", poblacion: 1200000, pais_id: paises[0]._id },
        { nombre: "Buenos Aires", poblacion: 15000000, pais_id: paises[1]._id },
        { nombre: "Córdoba", poblacion: 1500000, pais_id: paises[1]._id },
        { nombre: "Rosario", poblacion: 1200000, pais_id: paises[1]._id },
        { nombre: "Mendoza", poblacion: 1000000, pais_id: paises[1]._id },
        { nombre: "Salta", poblacion: 600000, pais_id: paises[1]._id },
    ]);

    const sitios = await Sitio.insertMany([
        {
            nombre: "Restaurante La Candelaria",
            tipo: "Restaurante",
            ciudad_id: ciudades[0]._id,
            ubicacion: { type: "Point", coordinates: [-74.0750, 4.6010] },
            platos: [
                { nombre: "Ajiaco", precio: 25000 },
                { nombre: "Tamal Santafereño", precio: 20000 },
            ],
        },
        {
            nombre: "El Poblado Sabores",
            tipo: "Restaurante",
            ciudad_id: ciudades[1]._id,
            ubicacion: { type: "Point", coordinates: [-75.5802, 6.2209] },
            platos: [
                { nombre: "Bandeja Paisa", precio: 28000 },
                { nombre: "Arepa de Chocolo", precio: 12000 },
            ],
        },
        {
            nombre: "Zaguán de San Antonio",
            tipo: "Restaurante",
            ciudad_id: ciudades[2]._id,
            ubicacion: { type: "Point", coordinates: [-76.5320, 3.4516] },
            platos: [
                { nombre: "Sancocho de Gallina", precio: 30000 },
                { nombre: "Chuleta Valluna", precio: 27000 },
            ],
        },
        {
            nombre: "La Mulata",
            tipo: "Restaurante",
            ciudad_id: ciudades[3]._id,
            ubicacion: { type: "Point", coordinates: [-75.5412, 10.4235] },
            platos: [
                { nombre: "Mojarra Frita", precio: 32000 },
                { nombre: "Posta Cartagenera", precio: 35000 },
            ],
        },
        {
            nombre: "El Norte Costeño",
            tipo: "Restaurante",
            ciudad_id: ciudades[4]._id,
            ubicacion: { type: "Point", coordinates: [-74.8071, 10.9828] },
            platos: [
                { nombre: "Arroz de Lisa", precio: 18000 },
                { nombre: "Butifarra", precio: 15000 },
            ],
        },
        {
            nombre: "Parrilla del Obelisco",
            tipo: "Restaurante",
            ciudad_id: ciudades[5]._id,
            ubicacion: { type: "Point", coordinates: [-58.3838, -34.6036] },
            platos: [
                { nombre: "Asado Argentino", precio: 40000 },
                { nombre: "Milanesa Napolitana", precio: 32000 },
            ],
        },
        {
            nombre: "Córdoba Bife Grill",
            tipo: "Restaurante",
            ciudad_id: ciudades[6]._id,
            ubicacion: { type: "Point", coordinates: [-64.1881, -31.4135] },
            platos: [
                { nombre: "Empanadas Criollas", precio: 15000 },
                { nombre: "Locro Cordobés", precio: 28000 },
            ],
        },
        {
            nombre: "Sabores Rosarinos",
            tipo: "Restaurante",
            ciudad_id: ciudades[7]._id,
            ubicacion: { type: "Point", coordinates: [-60.6392, -32.9448] },
            platos: [
                { nombre: "Ñoquis del 29", precio: 18000 },
                { nombre: "Guiso de Lentejas", precio: 16000 },
            ],
        },
        {
            nombre: "Bodegón Andino",
            tipo: "Restaurante",
            ciudad_id: ciudades[8]._id,
            ubicacion: { type: "Point", coordinates: [-68.8455, -32.8892] },
            platos: [
                { nombre: "Humita en Chala", precio: 14000 },
                { nombre: "Carbonada", precio: 20000 },
            ],
        },
        {
            nombre: "Salta Comidas del Norte",
            tipo: "Restaurante",
            ciudad_id: ciudades[9]._id,
            ubicacion: { type: "Point", coordinates: [-65.4129, -24.7899] },
            platos: [
                { nombre: "Tamales Salteños", precio: 13000 },
                { nombre: "Empanadas de Charqui", precio: 12000 },
            ],
        },
    ]);

    const personas = await Persona.insertMany([
        { nombre: "Shakira", tipo: "Cantante", ciudad_id: ciudades[0]._id },
        { nombre: "Juan Pablo Montoya", tipo: "Deportista", ciudad_id: ciudades[0]._id },
        { nombre: "Karol G", tipo: "Cantante", ciudad_id: ciudades[1]._id },
        { nombre: "Fernando Gaviria", tipo: "Deportista", ciudad_id: ciudades[1]._id },
        { nombre: "Yuri Buenaventura", tipo: "Cantante", ciudad_id: ciudades[2]._id },
        { nombre: "Juan Sebastián Cabal", tipo: "Deportista", ciudad_id: ciudades[2]._id },
        { nombre: "Gabo", tipo: "Escritor", ciudad_id: ciudades[3]._id },
        { nombre: "Joe Arroyo", tipo: "Cantante", ciudad_id: ciudades[4]._id },
        { nombre: "Messi", tipo: "Deportista", ciudad_id: ciudades[5]._id },
        { nombre: "Ricardo Darín", tipo: "Actor", ciudad_id: ciudades[5]._id },
        { nombre: "Soledad Pastorutti", tipo: "Cantante", ciudad_id: ciudades[6]._id },
        { nombre: "Facundo Campazzo", tipo: "Deportista", ciudad_id: ciudades[6]._id },
        { nombre: "Fito Páez", tipo: "Cantante", ciudad_id: ciudades[7]._id },
        { nombre: "Roberto Fontanarrosa", tipo: "Escritor", ciudad_id: ciudades[7]._id },
        { nombre: "Mercedes Sosa", tipo: "Cantante", ciudad_id: ciudades[8]._id },
        { nombre: "Julio Le Parc", tipo: "Artista", ciudad_id: ciudades[8]._id },
        { nombre: "Martina Stoessel", tipo: "Cantante", ciudad_id: ciudades[9]._id },
        { nombre: "Juan Martín del Potro", tipo: "Deportista", ciudad_id: ciudades[9]._id },
    ]);


    console.log("Datos insertados correctamente");
    process.exit();
}

seed();
