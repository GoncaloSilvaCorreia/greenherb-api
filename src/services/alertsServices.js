const alerts = [];

const VALID_CLASSIFICATIONS = ['Informativo', 'Aviso', 'Critico'];
const VALID_DECISIONS = ['Resolvido', 'Ignorado'];

const classifyAlert = (temperature, humidity, luminosity, plan) => {
    const tempViolation = temperature > plan.maxTemp || temperature < plan.minTemp;
    const humidityViolation = humidity > plan.maxHumidity || humidity < plan.minHumidity;
    const luminosityViolation = luminosity > plan.maxLuminosity || luminosity < plan.minLuminosity;

    const violations = [tempViolation, humidityViolation, luminosityViolation].filter(Boolean).length;

    if (violations === 0) return null;
    if (violations === 1) return 'Informativo';
    if (violations === 2) return 'Aviso';
    return 'Critico';
};

const createAlert = (classification, batchId, message) => {
    if (!VALID_CLASSIFICATIONS.includes(classification)) {
        throw new Error('Classificação de alerta inválida');
    }
    if (!batchId) throw new Error('Lote inválido');
    if (!message || message.trim() === '') throw new Error('Mensagem inválida');

    const alert = {
        id: alerts.length + 1,
        classification,
        batchId,
        message,
        status: 'pendente',
        justification: null,
        createdAt: new Date().toISOString()
    };
    alerts.push(alert);
    return alert;
};

const resolveAlert = (id, decision, justification) => {
    const alert = alerts.find(a => a.id === id);
    if (!alert) throw new Error('Alerta não encontrado');
    if (alert.status !== 'pendente') throw new Error('Alerta já foi resolvido');
    if (!VALID_DECISIONS.includes(decision)) throw new Error('Decisão inválida');

    if (decision === 'Ignorado') {
        if (!justification || justification.trim().length < 10) {
            throw new Error('Justificação obrigatória para Ignorado (mínimo 10 caracteres)');
        }
        if (justification.trim().length > 500) {
            throw new Error('Justificação não pode exceder 500 caracteres');
        }
    }

    alert.status = decision === 'Resolvido' ? 'resolvido' : 'ignorado';
    alert.justification = justification || null;
    return alert;
};

module.exports = { classifyAlert, createAlert, resolveAlert, alerts, VALID_CLASSIFICATIONS };