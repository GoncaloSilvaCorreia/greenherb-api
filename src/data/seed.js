const herbsService = require('../services/herbsService');
const plansService = require('../services/plansService');

const seedHerbs = () => {
    const herbs = [
        { name: 'Hortelã', scientificName: 'Mentha spicata', cycledays: 90, minTemp: 15, maxTemp: 25, minHumidity: 50, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000 },
        { name: 'Manjericão', scientificName: 'Ocimum basilicum', cycledays: 60, minTemp: 18, maxTemp: 28, minHumidity: 40, maxHumidity: 70, minLuminosity: 8000, maxLuminosity: 22000 },
        { name: 'Alecrim', scientificName: 'Rosmarinus officinalis', cycledays: 120, minTemp: 18, maxTemp: 27, minHumidity: 40, maxHumidity: 60, minLuminosity: 6000, maxLuminosity: 24000 },
        { name: 'Tomilho', scientificName: 'Thymus vulgaris', cycledays: 100, minTemp: 18, maxTemp: 26, minHumidity: 40, maxHumidity: 65, minLuminosity: 7000, maxLuminosity: 23000 },
        { name: 'Salvia', scientificName: 'Salvia officinalis', cycledays: 110, minTemp: 18, maxTemp: 27, minHumidity: 40, maxHumidity: 60, minLuminosity: 6000, maxLuminosity: 22000 },
        { name: 'Lavanda', scientificName: 'Lavandula angustifolia', cycledays: 150, minTemp: 18, maxTemp: 26, minHumidity: 40, maxHumidity: 55, minLuminosity: 8000, maxLuminosity: 25000 },
        { name: 'Coentros', scientificName: 'Coriandrum sativum', cycledays: 45, minTemp: 18, maxTemp: 26, minHumidity: 45, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000 },
        { name: 'Orégão', scientificName: 'Origanum vulgare', cycledays: 90, minTemp: 18, maxTemp: 27, minHumidity: 40, maxHumidity: 65, minLuminosity: 7000, maxLuminosity: 23000 },
        { name: 'Erva-cidreira', scientificName: 'Melissa officinalis', cycledays: 80, minTemp: 18, maxTemp: 26, minHumidity: 45, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000 },
        { name: 'Cebolinho', scientificName: 'Allium schoenoprasum', cycledays: 60, minTemp: 18, maxTemp: 25, minHumidity: 50, maxHumidity: 75, minLuminosity: 5000, maxLuminosity: 20000 },
    ];

    herbs.forEach(h => {
        try {
            herbsService.createHerb(h.name, h.scientificName, h.cycledays, h.minTemp, h.maxTemp, h.minHumidity, h.maxHumidity, h.minLuminosity, h.maxLuminosity);
        } catch (err) {
            console.error('Erro ao criar erva:', h.name, err.message);
        }
    });

    console.log(`[Seed] ${herbsService.getAll().length} ervas criadas`);
};

const seedPlans = () => {
    const plans = [
        { type: 'regular', minTemp: 18, maxTemp: 25, minHumidity: 40, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000, cycleDays: 90, authorizedBy: null },
        { type: 'regular', minTemp: 18, maxTemp: 26, minHumidity: 45, maxHumidity: 75, minLuminosity: 6000, maxLuminosity: 22000, cycleDays: 60, authorizedBy: null },
        { type: 'regular', minTemp: 18, maxTemp: 27, minHumidity: 40, maxHumidity: 65, minLuminosity: 7000, maxLuminosity: 23000, cycleDays: 120, authorizedBy: null },
        { type: 'emergencia', minTemp: 18, maxTemp: 25, minHumidity: 40, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000, cycleDays: 30, authorizedBy: null },
        { type: 'emergencia', minTemp: 18, maxTemp: 26, minHumidity: 45, maxHumidity: 72, minLuminosity: 6000, maxLuminosity: 21000, cycleDays: 15, authorizedBy: null },
        { type: 'pontual', minTemp: 18, maxTemp: 24, minHumidity: 40, maxHumidity: 68, minLuminosity: 5000, maxLuminosity: 20000, cycleDays: 7, authorizedBy: 'responsavel1' },
        { type: 'pontual', minTemp: 18, maxTemp: 25, minHumidity: 42, maxHumidity: 70, minLuminosity: 5500, maxLuminosity: 21000, cycleDays: 14, authorizedBy: 'responsavel2' },
        { type: 'regular', minTemp: 18, maxTemp: 26, minHumidity: 40, maxHumidity: 65, minLuminosity: 7000, maxLuminosity: 24000, cycleDays: 100, authorizedBy: null },
        { type: 'regular', minTemp: 18, maxTemp: 27, minHumidity: 40, maxHumidity: 60, minLuminosity: 8000, maxLuminosity: 25000, cycleDays: 150, authorizedBy: null },
        { type: 'emergencia', minTemp: 18, maxTemp: 25, minHumidity: 45, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000, cycleDays: 20, authorizedBy: null },
    ];

    plans.forEach(p => {
        try {
            plansService.createPlan(p.type, p.minTemp, p.maxTemp, p.minHumidity, p.maxHumidity, p.minLuminosity, p.maxLuminosity, p.cycleDays, p.authorizedBy);
        } catch (err) {
            console.error('Erro ao criar plano:', p.type, err.message);
        }
    });

    console.log(`[Seed] ${plansService.plans.length} planos criados`);
};

module.exports = { seedHerbs, seedPlans };