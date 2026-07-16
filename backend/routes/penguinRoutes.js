const express = require('express');
const router = express.Router();
const penguinController = require('../controllers/penguinController');

router.get('/', penguinController.getAllPenguins);
router.get('/:id', penguinController.getPenguinById);
router.post('/', penguinController.createPenguin);
router.put('/:id', penguinController.updatePenguin);
router.delete('/:id', penguinController.deletePenguin);

module.exports = router;
