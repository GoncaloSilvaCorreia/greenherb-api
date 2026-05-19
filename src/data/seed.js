const herbsService = require('../services/herbsService');
const plansService = require('../services/plansService');
const batchesService = require('../services/batchesService');
const measurementsService = require('../services/measurementsService');
const alertsService = require('../services/alertsServices');
const automationService = require('../services/automationService');
const authService = require('../services/authService');

const seedUsers = async () => {
    const users = [
        { username: 'admin', password: '123456', role: 'Administrador' },
        { username: 'responsavel', password: '123456', role: 'Responsavel' },
        { username: 'tecnico', password: '123456', role: 'Tecnico' },
    ];
    for (const u of users) {
        try { await authService.register(u.username, u.password, u.role); } catch (e) {}
    }
    console.log(`[Seed] ${authService.users.length} utilizadores criados`);
};

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
        try { herbsService.createHerb(h.name, h.scientificName, h.cycledays, h.minTemp, h.maxTemp, h.minHumidity, h.maxHumidity, h.minLuminosity, h.maxLuminosity); } catch (e) {}
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
        { type: 'pontual', minTemp: 18, maxTemp: 24, minHumidity: 40, maxHumidity: 68, minLuminosity: 5000, maxLuminosity: 20000, cycleDays: 7, authorizedBy: 'responsavel' },
        { type: 'pontual', minTemp: 18, maxTemp: 25, minHumidity: 42, maxHumidity: 70, minLuminosity: 5500, maxLuminosity: 21000, cycleDays: 14, authorizedBy: 'responsavel' },
        { type: 'regular', minTemp: 18, maxTemp: 26, minHumidity: 40, maxHumidity: 65, minLuminosity: 7000, maxLuminosity: 24000, cycleDays: 100, authorizedBy: null },
        { type: 'regular', minTemp: 18, maxTemp: 27, minHumidity: 40, maxHumidity: 60, minLuminosity: 8000, maxLuminosity: 25000, cycleDays: 150, authorizedBy: null },
        { type: 'emergencia', minTemp: 18, maxTemp: 25, minHumidity: 45, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000, cycleDays: 20, authorizedBy: null },
    ];
    plans.forEach(p => {
        try { plansService.createPlan(p.type, p.minTemp, p.maxTemp, p.minHumidity, p.maxHumidity, p.minLuminosity, p.maxLuminosity, p.cycleDays, p.authorizedBy); } catch (e) {}
    });
    console.log(`[Seed] ${plansService.plans.length} planos criados`);
};

const seedBatches = () => {
    const batches = [
        { herbId: 1, planId: 1 },
        { herbId: 2, planId: 2 },
        { herbId: 3, planId: 3 },
        { herbId: 4, planId: 1 },
        { herbId: 5, planId: 4 },
    ];
    batches.forEach(b => {
        try { batchesService.createBatch(b.herbId, b.planId); } catch (e) {}
    });

    // lote 2 com perdas e comprometido
    try {
        batchesService.registerLoss(2, 30);
    } catch (e) {}

    // lote 3 concluído
    try {
        batchesService.registerLoss(3, 10);
        batchesService.transitionState(3, 'concluido');
    } catch (e) {}

    console.log(`[Seed] ${batchesService.batches.length} lotes criados`);
};

const seedMeasurements = () => {
    const measurements = [
        { temperature: 23, humidity: 60, luminosity: 15000, batchId: 1 },
        { temperature: 25, humidity: 65, luminosity: 18000, batchId: 1 },
        { temperature: 30, humidity: 85, luminosity: 30000, batchId: 2 }, // violações
        { temperature: 22, humidity: 55, luminosity: 12000, batchId: 4 },
        { temperature: 19, humidity: 45, luminosity: 8000, batchId: 5 },
    ];
    measurements.forEach(m => {
        try { measurementsService.createMeasurement(m.temperature, m.humidity, m.luminosity, m.batchId); } catch (e) {}
    });
    console.log(`[Seed] ${measurementsService.measurements.length} medições criadas`);
};

const seedAlerts = () => {
    const alerts = [
        { classification: 'Informativo', batchId: 1, message: 'Temperatura ligeiramente elevada' },
        { classification: 'Aviso', batchId: 2, message: 'Temperatura e humidade fora dos limites' },
        { classification: 'Critico', batchId: 2, message: 'Todas as condições violadas — intervenção necessária' },
        { classification: 'Informativo', batchId: 4, message: 'Luminosidade abaixo do recomendado' },
        { classification: 'Aviso', batchId: 5, message: 'Humidade abaixo do mínimo' },
    ];
    alerts.forEach(a => {
        try { alertsService.createAlert(a.classification, a.batchId, a.message); } catch (e) {}
    });

    // resolve o alerta 1
    try { alertsService.resolveAlert(1, 'Resolvido', null); } catch (e) {}

    // ignora o alerta 4 com justificação
    try { alertsService.resolveAlert(4, 'Ignorado', 'Luminosidade corrigida manualmente pelo técnico'); } catch (e) {}

    console.log(`[Seed] ${alertsService.alerts.length} alertas criados`);
};

const seedAutomation = () => {
    try {
        automationService.createRule('rega', 'humidity < threshold', 40);
        automationService.createRule('fertilizacao', 'humidity < threshold', 35);
        automationService.createRule('monitorizacao', 'temperature > threshold', 27);
        automationService.createRule('colheita', 'cycledays >= threshold', 90);
        automationService.setMode('Manual');
    } catch (e) {}
    console.log(`[Seed] ${automationService.rules.length} regras de automação criadas`);
};

module.exports = { seedUsers, seedHerbs, seedPlans, seedBatches, seedMeasurements, seedAlerts, seedAutomation };