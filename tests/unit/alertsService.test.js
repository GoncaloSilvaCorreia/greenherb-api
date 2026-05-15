const alertsService = require('../../src/services/alertsServices');

beforeEach(() => {
    alertsService.alerts.length = 0;
});

const mockPlan = { minTemp: 18, maxTemp: 28, minHumidity: 40, maxHumidity: 80, minLuminosity: 5000, maxLuminosity: 25000 };

// ===== CLASSIFICAÇÃO DE ALERTAS - CONDIÇÕES MÚLTIPLAS =====
// Decisão: classifyAlert com 3 condições (tempViolation, humViolation, luxViolation)
// C1: temperatura fora dos limites
// C2: humidade fora dos limites
// C3: luminosidade fora dos limites
describe('classifyAlert - Condições Múltiplas', () => {

    // C1=F, C2=F, C3=F → null (sem alerta)
    test('TU58 - CM: sem violações não gera alerta', () => {
        const result = alertsService.classifyAlert(23, 60, 15000, mockPlan);
        expect(result).toBeNull();
    });

    // C1=T, C2=F, C3=F → Informativo (1 violação)
    test('TU59 - CM: só temperatura violada → Informativo', () => {
        const result = alertsService.classifyAlert(30, 60, 15000, mockPlan);
        expect(result).toBe('Informativo');
    });

    // C1=F, C2=T, C3=F → Informativo (1 violação)
    test('TU60 - CM: só humidade violada → Informativo', () => {
        const result = alertsService.classifyAlert(23, 85, 15000, mockPlan);
        expect(result).toBe('Informativo');
    });

    // C1=F, C2=F, C3=T → Informativo (1 violação)
    test('TU61 - CM: só luminosidade violada → Informativo', () => {
        const result = alertsService.classifyAlert(23, 60, 30000, mockPlan);
        expect(result).toBe('Informativo');
    });

    // C1=T, C2=T, C3=F → Aviso (2 violações)
    test('TU62 - CM: temperatura e humidade violadas → Aviso', () => {
        const result = alertsService.classifyAlert(30, 85, 15000, mockPlan);
        expect(result).toBe('Aviso');
    });

    // C1=T, C2=F, C3=T → Aviso (2 violações)
    test('TU63 - CM: temperatura e luminosidade violadas → Aviso', () => {
        const result = alertsService.classifyAlert(30, 60, 30000, mockPlan);
        expect(result).toBe('Aviso');
    });

    // C1=F, C2=T, C3=T → Aviso (2 violações)
    test('TU64 - CM: humidade e luminosidade violadas → Aviso', () => {
        const result = alertsService.classifyAlert(23, 85, 30000, mockPlan);
        expect(result).toBe('Aviso');
    });

    // C1=T, C2=T, C3=T → Critico (3 violações)
    test('TU65 - CM: todas violadas → Critico', () => {
        const result = alertsService.classifyAlert(30, 85, 30000, mockPlan);
        expect(result).toBe('Critico');
    });
});

// ===== CRIAÇÃO DE ALERTAS - PARTICIONAMENTO DE EQUIVALÊNCIA =====
describe('createAlert - Particionamento de Equivalência', () => {

    test('TU66 - criação com classificação Informativo válida', () => {
        const alert = alertsService.createAlert('Informativo', 1, 'Temperatura ligeiramente elevada');
        expect(alert.classification).toBe('Informativo');
        expect(alert.status).toBe('pendente');
    });

    test('TU67 - criação com classificação Aviso válida', () => {
        const alert = alertsService.createAlert('Aviso', 1, 'Temperatura e humidade elevadas');
        expect(alert.classification).toBe('Aviso');
    });

    test('TU68 - criação com classificação Critico válida', () => {
        const alert = alertsService.createAlert('Critico', 1, 'Todas as condições violadas');
        expect(alert.classification).toBe('Critico');
    });

    test('TU69 - classificação inválida deve lançar erro', () => {
        expect(() =>
            alertsService.createAlert('Urgente', 1, 'mensagem')
        ).toThrow('Classificação de alerta inválida');
    });

    test('TU70 - mensagem vazia deve lançar erro', () => {
        expect(() =>
            alertsService.createAlert('Informativo', 1, '')
        ).toThrow('Mensagem inválida');
    });
});

// ===== RESOLUÇÃO DE ALERTAS - VALORES LIMITE (justificação [10, 500]) =====
describe('resolveAlert - Valores Limite (justificação)', () => {

    beforeEach(() => {
        alertsService.createAlert('Informativo', 1, 'Teste');
    });

    test('TU71 - Resolvido sem justificação deve ser aceite', () => {
        const result = alertsService.resolveAlert(1, 'Resolvido', null);
        expect(result.status).toBe('resolvido');
    });

    test('TU72 - Ignorado com justificação = 9 chars deve lançar erro', () => {
        expect(() =>
            alertsService.resolveAlert(1, 'Ignorado', '123456789')
        ).toThrow('Justificação obrigatória');
    });

    test('TU73 - Ignorado com justificação = 10 chars deve ser aceite', () => {
        const result = alertsService.resolveAlert(1, 'Ignorado', '1234567890');
        expect(result.status).toBe('ignorado');
    });

    test('TU74 - Ignorado com justificação = 250 chars deve ser aceite', () => {
        const result = alertsService.resolveAlert(1, 'Ignorado', 'a'.repeat(250));
        expect(result.status).toBe('ignorado');
    });

    test('TU75 - Ignorado com justificação = 500 chars deve ser aceite', () => {
        const result = alertsService.resolveAlert(1, 'Ignorado', 'a'.repeat(500));
        expect(result.status).toBe('ignorado');
    });

    test('TU76 - Ignorado com justificação = 501 chars deve lançar erro', () => {
        expect(() =>
            alertsService.resolveAlert(1, 'Ignorado', 'a'.repeat(501))
        ).toThrow('Justificação não pode exceder 500 caracteres');
    });

    test('TU77 - Ignorado sem justificação deve lançar erro', () => {
        expect(() =>
            alertsService.resolveAlert(1, 'Ignorado', null)
        ).toThrow('Justificação obrigatória');
    });

    test('TU78 - decisão inválida deve lançar erro', () => {
        expect(() =>
            alertsService.resolveAlert(1, 'Cancelado', null)
        ).toThrow('Decisão inválida');
    });
});