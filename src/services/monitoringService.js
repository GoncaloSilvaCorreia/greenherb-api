const temperatureGateway = require('../gateways/temperatureGateway');
const notificationGateway = require('../gateways/notificationGateway');
const alertsService = require('./alertsServices');

const checkTemperature = async (batchId, plan) => {
    // Obtém temperatura do gateway (sensor externo)
    const temperature = await temperatureGateway.getTemperature(batchId);

    // Verifica se está fora dos limites do plano
    if (temperature > plan.maxTemp || temperature < plan.minTemp) {
        // Cria alerta
        const classification = temperature > plan.maxTemp + 5 ? 'Critico' : 'Aviso';
        const alert = alertsService.createAlert(
            classification,
            batchId,
            `Temperatura ${temperature}ºC fora dos limites [${plan.minTemp}-${plan.maxTemp}ºC]`
        );

        // Envia notificação via gateway
        await notificationGateway.sendNotification(
            'admin@greenherb.pt',
            `Alerta ${classification} — Lote ${batchId}`,
            `Temperatura ${temperature}ºC fora dos limites do plano.`
        );

        return { temperature, alert, notified: true };
    }

    return { temperature, alert: null, notified: false };
};

module.exports = { checkTemperature };