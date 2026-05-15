const automationService = require('../../src/services/automationService');

beforeEach(() => {
    automationService.rules.length = 0;
    automationService.setMode('Manual');
});

// ===== MODO - PARTICIONAMENTO DE EQUIVALÊNCIA =====
describe('setMode - Particionamento de Equivalência', () => {

    test('TU111 - modo Manual válido', () => {
        const result = automationService.setMode('Manual');
        expect(result.mode).toBe('Manual');
    });

    test('TU112 - modo Automatico válido', () => {
        const result = automationService.setMode('Automatico');
        expect(result.mode).toBe('Automatico');
    });

    test('TU113 - modo inválido deve lançar erro', () => {
        expect(() => automationService.setMode('Semiautomatico')).toThrow('Modo inválido');
    });
});

// ===== CRIAÇÃO DE REGRAS =====
describe('createRule - Particionamento de Equivalência', () => {

    test('TU114 - regra válida criada com sucesso', () => {
        const rule = automationService.createRule('rega', 'humidity < threshold', 40);
        expect(rule.id).toBeDefined();
        expect(rule.active).toBe(true);
    });

    test('TU115 - ação inválida deve lançar erro', () => {
        expect(() =>
            automationService.createRule('voar', 'humidity < threshold', 40)
        ).toThrow('Ação inválida');
    });

    test('TU116 - condição vazia deve lançar erro', () => {
        expect(() =>
            automationService.createRule('rega', '', 40)
        ).toThrow('Condição inválida');
    });

    test('TU117 - threshold inválido deve lançar erro', () => {
        expect(() =>
            automationService.createRule('rega', 'humidity < threshold', NaN)
        ).toThrow('Threshold inválido');
    });
});

// ===== MOTOR DE AUTOMAÇÃO - CONDIÇÕES MÚLTIPLAS =====
// Decisão: executeRule com C1=modo e C2=condição satisfeita
// C1: modo === 'Automatico'
// C2: measurement >= threshold (condição satisfeita)
describe('executeRule - Condições Múltiplas (modo + condição)', () => {

    let rule;
    beforeEach(() => {
        rule = automationService.createRule('rega', 'humidity < threshold', 40);
    });

    // C1=F (Manual), C2=F (condição não satisfeita) → não executa, não sugere
    test('TU118 - CM: Manual + condição não satisfeita → não executa', () => {
        automationService.setMode('Manual');
        const result = automationService.executeRule(rule, 30); // 30 < 40 → condição NÃO satisfeita
        expect(result.executed).toBe(false);
        expect(result.suggested).toBe(false);
    });

    // C1=F (Manual), C2=T (condição satisfeita) → não executa, sugere
    test('TU119 - CM: Manual + condição satisfeita → sugere mas não executa', () => {
        automationService.setMode('Manual');
        const result = automationService.executeRule(rule, 40);
        expect(result.executed).toBe(false);
        expect(result.suggested).toBe(true);
    });

    // C1=T (Automatico), C2=F (condição não satisfeita) → não executa
    test('TU120 - CM: Automatico + condição não satisfeita → não executa', () => {
        automationService.setMode('Automatico');
        const result = automationService.executeRule(rule, 30);
        expect(result.executed).toBe(false);
    });

    // C1=T (Automatico), C2=T (condição satisfeita) → executa
    test('TU121 - CM: Automatico + condição satisfeita → executa', () => {
        automationService.setMode('Automatico');
        const result = automationService.executeRule(rule, 40);
        expect(result.executed).toBe(true);
    });

    // Regra inativa → não executa independentemente do modo
    test('TU122 - regra inativa não executa em nenhum modo', () => {
        rule.active = false;
        automationService.setMode('Automatico');
        const result = automationService.executeRule(rule, 40);
        expect(result.executed).toBe(false);
    });
});