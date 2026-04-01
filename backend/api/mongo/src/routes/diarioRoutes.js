const express = require('express');
const router = express.Router();
const diarioController = require('../controllers/diarioController');

// Rutas para Diario
router.post('/', diarioController.create);
router.get('/', diarioController.getAll);
router.get('/:id', diarioController.getById);
router.put('/:id', diarioController.update);
router.delete('/:id', diarioController.delete);

module.exports = router;
