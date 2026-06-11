const express = require('express');
const router = express.Router();

// 1. CORREGIDO: Importamos las validaciones correctas de estudiantes
const { validarNombre, validarCorreo, validarEdad } = require('../middlewares/validaciones');

// datos simulados de estudiantes
let estudiantes = [
    { id: 1, nombre: "Edi Yohan", correo: "edyohan@example.com", edad: 25 },
];

// get de estudiantes
router.get('/', (req, res) => {
    res.json(estudiantes);
});

// 2. CORREGIDO: Añadimos [validarNombre, validarCorreo, validarEdad] en orden
router.post('/', [validarNombre, validarCorreo, validarEdad], (req, res) => {
    const { nombre, correo, edad } = req.body;
    const nuevoEstudiante = {
        id: estudiantes.length + 1,
        nombre,
        correo,
        edad
    };
    estudiantes.push(nuevoEstudiante);
    res.status(201).json({
        mensaje: "Estudiante creado con éxito",
        estudiante: nuevoEstudiante
    });
});

// 3. CORREGIDO: Añadimos las validaciones también al PUT y cambiamos .find por .findIndex
router.put('/:id', [validarNombre, validarCorreo, validarEdad], (req, res) => {
    const { id } = req.params;
    const { nombre, correo, edad } = req.body;
    
    // Usamos findIndex para obtener la posición exacta en el arreglo
    const index = estudiantes.findIndex(est => est.id === parseInt(id));
    
    if (index === -1) {
        return res.status(404).json({ error: "Estudiante no encontrado" });
    }
    
    estudiantes[index] = { id: parseInt(id), nombre, correo, edad };
    res.json({
        mensaje: "Estudiante actualizado con éxito",
        estudiante: estudiantes[index]
    });
});

// 4. CORREGIDO: Cambiamos .find por .findIndex para que funcione bien el borrado
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    const index = estudiantes.findIndex(est => est.id === parseInt(id));
    
    if (index === -1) {
        return res.status(404).json({ error: "Estudiante no encontrado" });
    }
    
    const eliminado = estudiantes.splice(index, 1);
    res.json({
        mensaje: "Estudiante eliminado con éxito",
        estudiante: eliminado[0]
    });
});

module.exports = router;