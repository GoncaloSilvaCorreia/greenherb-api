const express = require('express');
const router = express.Router();
const herbsService = require('../services/herbsService');

router.get('/', (req, res) => {
    res.status(200).json(herbsService.getAll());
});

router.post('/', (req, res) => {
    try {
        const { name, scientificName, cycledays, minTemp, maxTemp, minHumidity, maxHumidity, minLuminosity, maxLuminosity } = req.body;
        const herb = herbsService.createHerb(name, scientificName, cycledays, minTemp, maxTemp, minHumidity, maxHumidity, minLuminosity, maxLuminosity);
        res.status(201).json(herb);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/import', (req, res) => {
    try {
        const { rows, userRole } = req.body;
        const result = herbsService.importHerbs(rows, userRole);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;