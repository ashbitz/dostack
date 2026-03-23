const { randomUUID } = require('crypto');
let tasks = [];

const obtenerTodas = () => {
    return tasks;
};

const crearTarea = (data) => {
    const nuevaTarea = {
        id: randomUUID(),
        title: data.title,
        category: data.category,
        priority: data.priority,
        completed: data.completed,
    };

    tasks.push(nuevaTarea);
    return nuevaTarea;
};

const eliminarTarea = (id) => {
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
        throw new Error('NOT_FOUND');
    }

    tasks.splice(index, 1);
};

const actualizarTarea = (id, data) => {
    const task = tasks.find((task) => task.id === id);

    if (!task) {
        throw new Error('NOT_FOUND');
    }

    task.title = data.title;
    task.category = data.category;
    task.priority = data.priority;
    task.completed = data.completed;

    return task;
};

const actualizarCompleted = (id, completed) => {
    const task = tasks.find((task) => task.id === id);

    if (!task) {
        throw new Error('NOT_FOUND');
    }

    task.completed = completed;

    return task;
};

module.exports = {
    obtenerTodas,
    crearTarea,
    eliminarTarea,
    actualizarTarea,
    actualizarCompleted,
};