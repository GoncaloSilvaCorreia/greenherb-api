const batchesService = require('../../src/services/batchesService');

beforeEach(() => {
    batchesService.batches.length = 0;
});

// ===== CRIAÇÃO DE LOTES =====
describe('createBatch - Particionamento de Equivalência', () => {

    test('TU94 - lote criado com dados válidos', () => {
        const batch = batchesService.createBatch(1, 1);
        expect(batch.id).toBeDefined();
        expect(batch.state).toBe('ativo');
    });

    test('TU95 - sem erva deve lançar erro', () => {
        expect(() => batchesService.createBatch(null, 1)).toThrow('Erva inválida');
    });

    test('TU96 - sem plano deve lançar erro', () => {
        expect(() => batchesService.createBatch(1, null)).toThrow('Plano inválido');
    });
});

// ===== TRANSIÇÕES DE ESTADO =====
// Decisão composta: estado atual + novo estado
// C1: estado atual é 'ativo'
// C2: novo estado é 'concluido'
// C3: novo estado é 'comprometido'
describe('transitionState - Condições Múltiplas', () => {

    beforeEach(() => {
        batchesService.createBatch(1, 1);
    });

    test('TU97 - ativo → concluido deve ser permitido', () => {
        const batch = batchesService.transitionState(1, 'concluido');
        expect(batch.state).toBe('concluido');
    });

    test('TU98 - ativo → comprometido deve ser permitido', () => {
        const batch = batchesService.transitionState(1, 'comprometido');
        expect(batch.state).toBe('comprometido');
    });

    test('TU99 - concluido → ativo não deve ser permitido', () => {
        batchesService.transitionState(1, 'concluido');
        expect(() =>
            batchesService.transitionState(1, 'ativo')
        ).toThrow('Transição');
    });

    test('TU100 - comprometido → concluido deve ser permitido', () => {
        batchesService.transitionState(1, 'comprometido');
        const batch = batchesService.transitionState(1, 'concluido');
        expect(batch.state).toBe('concluido');
    });

    test('TU101 - estado inválido deve lançar erro', () => {
        expect(() =>
            batchesService.transitionState(1, 'pausado')
        ).toThrow('Estado inválido');
    });
});

// ===== REGISTO DE PERDAS - VALORES LIMITE [0, 100] =====
describe('registerLoss - Valores Limite', () => {

    beforeEach(() => {
        batchesService.createBatch(1, 1);
    });

    test('TU102 - perda = -1 (abaixo do limite) deve lançar erro', () => {
        expect(() => batchesService.registerLoss(1, -1)).toThrow('Perda não pode ser negativa');
    });

    test('TU103 - perda = 0 (limite inferior) deve ser aceite', () => {
        const batch = batchesService.registerLoss(1, 0);
        expect(batch.losses).toBe(0);
    });

    test('TU104 - perda = 50 (valor nominal) deve ser aceite', () => {
        const batch = batchesService.registerLoss(1, 50);
        expect(batch.losses).toBe(50);
    });

    test('TU105 - perda = 100 (limite superior) deve ser aceite', () => {
        const batch = batchesService.registerLoss(1, 100);
        expect(batch.losses).toBe(100);
    });

    test('TU106 - perda = 101 (acima do limite) deve lançar erro', () => {
        expect(() => batchesService.registerLoss(1, 101)).toThrow('Perda não pode exceder 100%');
    });

    test('TU107 - perda > 50% muda estado para comprometido', () => {
        const batch = batchesService.registerLoss(1, 51);
        expect(batch.state).toBe('comprometido');
    });
});

// ===== CÁLCULO DE PRODUTIVIDADE =====
describe('calculateProductivity - Particionamento de Equivalência', () => {

    test('TU108 - lote sem perdas tem produtividade 100%', () => {
        const batch = batchesService.createBatch(1, 1);
        batchesService.transitionState(batch.id, 'concluido');
        expect(batch.productivity).toBe(100);
    });

    test('TU109 - lote com 30% de perdas tem produtividade 70%', () => {
        const batch = batchesService.createBatch(1, 1);
        batchesService.registerLoss(batch.id, 30);
        batchesService.transitionState(batch.id, 'concluido');
        expect(batch.productivity).toBe(70);
    });

    test('TU110 - lote não concluído lança erro ao calcular produtividade', () => {
        const batch = batchesService.createBatch(1, 1);
        expect(() =>
            batchesService.calculateProductivity(batch)
        ).toThrow('Lote ainda não foi concluído');
    });
});