const request = require('supertest');
const app = require('../../src/app');

describe('TI06 - POST /plans', () => {

    test('TI06a - plano regular válido devolve 201', async () => {
        const res = await request(app)
            .post('/plans')
            .set('Content-Type', 'application/json')
            .send({ type: 'regular', minTemp: 18, maxTemp: 25, minHumidity: 40, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000, cycleDays: 90, authorizedBy: null });
        expect(res.status).toBe(201);
        expect(res.body.type).toBe('regular');
    });

    test('TI06b - plano emergencia válido devolve 201', async () => {
        const res = await request(app)
            .post('/plans')
            .set('Content-Type', 'application/json')
            .send({ type: 'emergencia', minTemp: 18, maxTemp: 25, minHumidity: 40, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000, cycleDays: 30, authorizedBy: null });
        expect(res.status).toBe(201);
    });

    test('TI06c - plano pontual com autorização devolve 201', async () => {
        const res = await request(app)
            .post('/plans')
            .set('Content-Type', 'application/json')
            .send({ type: 'pontual', minTemp: 18, maxTemp: 25, minHumidity: 40, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000, cycleDays: 7, authorizedBy: 'responsavel1' });
        expect(res.status).toBe(201);
        expect(res.body.authorizedBy).toBe('responsavel1');
    });

    test('TI06d - plano pontual sem autorização devolve 400', async () => {
        const res = await request(app)
            .post('/plans')
            .set('Content-Type', 'application/json')
            .send({ type: 'pontual', minTemp: 18, maxTemp: 25, minHumidity: 40, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000, cycleDays: 7, authorizedBy: null });
        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });

    test('TI06e - tipo inválido devolve 400', async () => {
        const res = await request(app)
            .post('/plans')
            .set('Content-Type', 'application/json')
            .send({ type: 'invalido', minTemp: 18, maxTemp: 25, minHumidity: 40, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000, cycleDays: 90, authorizedBy: null });
        expect(res.status).toBe(400);
    });

    test('TI06f - temperatura fora dos limites devolve 400', async () => {
        const res = await request(app)
            .post('/plans')
            .set('Content-Type', 'application/json')
            .send({ type: 'regular', minTemp: 17, maxTemp: 25, minHumidity: 40, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000, cycleDays: 90, authorizedBy: null });
        expect(res.status).toBe(400);
    });

    test('TI06g - humidade fora dos limites devolve 400', async () => {
        const res = await request(app)
            .post('/plans')
            .set('Content-Type', 'application/json')
            .send({ type: 'regular', minTemp: 18, maxTemp: 25, minHumidity: 39, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000, cycleDays: 90, authorizedBy: null });
        expect(res.status).toBe(400);
    });

    test('TI06h - body vazio devolve 400', async () => {
        const res = await request(app)
            .post('/plans')
            .set('Content-Type', 'application/json')
            .send({});
        expect(res.status).toBe(400);
    });

    test('TI06i - método GET devolve lista', async () => {
        const res = await request(app).get('/plans');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});