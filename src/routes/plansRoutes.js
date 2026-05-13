const express = require('express');
const router = express.Router();
const plansService = require('../services/plansService');

router.get('/', (req, res) => {
    res.status(200).json(plansService.plans);
});

router.post('/', (req, res) => {
    try {
        const { type, minTemp, maxTemp, minHumidity, maxHumidity, minLuminosity, maxLuminosity, cycleDays, authorizedBy } = req.body;
        const plan = plansService.createPlan(type, minTemp, maxTemp, minHumidity, maxHumidity, minLuminosity, maxLuminosity, cycleDays, authorizedBy);
        res.status(201).json(plan);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;