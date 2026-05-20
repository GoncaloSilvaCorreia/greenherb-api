const plansService = require('../../src/services/plansService');

beforeEach(() => {
    plansService.plans.length = 0;
});

// Parâmetros base válidos para reutilizar
const validParams = [18, 25, 40, 70, 5000, 20000, 90, null];

// =====================================================
// DECISÃO 1: !VALID_TYPES.includes(type)
// Estrutura: if
// Condição: type não está em ['regular', 'emergencia', 'pontual']
// Caminhos: C1=T (tipo inválido → lança erro) | C1=F (tipo válido → continua)
// =====================================================
describe('WB-D1: Decisão 1 — Validação do tipo de plano', () => {

    test('WB01 - C1=F: tipo "regular" é válido → continua execução', () => {
        const plan = plansService.createPlan('regular', ...validParams);
        expect(plan.type).toBe('regular');
    });

    test('WB02 - C1=F: tipo "emergencia" é válido → continua execução', () => {
        const plan = plansService.createPlan('emergencia', ...validParams);
        expect(plan.type).toBe('emergencia');
    });

    test('WB03 - C1=F: tipo "pontual" é válido → continua execução', () => {
        const plan = plansService.createPlan('pontual', 18, 25, 40, 70, 5000, 20000, 90, 'responsavel1');
        expect(plan.type).toBe('pontual');
    });

    test('WB04 - C1=T: tipo inválido → lança erro', () => {
        expect(() =>
            plansService.createPlan('invalido', ...validParams)
        ).toThrow('Tipo de plano inválido');
    });

    test('WB05 - C1=T: tipo vazio → lança erro', () => {
        expect(() =>
            plansService.createPlan('', ...validParams)
        ).toThrow('Tipo de plano inválido');
    });

    test('WB06 - C1=T: tipo null → lança erro', () => {
        expect(() =>
            plansService.createPlan(null, ...validParams)
        ).toThrow('Tipo de plano inválido');
    });
});

// =====================================================
// DECISÃO 2: type === 'pontual' && !authorizedBy
// Estrutura: if
// C1: type === 'pontual'
// C2: !authorizedBy
// Tabela verdade: C1=F,C2=F | C1=F,C2=T | C1=T,C2=F | C1=T,C2=T
// =====================================================
describe('WB-D2: Decisão 2 — Autorização plano pontual', () => {

    test('WB07 - C1=F,C2=F: regular + com autorização → aceita', () => {
        const plan = plansService.createPlan('regular', 18, 25, 40, 70, 5000, 20000, 90, 'responsavel1');
        expect(plan.type).toBe('regular');
    });

    test('WB08 - C1=F,C2=T: regular + sem autorização → aceita', () => {
        const plan = plansService.createPlan('regular', ...validParams);
        expect(plan.type).toBe('regular');
    });

    test('WB09 - C1=T,C2=F: pontual + com autorização → aceita', () => {
        const plan = plansService.createPlan('pontual', 18, 25, 40, 70, 5000, 20000, 90, 'responsavel1');
        expect(plan.authorizedBy).toBe('responsavel1');
    });

    test('WB10 - C1=T,C2=T: pontual + sem autorização → lança erro', () => {
        expect(() =>
            plansService.createPlan('pontual', 18, 25, 40, 70, 5000, 20000, 90, null)
        ).toThrow('Plano pontual requer autorização do Responsável Técnico');
    });
});

// =====================================================
// DECISÃO 3: minTemp < 18 || maxTemp > 28 || minTemp >= maxTemp
// Estrutura: if
// C1: minTemp < 18
// C2: maxTemp > 28
// C3: minTemp >= maxTemp
// Cobertura MC/DC: cada condição afeta isoladamente o resultado
// =====================================================
describe('WB-D3: Decisão 3 — Validação de temperatura', () => {

    // Caminho falso: nenhuma condição verdadeira → aceita
    test('WB11 - C1=F,C2=F,C3=F: temperatura válida → aceita', () => {
        const plan = plansService.createPlan('regular', 18, 25, 40, 70, 5000, 20000, 90, null);
        expect(plan.minTemp).toBe(18);
    });

    // C1=T: minTemp < 18 → rejeita (C1 afeta resultado)
    test('WB12 - C1=T,C2=F,C3=F: minTemp < 18 → lança erro', () => {
        expect(() =>
            plansService.createPlan('regular', 17, 25, 40, 70, 5000, 20000, 90, null)
        ).toThrow('Temperatura fora dos limites');
    });

    // C2=T: maxTemp > 28 → rejeita (C2 afeta resultado)
    test('WB13 - C1=F,C2=T,C3=F: maxTemp > 28 → lança erro', () => {
        expect(() =>
            plansService.createPlan('regular', 18, 29, 40, 70, 5000, 20000, 90, null)
        ).toThrow('Temperatura fora dos limites');
    });

    // C3=T: minTemp >= maxTemp → rejeita (C3 afeta resultado)
    test('WB14 - C1=F,C2=F,C3=T: minTemp >= maxTemp → lança erro', () => {
        expect(() =>
            plansService.createPlan('regular', 25, 20, 40, 70, 5000, 20000, 90, null)
        ).toThrow('Temperatura fora dos limites');
    });

    // C1=T,C2=T,C3=T: todas verdadeiras → rejeita
    test('WB15 - C1=T,C2=T,C3=T: todas violadas → lança erro', () => {
        expect(() =>
            plansService.createPlan('regular', 10, 30, 40, 70, 5000, 20000, 90, null)
        ).toThrow('Temperatura fora dos limites');
    });
});

// =====================================================
// DECISÃO 4: minHumidity < 40 || maxHumidity > 80 || minHumidity >= maxHumidity
// Estrutura: if
// C1: minHumidity < 40
// C2: maxHumidity > 80
// C3: minHumidity >= maxHumidity
// =====================================================
describe('WB-D4: Decisão 4 — Validação de humidade', () => {

    test('WB16 - C1=F,C2=F,C3=F: humidade válida → aceita', () => {
        const plan = plansService.createPlan('regular', 18, 25, 40, 70, 5000, 20000, 90, null);
        expect(plan.minHumidity).toBe(40);
    });

    test('WB17 - C1=T,C2=F,C3=F: minHumidity < 40 → lança erro', () => {
        expect(() =>
            plansService.createPlan('regular', 18, 25, 39, 70, 5000, 20000, 90, null)
        ).toThrow('Humidade fora dos limites');
    });

    test('WB18 - C1=F,C2=T,C3=F: maxHumidity > 80 → lança erro', () => {
        expect(() =>
            plansService.createPlan('regular', 18, 25, 40, 81, 5000, 20000, 90, null)
        ).toThrow('Humidade fora dos limites');
    });

    test('WB19 - C1=F,C2=F,C3=T: minHumidity >= maxHumidity → lança erro', () => {
        expect(() =>
            plansService.createPlan('regular', 18, 25, 70, 40, 5000, 20000, 90, null)
        ).toThrow('Humidade fora dos limites');
    });

    test('WB20 - C1=T,C2=T,C3=T: todas violadas → lança erro', () => {
        expect(() =>
            plansService.createPlan('regular', 18, 25, 10, 90, 5000, 20000, 90, null)
        ).toThrow('Humidade fora dos limites');
    });
});

// =====================================================
// DECISÃO 5: minLuminosity < 5000 || maxLuminosity > 25000 || minLuminosity >= maxLuminosity
// Estrutura: if
// C1: minLuminosity < 5000
// C2: maxLuminosity > 25000
// C3: minLuminosity >= maxLuminosity
// =====================================================
describe('WB-D5: Decisão 5 — Validação de luminosidade', () => {

    test('WB21 - C1=F,C2=F,C3=F: luminosidade válida → aceita', () => {
        const plan = plansService.createPlan('regular', 18, 25, 40, 70, 5000, 20000, 90, null);
        expect(plan.minLuminosity).toBe(5000);
    });

    test('WB22 - C1=T,C2=F,C3=F: minLuminosity < 5000 → lança erro', () => {
        expect(() =>
            plansService.createPlan('regular', 18, 25, 40, 70, 4999, 20000, 90, null)
        ).toThrow('Luminosidade fora dos limites');
    });

    test('WB23 - C1=F,C2=T,C3=F: maxLuminosity > 25000 → lança erro', () => {
        expect(() =>
            plansService.createPlan('regular', 18, 25, 40, 70, 5000, 25001, 90, null)
        ).toThrow('Luminosidade fora dos limites');
    });

    test('WB24 - C1=F,C2=F,C3=T: minLuminosity >= maxLuminosity → lança erro', () => {
        expect(() =>
            plansService.createPlan('regular', 18, 25, 40, 70, 20000, 5000, 90, null)
        ).toThrow('Luminosidade fora dos limites');
    });

    test('WB25 - C1=T,C2=T,C3=T: todas violadas → lança erro', () => {
        expect(() =>
            plansService.createPlan('regular', 18, 25, 40, 70, 1000, 30000, 90, null)
        ).toThrow('Luminosidade fora dos limites');
    });
});

// =====================================================
// DECISÃO 6: cycleDays < 1 || cycleDays > 365
// Estrutura: if
// C1: cycleDays < 1
// C2: cycleDays > 365
// =====================================================
describe('WB-D6: Decisão 6 — Validação de duração do ciclo', () => {

    test('WB26 - C1=F,C2=F: cycleDays válido → aceita', () => {
        const plan = plansService.createPlan('regular', 18, 25, 40, 70, 5000, 20000, 90, null);
        expect(plan.cycleDays).toBe(90);
    });

    test('WB27 - C1=T,C2=F: cycleDays < 1 → lança erro', () => {
        expect(() =>
            plansService.createPlan('regular', 18, 25, 40, 70, 5000, 20000, 0, null)
        ).toThrow('Duração do ciclo inválida');
    });

    test('WB28 - C1=F,C2=T: cycleDays > 365 → lança erro', () => {
        expect(() =>
            plansService.createPlan('regular', 18, 25, 40, 70, 5000, 20000, 366, null)
        ).toThrow('Duração do ciclo inválida');
    });

    test('WB29 - C1=T,C2=T: cycleDays = 0 e > 365 impossível → cycleDays = -1', () => {
        expect(() =>
            plansService.createPlan('regular', 18, 25, 40, 70, 5000, 20000, -1, null)
        ).toThrow('Duração do ciclo inválida');
    });
});

// =====================================================
// COBERTURA DE CAMINHOS (Path Coverage)
// Caminho 1: tipo inválido → para na D1
// Caminho 2: pontual sem auth → para na D2
// Caminho 3: temp inválida → para na D3
// Caminho 4: humidade inválida → para na D4
// Caminho 5: luminosidade inválida → para na D5
// Caminho 6: ciclo inválido → para na D6
// Caminho 7: todos válidos → cria plano
// =====================================================
describe('WB - Cobertura de Caminhos', () => {

    test('WB30 - Caminho 1: para na D1 (tipo inválido)', () => {
        expect(() =>
            plansService.createPlan('invalido', 18, 25, 40, 70, 5000, 20000, 90, null)
        ).toThrow('Tipo de plano inválido');
    });

    test('WB31 - Caminho 2: para na D2 (pontual sem auth)', () => {
        expect(() =>
            plansService.createPlan('pontual', 18, 25, 40, 70, 5000, 20000, 90, null)
        ).toThrow('Plano pontual requer autorização');
    });

    test('WB32 - Caminho 3: para na D3 (temp inválida)', () => {
        expect(() =>
            plansService.createPlan('regular', 17, 25, 40, 70, 5000, 20000, 90, null)
        ).toThrow('Temperatura fora dos limites');
    });

    test('WB33 - Caminho 4: para na D4 (humidade inválida)', () => {
        expect(() =>
            plansService.createPlan('regular', 18, 25, 39, 70, 5000, 20000, 90, null)
        ).toThrow('Humidade fora dos limites');
    });

    test('WB34 - Caminho 5: para na D5 (luminosidade inválida)', () => {
        expect(() =>
            plansService.createPlan('regular', 18, 25, 40, 70, 4999, 20000, 90, null)
        ).toThrow('Luminosidade fora dos limites');
    });

    test('WB35 - Caminho 6: para na D6 (ciclo inválido)', () => {
        expect(() =>
            plansService.createPlan('regular', 18, 25, 40, 70, 5000, 20000, 0, null)
        ).toThrow('Duração do ciclo inválida');
    });

    test('WB36 - Caminho 7: todos válidos → plano criado', () => {
        const plan = plansService.createPlan('regular', 18, 25, 40, 70, 5000, 20000, 90, null);
        expect(plan.id).toBeDefined();
        expect(plan.type).toBe('regular');
    });
});