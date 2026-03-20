const taskService = require('../services/task.service');

const obtenerTodas = (req, res) => {
    const tasks = taskService.obtenerTodas();
    res.json(tasks);
};

const crearTarea = (req, res) => {
    const {titulo,prioridad} = req.body;

    // Validación
    if (!titulo || typeof titulo !== 'string' || titulo.trim().length < 3) {
        return res.status(400).json({
            error: 'El título es obligatorio y debe tener al menos 3 carácteres',
        });

    }

    if (typeof prioridad !== 'number' || prioridad < 1) {
        return res.status(400).json({
            error: 'La prioridad debe ser un número positivo',
        });
    }

    const nuevaTarea = taskService.crearTarea({
        titulo,
        prioridad,
    });

    res.status(201).json(nuevaTarea);
};

const eliminarTarea = (req, res, next) => {
    try{
        const id = parseInt(req.params.id);
        taskService.eliminarTarea(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    obtenerTodas,
    crearTarea,
    eliminarTarea,
};

