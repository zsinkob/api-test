require('dotenv').config();
const pactum = require('pactum');
const { matchers } = require('pactum');
const nock = require('nock');
const rp = require('../src/requestProvider');

describe('Pactum validation demo - end-to-end techniques', () => {
  const base = process.env.API_BASE_URL || 'http://localhost';
  const scope = nock(base)
    .persist()
    .post('/insurance/provider')
    .reply(201, (uri, requestBody) => ({
      id: 'prov-12345',
      name: requestBody.name || 'Test Provider',
      contactEmail: requestBody.contactEmail || 'provider@example.com',
      price: requestBody.price || 9.99
    }), { 'Content-Type': 'application/json' })
    .post('/insurance')
    .reply(200, (uri, requestBody) => ({
      id: 'ins-98765',
      policyNumber: `PN-${Math.floor(Math.random() * 100000)}`,
      providerId: requestBody.provider && requestBody.provider.id ? requestBody.provider.id : 'prov-12345'
    }), { 'Content-Type': 'application/json' });

  afterAll(() => {
    nock.cleanAll();
    nock.restore();
  });

  test('create provider: status, partial JSON, schema, headers, store and matcher', async () => {
    const payload = rp.provider();

    const providerSchema = {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        contactEmail: { type: 'string', format: 'email' },
        price: { type: 'number' }
      },
      required: ['id', 'name']
    };

    await pactum.spec()
      .post('/insurance/provider')
      .withJson(payload)
      .expectStatus(201)                                    // status check
      .expectHeader('content-type', 'application/json')    // header check
      .expectJsonLike({ name: payload.name })               // partial match
      .expectJsonSchema(providerSchema)                     // schema validation
      .stores('providerId', 'id')                           // store id for later
      .toss();

    // stored value is used in the next test (see usage of $S{providerId})
  });

  test('create insurance: use stored provider id and check body contains value', async () => {
    const ins = rp.insurance();
    // Put a provider object that references stored providerId
    ins.provider = { id: '$S{providerId}' };

    await pactum.spec()
      .post('/insurance')
      .withJson(ins)
      .expectStatus(200)
      .expectBodyContains('policyNumber')      // body contains
      .expectJsonLike({ providerId: '$S{providerId}' }) // ensure providerId stored used
      .toss();
  });
});
