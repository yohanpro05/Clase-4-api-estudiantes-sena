// Middleware 2: Validación de nombre
function validarNombre(req, res, next) {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ error: "El nombre es obligatorio" });
    }
    next();
}

// Middleware 3: Validación de correo
function validarCorreo(req, res, next) {
    const { correo } = req.body;
    if (!correo || !correo.includes('@')) {
        return res.status(400).json({ error: "El correo es obligatorio y debe contener un @" });
    }
    next();
}

// Middleware 4: Validación de edad
function validarEdad(req, res, next) {
    const { edad } = req.body;
    if (edad === undefined || edad <= 0) {
        return res.status(400).json({ error: "La edad es obligatoria y debe ser mayor a 0" });
    }
    next();
}

// Exportamos las funciones para que se puedan usar en el archivo de rutas
module.exports = {
    validarNombre,
    validarCorreo,
    validarEdad
};