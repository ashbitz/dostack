const taskService = require('../services/task.service');

const obtenerTodas = (req, res) => {
    const tasks = taskService.obtenerTodas();
    res.json(tasks);
};

const crearTarea = (req, res) => {
    const {title, category, priority, completed} = req.body;

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

    // Validación
    if (!title || typeof title !== 'string' || title.trim().length < 3) {
        return res.status(400).json({
            error: 'El título es obligatorio y debe tener al menos 3 caracteres',
        });

    }

    if (!category || typeof category !== 'string' || !validCategories.includes(category.trim())) {
        return res.status(400).json({
            error: 'La categoría no es válida',
        });
    }
      
    if (!validPriorities.includes(priority)) {
        return res.status(400).json({
            error: 'La prioridad debe ser alta, media o baja',
        });
    }

    if (typeof completed !== 'boolean') {
        return res.status(400).json({
            error: 'El campo completed debe ser true o false',
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
    }   catch (error) {
        next(error);
    }
};

module.exports = {
    obtenerTodas,
    crearTarea,
    eliminarTarea,
};

