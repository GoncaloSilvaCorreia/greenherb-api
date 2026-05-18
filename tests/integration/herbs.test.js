const request = require('supertest');
const app = require('../../src/app');

describe('TI04 - POST /herbs', () => {

    test('TI04a - criação válida devolve 201', async () => {
        const res = await request(app)
            .post('/herbs')
            .set('Content-Type', 'application/json')
            .send({ name: 'Hortelã', scientificName: 'Mentha spicata', cycledays: 90, minTemp: 15, maxTemp: 25, minHumidity: 50, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000 });
        expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.name).toBe('Hortelã');
    });

    test('TI04b - nome vazio devolve 400', async () => {
        const res = await request(app)
            .post('/herbs')
            .set('Content-Type', 'application/json')
            .send({ name: '', scientificName: 'Mentha spicata', cycledays: 90, minTemp: 15, maxTemp: 25, minHumidity: 50, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000 });
        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });

    test('TI04c - cycledays = 0 devolve 400', async () => {
        const res = await request(app)
            .post('/herbs')
            .set('Content-Type', 'application/json')
            .send({ name: 'Hortelã', scientificName: 'Mentha spicata', cycledays: 0, minTemp: 15, maxTemp: 25, minHumidity: 50, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000 });
        expect(res.status).toBe(400);
    });

    test('TI04d - body vazio devolve 400', async () => {
        const res = await request(app)
            .post('/herbs')
            .set('Content-Type', 'application/json')
            .send({});
        expect(res.status).toBe(400);
    });

    test('TI04e - método GET devolve lista', async () => {
        const res = await request(app).get('/herbs');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

describe('TI05 - POST /herbs/import', () => {

    test('TI05a - importação válida por Administrador devolve 200', async () => {
        const res = await request(app)
            .post('/herbs/import')
            .set('Content-Type', 'application/json')
            .send({ rows: [{ name: 'Manjericão', scientificName: 'Ocimum basilicum', cycledays: 60, minTemp: 18, maxTemp: 28, minHumidity: 40, maxHumidity: 70, minLuminosity: 8000, maxLuminosity: 22000 }], userRole: 'Administrador' });
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(1);
    });

    test('TI05b - importação por Tecnico devolve 400', async () => {
        const res = await request(app)
            .post('/herbs/import')
            .set('Content-Type', 'application/json')
            .send({ rows: [{ name: 'Hortelã', scientificName: 'Mentha spicata', cycledays: 90, minTemp: 15, maxTemp: 25, minHumidity: 50, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000 }], userRole: 'Tecnico' });
        expect(res.status).toBe(400);
    });

    test('TI05c - ficheiro vazio devolve 400', async () => {
        const res = await request(app)
            .post('/herbs/import')
            .set('Content-Type', 'application/json')
            .send({ rows: [], userRole: 'Administrador' });
        expect(res.status).toBe(400);
    });

    test('TI05d - linhas mistas devolve 200 com totais', async () => {
        const res = await request(app)
            .post('/herbs/import')
            .set('Content-Type', 'application/json')
            .send({ rows: [
                { name: '', scientificName: 'Mentha spicata', cycledays: 90, minTemp: 15, maxTemp: 25, minHumidity: 50, maxHumidity: 70, minLuminosity: 5000, maxLuminosity: 20000 },
                { name: 'Alecrim', scientificName: 'Rosmarinus officinalis', cycledays: 120, minTemp: 18, maxTemp: 27, minHumidity: 40, maxHumidity: 60, minLuminosity: 6000, maxLuminosity: 24000 }
            ], userRole: 'Administrador' });
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(1);
        expect(res.body.failed).toBe(1);
    });
});