const batches = [];

const VALID_STATES = ['ativo', 'concluido', 'comprometido'];
const VALID_TRANSITIONS = {
    'ativo': ['concluido', 'comprometido'],
    'concluido': [],
    'comprometido': ['concluido']
};

const createBatch = (herbId, planId) => {
    if (!herbId) throw new Error('Erva inválida');
    if (!planId) throw new Error('Plano inválido');

    const batch = {
        id: batches.length + 1,
        herbId,
        planId,
        state: 'ativo',
        losses: 0,
        productivity: null,
        startDate: new Date().toISOString(),
        endDate: null
    };
    batches.push(batch);
    return batch;
};

const transitionState = (id, newState) => {
    const batch = batches.find(b => b.id === id);
    if (!batch) throw new Error('Lote não encontrado');
    if (!VALID_STATES.includes(newState)) throw new Error('Estado inválido');

    const allowed = VALID_TRANSITIONS[batch.state];
    if (!allowed.includes(newState)) {
        throw new Error(`Transição de "${batch.state}" para "${newState}" não permitida`);
    }

    batch.state = newState;
    if (newState === 'concluido') {
        batch.endDate = new Date().toISOString();
        batch.productivity = calculateProductivity(batch);
    }
    return batch;
};

const registerLoss = (id, lossAmount) => {
    const batch = batches.find(b => b.id === id);
    if (!batch) throw new Error('Lote não encontrado');
    if (batch.state !== 'ativo') throw new Error('Só é possível registar perdas em lotes ativos');
    if (lossAmount < 0) throw new Error('Perda não pode ser negativa');
    if (lossAmount > 100) throw new Error('Perda não pode exceder 100%');

    batch.losses += lossAmount;
    if (batch.losses > 50) batch.state = 'comprometido';
    return batch;
};

const calculateProductivity = (batch) => {
    if (!batch.endDate) throw new Error('Lote ainda não foi concluído');
    const start = new Date(batch.startDate);
    const end = new Date(batch.endDate);
    const daysElapsed = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
    return Math.max(0, 100 - batch.losses);
};

module.exports = { createBatch, transitionState, registerLoss, calculateProductivity, batches, VALID_STATES };