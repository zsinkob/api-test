import 'dotenv/config';
import axios from 'axios';

const tenant = process.env.TENANT_ID || 'common';
const tokenUrl = process.env.TOKEN_URL || `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const scope = process.env.SCOPE; // e.g. https://graph.microsoft.com/.default

let cached = {
  token: null,
  expiresAt: 0
};

export async function getToken() {
  // If a local token is provided, use it and skip the OAuth flow.
  const localToken = process.env.LOCAL_TOKEN;
  if (localToken) {
    cached.token = localToken;
    // set a long expiration for local tokens (process-lifetime)
    cached.expiresAt = Date.now() + 365 * 24 * 3600 * 1000; // 1 year
    return cached.token;
  }

  if (!clientId || !clientSecret || !scope) {
    throw new Error('CLIENT_ID, CLIENT_SECRET and SCOPE must be set in .env, or set LOCAL_TOKEN for local testing');
  }

  const now = Date.now();
  if (cached.token && cached.expiresAt - 10000 > now) {
    return cached.token;
  }

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('scope', scope);

  const resp = await axios.post(tokenUrl, params.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  const data = resp.data;
  if (!data.access_token) {
    throw new Error('No access_token in token response');
  }

  const expiresIn = data.expires_in || 3600;
  cached.token = data.access_token;
  cached.expiresAt = Date.now() + expiresIn * 1000;
  return cached.token;
}
