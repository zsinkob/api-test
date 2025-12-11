require('dotenv').config();
const pactum = require('pactum');

describe('API Test Framework - Pactum Example Tests', () => {
    const base = process.env.API_BASE_URL;
    let rp;

    beforeAll(async () => {
        const mod = await import('../src/requestProvider.js');
        const RequestProvider = mod.default;
        rp = new RequestProvider();
    });

    if (base) {
        test('POST /insurance/provider should return 2xx', async () => {
            const payload = rp.provider();
            await pactum.spec()
                .post('/insurance/provider')
                .withJson(payload)
                .expectStatus(201)
                .toss();
        });

        test('POST /insurance should accept insurance and return 2xx', async () => {
            const payload = rp.insurance();
            await pactum.spec()
                .post('/insurance')
                .withJson(payload)
                .expectStatus(200)
                .toss();
        });
    } else {
        test('network tests skipped (set API_BASE_URL in .env to enable)', () => {
            expect(true).toBe(true);
        });
    }
});
