/**
 * functions/api/activate.js
 * Cloudflare Pages Function: POST /api/activate
 * Binds an activation code to a specific device_id and returns a signed HMAC token.
 */

import { jsonResponse, getSecret, signToken } from '../_utils.js';

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return jsonResponse({ success: false, error: 'Dữ liệu yêu cầu không hợp lệ (JSON required).' }, 400);
  }

  const code = (body.code || '').trim().toUpperCase();
  const device_id = (body.device_id || '').trim();

  if (!code || !device_id) {
    return jsonResponse({ success: false, error: 'Thiếu mã kích hoạt hoặc mã định danh thiết bị.' }, 400);
  }

  if (!env.DB) {
    return jsonResponse({ success: false, error: 'Hệ thống cơ sở dữ liệu chưa sẵn sàng (env.DB not configured).' }, 500);
  }

  try {
    // 1. Query database for license code
    const license = await env.DB.prepare(
      'SELECT id, code, status, device_id, created_at, activated_at, order_note FROM licenses WHERE code = ?'
    ).bind(code).first();

    if (!license) {
      return jsonResponse({ success: false, error: 'Mã kích hoạt không tồn tại trên hệ thống.' }, 404);
    }

    // 2. Check if revoked
    if (license.status === 'REVOKED') {
      return jsonResponse({ success: false, error: 'Mã kích hoạt này đã bị thu hồi hoặc hết hạn.' }, 403);
    }

    const now = Date.now();

    // 3. Check if already bound to another device
    if (license.device_id) {
      if (license.device_id !== device_id) {
        return jsonResponse({
          success: false,
          error: 'Mã kích hoạt này đã được sử dụng trên một thiết bị khác. Mỗi mã chỉ dùng cho 01 máy.'
        }, 409);
      }
    } else {
      // 4. First time activation: Bind to this device
      await env.DB.prepare(
        'UPDATE licenses SET device_id = ?, activated_at = ? WHERE code = ?'
      ).bind(device_id, now, code).run();
    }

    // 5. Generate tamper-proof signed HMAC token
    const tokenPayload = {
      code,
      device_id,
      activated_at: license.activated_at || now,
      v: 2
    };

    const token = await signToken(tokenPayload, getSecret(env));

    return jsonResponse({
      success: true,
      token,
      code,
      device_id,
      activated_at: license.activated_at || now
    }, 200);

  } catch (err) {
    return jsonResponse({ success: false, error: 'Lỗi xử lý máy chủ: ' + err.message }, 500);
  }
}
