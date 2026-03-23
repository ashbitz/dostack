const taskService = require('../services/task.service');

const validPriorities = ['alta', 'media', 'baja'];

const validCategories = [
    'trabajo',
    'hogar',
    'estudio',
    'ocio',
    'personal',
    'salud',
    'otra',
];

const validarDatosTarea = ({ title, category, priority, completed }) => {
    if (!title || typeof title !== 'string' || title.trim().length < 3) {
        return 'El título es obligatorio y debe tener al menos 3 caracteres';
    }

    if (
        !category ||
        typeof category !== 'string' ||
        !validCategories.includes(category.trim())
    ) {
        return 'La categoría no es válida';
    }

    if (!validPriorities.includes(priority)) {
        return 'La prioridad debe ser alta, media o baja';
    }

    if (typeof completed !== 'boolean') {
        return 'El campo completed debe ser true o false';
    }

    return null;
};

const obtenerTodas = (req, res) => {
    const tasks = taskService.obtenerTodas();
    res.json(tasks);
};

const crearTarea = (req, res) => {
    const { title, category, priority, completed } = req.body;

    const errorValidacion = validarDatosTarea({
        title,
        category,
        priority,
        completed,
    });

    if (errorValidacion) {
        return res.status(400).json({
            error: errorValidacion,
        });
    }

    const nuevaTarea = taskService.crearTarea({
        title: title.trim(),
        category: category.trim(),
        priority,
        completed,
    });

    res.status(201).json(nuevaTarea);
};

const eliminarTarea = (req, res, next) => {
    try {
        const id = req.params.id;
        taskService.eliminarTarea(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const actualizarTarea = (req, res, next) => {
    try {
        const id = req.params.id;
        const { title, category, priority, completed } = req.body;

        const errorValidacion = validarDatosTarea({
            title,
            category,
            priority,
            completed,
        });

        if (errorValidacion) {
            return res.status(400).json({
                error: errorValidacion,
            });
        }

        const tareaActualizada = taskService.actualizarTarea(id, {
            title: title.trim(),
            category: category.trim(),
            priority,
            completed,
        });

        res.json(tareaActualizada);
    } catch (error) {
        next(error);
    }
};

const actualizarCompleted = (req, res, next) => {
    try {
        const id = req.params.id;
        const { completed } = req.body;

        if (typeof completed !== 'boolean') {
            return res.status(400).json({
                error: 'El campo completed debe ser true o false',
            });
        }

        const tareaActualizada = taskService.actualizarCompleted(id, completed);

        res.json(tareaActualizada);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    obtenerTodas,
    crearTarea,
    eliminarTarea,
    actualizarTarea,
    actualizarCompleted,
};
