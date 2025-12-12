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
            await pactum.spec()
                .post('/insurance/provider')
                .withJson(rp.provider())
                .expectStatus(201)
                .toss();

            await pactum.spec()
                .post('/insurance/product')
                .withJson(rp.product())
                .expectStatus(201)
                .toss();

            await pactum.spec()
                .post('/insurance/package')
                .withJson(rp.package())
                .expectStatus(201)
                .toss();
            
            await pactum.spec()
            .post('/insurance/insurance')
            .withJson(rp.insurance())
            .expectStatus(201)
            .toss();
        });

    } else {
        test('network tests skipped (set API_BASE_URL in .env to enable)', () => {
            expect(true).toBe(true);
        });
    }
});
