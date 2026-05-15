const plansService = require('../../src/services/plansService');

beforeEach(() => {
    plansService.plans.length = 0;
});

// ===== PARTICIONAMENTO DE EQUIVALÊNCIA - TIPO DE PLANO =====
describe('createPlan - Particionamento de Equivalência (tipo)', () => {

    test('TU29 - plano regular válido', () => {
        const plan = plansService.createPlan('regular', 18, 25, 40, 70, 5000, 20000, 90, null);
        expect(plan.type).toBe('regular');
    });

    test('TU30 - plano emergencia válido', () => {
        const plan = plansService.createPlan('emergencia', 18, 25, 40, 70, 5000, 20000, 90, null);
        expect(plan.type).toBe('emergencia');
    });

    test('TU31 - plano pontual com autorização válido', () => {
        const plan = plansService.createPlan('pontual', 18, 25, 40, 70, 5000, 20000, 90, 'responsavel1');
        expect(plan.type).toBe('pontual');
        expect(plan.authorizedBy).toBe('responsavel1');
    });

    test('TU32 - plano pontual sem autorização deve lançar erro', () => {
        expect(() =>
            plansService.createPlan('pontual', 18, 25, 40, 70, 5000, 20000, 90, null)
        ).toThrow('Plano pontual requer autorização do Responsável Técnico');
    });

    test('TU33 - tipo de plano inválido deve lançar erro', () => {
        expect(() =>
            plansService.createPlan('invalido', 18, 25, 40, 70, 5000, 20000, 90, null)
        ).toThrow('Tipo de plano inválido');
    });
});

// ===== VALORES LIMITE - TEMPERATURA [18, 28] =====
describe('createPlan - Valores Limite (temperatura)', () => {

    test('TU34 - temperatura mínima = 17 (abaixo do limite) deve lançar erro', () => {
        expect(() =>
            plansService.createPlan('regular', 17, 25, 40, 70, 5000, 20000, 90, null)
        ).toThrow('Temperatura fora dos limites');
    });

    test('TU35 - temperatura mínima = 18 (limite inferior) deve ser aceite', () => {
        const plan = plansService.createPlan('regular', 18, 25, 40, 70, 5000, 20000, 90, null);
        expect(plan.minTemp).toBe(18);
    });

    test('TU36 - temperatura nominal = 23 deve ser aceite', () => {
        const plan = plansService.createPlan('regular', 20, 23, 40, 70, 5000, 20000, 90, null);
        expect(plan.maxTemp).toBe(23);
    });

    test('TU37 - temperatura máxima = 28 (limite superior) deve ser aceite', () => {
        const plan = plansService.createPlan('regular', 18, 28, 40, 70, 5000, 20000, 90, null);
        expect(plan.maxTemp).toBe(28);
    });

    test('TU38 - temperatura máxima = 29 (acima do limite) deve lançar erro', () => {
        expect(() =>
            plansService.createPlan('regular', 18, 29, 40, 70, 5000, 20000, 90, null)
        ).toThrow('Temperatura fora dos limites');
    });
});

// ===== VALORES LIMITE - HUMIDADE [40, 80] =====
describe('createPlan - Valores Limite (humidade)', () => {

    test('TU39 - humidade = 39 (abaixo do limite) deve lançar erro', () => {
        expect(() =>
            plansService.createPlan('regular', 18, 25, 39, 70, 5000, 20000, 90, null)
        ).toThrow('Humidade fora dos limites');
    });

    test('TU40 - humidade = 40 (limite inferior) deve ser aceite', () => {
        const plan = plansService.createPlan('regular', 18, 25, 40, 70, 5000, 20000, 90, null);
        expect(plan.minHumidity).toBe(40);
    });

    test('TU41 - humidade nominal = 60 deve ser aceite', () => {
        const plan = plansService.createPlan('regular', 18, 25, 40, 60, 5000, 20000, 90, null);
        expect(plan.maxHumidity).toBe(60);
    });

    test('TU42 - humidade = 80 (limite superior) deve ser aceite', () => {
        const plan = plansService.createPlan('regular', 18, 25, 40, 80, 5000, 20000, 90, null);
        expect(plan.maxHumidity).toBe(80);
    });

    test('TU43 - humidade = 81 (acima do limite) deve lançar erro', () => {
        expect(() =>
            plansService.createPlan('regular', 18, 25, 40, 81, 5000, 20000, 90, null)
        ).toThrow('Humidade fora dos limites');
    });
});

// ===== VALORES LIMITE - LUMINOSIDADE [5000, 25000] =====
describe('createPlan - Valores Limite (luminosidade)', () => {

    test('TU44 - luminosidade = 4999 (abaixo do limite) deve lançar erro', () => {
        expect(() =>
            plansService.createPlan('regular', 18, 25, 40, 70, 4999, 20000, 90, null)
        ).toThrow('Luminosidade fora dos limites');
    });

    test('TU45 - luminosidade = 5000 (limite inferior) deve ser aceite', () => {
        const plan = plansService.createPlan('regular', 18, 25, 40, 70, 5000, 20000, 90, null);
        expect(plan.minLuminosity).toBe(5000);
    });

    test('TU46 - luminosidade nominal = 15000 deve ser aceite', () => {
        const plan = plansService.createPlan('regular', 18, 25, 40, 70, 5000, 15000, 90, null);
        expect(plan.maxLuminosity).toBe(15000);
    });

    test('TU47 - luminosidade = 25000 (limite superior) deve ser aceite', () => {
        const plan = plansService.createPlan('regular', 18, 25, 40, 70, 5000, 25000, 90, null);
        expect(plan.maxLuminosity).toBe(25000);
    });

    test('TU48 - luminosidade = 25001 (acima do limite) deve lançar erro', () => {
        expect(() =>
            plansService.createPlan('regular', 18, 25, 40, 70, 5000, 25001, 90, null)
        ).toThrow('Luminosidade fora dos limites');
    });
});

// ===== VALORES LIMITE - DURAÇÃO DO CICLO [1, 365] =====
describe('createPlan - Valores Limite (cycleDays)', () => {

    test('TU49 - cycleDays = 0 (abaixo do limite) deve lançar erro', () => {
        expect(() =>
            plansService.createPlan('regular', 18, 25, 40, 70, 5000, 20000, 0, null)
        ).toThrow('Duração do ciclo inválida');
    });

    test('TU50 - cycleDays = 1 (limite inferior) deve ser aceite', () => {
        const plan = plansService.createPlan('regular', 18, 25, 40, 70, 5000, 20000, 1, null);
        expect(plan.cycleDays).toBe(1);
    });

    test('TU51 - cycleDays = 90 (valor nominal) deve ser aceite', () => {
        const plan = plansService.createPlan('regular', 18, 25, 40, 70, 5000, 20000, 90, null);
        expect(plan.cycleDays).toBe(90);
    });

    test('TU52 - cycleDays = 365 (limite superior) deve ser aceite', () => {
        const plan = plansService.createPlan('regular', 18, 25, 40, 70, 5000, 20000, 365, null);
        expect(plan.cycleDays).toBe(365);
    });

    test('TU53 - cycleDays = 366 (acima do limite) deve lançar erro', () => {
        expect(() =>
            plansService.createPlan('regular', 18, 25, 40, 70, 5000, 20000, 366, null)
        ).toThrow('Duração do ciclo inválida');
    });
});

// ===== COBERTURA DE CONDIÇÕES MÚLTIPLAS - PLANO PONTUAL =====
// Decisão: if (type === 'pontual' && !authorizedBy)
// C1: type === 'pontual'
// C2: !authorizedBy (sem autorização)
describe('createPlan - Condições Múltiplas (plano pontual)', () => {

    // C1=F, C2=F → aceita (não é pontual, tem autorização)
    test('TU54 - CM: tipo regular com autorização deve ser aceite', () => {
        const plan = plansService.createPlan('regular', 18, 25, 40, 70, 5000, 20000, 90, 'responsavel1');
        expect(plan.type).toBe('regular');
    });

    // C1=F, C2=T → aceita (não é pontual, sem autorização)
    test('TU55 - CM: tipo regular sem autorização deve ser aceite', () => {
        const plan = plansService.createPlan('regular', 18, 25, 40, 70, 5000, 20000, 90, null);
        expect(plan.type).toBe('regular');
    });

    // C1=T, C2=F → aceita (é pontual, tem autorização)
    test('TU56 - CM: tipo pontual com autorização deve ser aceite', () => {
        const plan = plansService.createPlan('pontual', 18, 25, 40, 70, 5000, 20000, 90, 'responsavel1');
        expect(plan.type).toBe('pontual');
    });

    // C1=T, C2=T → rejeita (é pontual, sem autorização)
    test('TU57 - CM: tipo pontual sem autorização deve lançar erro', () => {
        expect(() =>
            plansService.createPlan('pontual', 18, 25, 40, 70, 5000, 20000, 90, null)
        ).toThrow('Plano pontual requer autorização do Responsável Técnico');
    });
});