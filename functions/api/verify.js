/**
 * functions/api/verify.js
 * Cloudflare Pages Function: GET /api/verify
 * Validates a signed HMAC token against database status and device_id.
 */

import { jsonResponse, getSecret, verifyToken } from '../_utils.js';

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  let token = url.searchParams.get('token');
  let device_id = url.searchParams.get('device_id');

  // Support Authorization header fallback
  const authHeader = request.headers.get('Authorization');
  if (!token && authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  }

  if (!token || !device_id) {
    return jsonResponse({ valid: false, reason: 'MISSING_PARAMS' }, 400);
  }

  // 1. Verify cryptographic HMAC signature
  const payload = await verifyToken(token, getSecret(env));
  if (!payload || !payload.code || !payload.device_id) {
    return jsonResponse({ valid: false, reason: 'INVALID_SIGNATURE' }, 401);
  }

  // 2. Validate device match in token
  if (payload.device_id !== device_id) {
    return jsonResponse({ valid: false, reason: 'DEVICE_MISMATCH' }, 403);
  }

  // 3. Check live database status if DB is bound
  if (env.DB) {
    try {
      const license = await env.DB.prepare(
        'SELECT status, device_id FROM licenses WHERE code = ?'
      ).bind(payload.code).first();

      if (!license) {
        return jsonResponse({ valid: false, reason: 'LICENSE_NOT_FOUND' }, 404);
      }

      if (license.status !== 'ACTIVE') {
        return jsonResponse({ valid: false, reason: 'REVOKED' }, 403);
      }

      if (license.device_id !== device_id) {
        return jsonResponse({ valid: false, reason: 'DEVICE_BOUND_ELSEWHERE' }, 403);
      }
    } catch (err) {
      return jsonResponse({ valid: false, reason: 'DB_ERROR: ' + err.message }, 500);
    }
  }

  return jsonResponse({
    valid: true,
    code: payload.code,
    device_id
  }, 200);
}
