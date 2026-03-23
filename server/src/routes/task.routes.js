const express = require('express');
const taskController = require('../controllers/task.controller');

const router = express.Router();

router.get('/', taskController.obtenerTodas);
router.post('/', taskController.crearTarea);
router.put('/:id', taskController.actualizarTarea);
router.patch('/:id/completed', taskController.actualizarCompleted);
router.delete('/:id', taskController.eliminarTarea);

module.exports = router;