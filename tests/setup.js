require('dotenv').config();
const pactum = require('pactum');

beforeAll(async () => {
  // set base URL for Pactum requests
  pactum.request.setBaseUrl(process.env.API_BASE_URL || 'http://localhost');

  try {
    const auth = await import('../src/auth.js');
    const token = await auth.getToken();
    if (token) {
      pactum.request.setDefaultHeaders({ Authorization: `Bearer ${token}` });
    }
  } catch (err) {
    // If token can't be obtained (e.g., local mocked tests), continue without it.
    // Tests that require auth can still set headers explicitly or use mocks.
    // Logging here helps debugging but doesn't fail the test run.
    // eslint-disable-next-line no-console
    console.warn('tests/setup: could not obtain token:', err.message || err);
  }
});
