const measurementsService = require('../../src/services/measurementsService');

beforeEach(() => {
    measurementsService.measurements.length = 0;
});

// ===== CRIAÇÃO DE MEDIÇÕES - PARTICIONAMENTO DE EQUIVALÊNCIA =====
describe('createMeasurement - Particionamento de Equivalência', () => {

    test('TU79 - medição válida deve ser criada', () => {
        const m = measurementsService.createMeasurement(23, 60, 15000, 1);
        expect(m.id).toBeDefined();
        expect(m.temperature).toBe(23);
    });

    test('TU80 - temperatura inválida (NaN) deve lançar erro', () => {
        expect(() =>
            measurementsService.createMeasurement(NaN, 60, 15000, 1)
        ).toThrow('Temperatura inválida');
    });

    test('TU81 - humidade inválida (NaN) deve lançar erro', () => {
        expect(() =>
            measurementsService.createMeasurement(23, NaN, 15000, 1)
        ).toThrow('Humidade inválida');
    });

    test('TU82 - luminosidade inválida (NaN) deve lançar erro', () => {
        expect(() =>
            measurementsService.createMeasurement(23, 60, NaN, 1)
        ).toThrow('Luminosidade inválida');
    });

    test('TU83 - sem lote deve lançar erro', () => {
        expect(() =>
            measurementsService.createMeasurement(23, 60, 15000, null)
        ).toThrow('Lote inválido');
    });
});

// ===== VALORES LIMITE - TEMPERATURA =====
describe('createMeasurement - Valores Limite (temperatura)', () => {

    test('TU84 - temperatura = -51 (abaixo do limite) deve lançar erro', () => {
        expect(() =>
            measurementsService.createMeasurement(-51, 60, 15000, 1)
        ).toThrow('Temperatura fora do intervalo aceitável');
    });

    test('TU85 - temperatura = -50 (limite inferior) deve ser aceite', () => {
        const m = measurementsService.createMeasurement(-50, 60, 15000, 1);
        expect(m.temperature).toBe(-50);
    });

    test('TU86 - temperatura = 23 (valor nominal) deve ser aceite', () => {
        const m = measurementsService.createMeasurement(23, 60, 15000, 1);
        expect(m.temperature).toBe(23);
    });

    test('TU87 - temperatura = 100 (limite superior) deve ser aceite', () => {
        const m = measurementsService.createMeasurement(100, 60, 15000, 1);
        expect(m.temperature).toBe(100);
    });

    test('TU88 - temperatura = 101 (acima do limite) deve lançar erro', () => {
        expect(() =>
            measurementsService.createMeasurement(101, 60, 15000, 1)
        ).toThrow('Temperatura fora do intervalo aceitável');
    });
});

// ===== VALIDAÇÃO DE MEDIÇÕES =====
describe('validateMeasurement - Particionamento de Equivalência', () => {

    test('TU89 - medição completa não tem erros', () => {
        const errors = measurementsService.validateMeasurement({ temperature: 23, humidity: 60, luminosity: 15000 });
        expect(errors.length).toBe(0);
    });

    test('TU90 - temperatura em falta gera erro', () => {
        const errors = measurementsService.validateMeasurement({ temperature: null, humidity: 60, luminosity: 15000 });
        expect(errors).toContain('Temperatura em falta');
    });

    test('TU91 - humidade em falta gera erro', () => {
        const errors = measurementsService.validateMeasurement({ temperature: 23, humidity: null, luminosity: 15000 });
        expect(errors).toContain('Humidade em falta');
    });

    test('TU92 - luminosidade em falta gera erro', () => {
        const errors = measurementsService.validateMeasurement({ temperature: 23, humidity: 60, luminosity: null });
        expect(errors).toContain('Luminosidade em falta');
    });

    test('TU93 - múltiplos campos em falta gera múltiplos erros', () => {
        const errors = measurementsService.validateMeasurement({ temperature: null, humidity: null, luminosity: null });
        expect(errors.length).toBe(3);
    });
});