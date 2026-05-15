const rules = [];
let mode = 'Manual';

const VALID_MODES = ['Manual', 'Automatico'];
const VALID_ACTIONS = ['rega', 'fertilizacao', 'colheita', 'monitorizacao'];

const setMode = (newMode) => {
    if (!VALID_MODES.includes(newMode)) {
        throw new Error('Modo inválido');
    }
    mode = newMode;
    return { mode };
};

const getMode = () => mode;

const createRule = (action, condition, threshold) => {
    if (!VALID_ACTIONS.includes(action)) {
        throw new Error('Ação inválida');
    }
    if (!condition || condition.trim() === '') {
        throw new Error('Condição inválida');
    }
    if (threshold === null || threshold === undefined || isNaN(threshold)) {
        throw new Error('Threshold inválido');
    }

    const rule = {
        id: rules.length + 1,
        action,
        condition,
        threshold,
        active: true
    };
    rules.push(rule);
    return rule;
};

const executeRule = (rule, measurement) => {
    if (!rule.active) return { executed: false, reason: 'Regra inativa' };

    const conditionMet = measurement >= rule.threshold;

    if (mode === 'Manual') {
        return {
            executed: false,
            suggested: conditionMet,
            reason: conditionMet ? 'Modo Manual: ação sugerida' : 'Condição não satisfeita'
        };
    }

    if (mode === 'Automatico') {
        return {
            executed: conditionMet,
            suggested: false,
            reason: conditionMet ? 'Modo Automático: ação executada' : 'Condição não satisfeita'
        };
    }
};

module.exports = { setMode, getMode, createRule, executeRule, rules, VALID_MODES, VALID_ACTIONS };