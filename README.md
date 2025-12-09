# API Test Framework

Simple Node JavaScript based API testing framework.

Features:
- Uses `axios` for HTTP calls
- Gets access token from Microsoft login (client credentials)
- Pre-configures axios with Authorization header
- Provides a `request provider` for sample domain objects: provider, product, package, insurance
- Tests with `jest` and chainable tests within a test file

Setup

1. Copy `.env.example` to `.env` and fill values.

2. Install dependencies:

```powershell
npm install
```

3. Run tests:

```powershell
npm test
```

Notes

- If `API_BASE_URL` is not provided in `.env`, network tests will be skipped and local assertion tests will still run.
- You can customize requests obtained from the request provider before sending them.
