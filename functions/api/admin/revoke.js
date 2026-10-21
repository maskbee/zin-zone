/**
 * functions/api/admin/revoke.js
 * Cloudflare Pages Function: POST /api/admin/revoke
 * Password-protected endpoint to revoke specific or batch activation codes in D1.
 */

import { jsonResponse } from '../../_utils.js';

const DEFAULT_ADMIN_KEY = 'ZinZone_Secret_Admin_Key_2026';

export async function onRequestPost(context) {
  const { request, env } = context;

  // 1. Check Admin Key authentication
  const adminKey = request.headers.get('X-Admin-Key') || request.headers.get('Authorization');
  const expectedKey = (env && env.ADMIN_KEY) ? env.ADMIN_KEY : DEFAULT_ADMIN_KEY;

  if (!adminKey || (adminKey !== expectedKey && adminKey !== `Bearer ${expectedKey}`)) {
    return jsonResponse({ error: 'Unauthorized: Sai mã quản trị viên.' }, 401);
  }

  if (!env.DB) {
    return jsonResponse({ error: 'Database not available (env.DB is missing).' }, 500);
  }

  let body = {};
  try {
    body = await request.json();
  } catch (e) {}

  const code = (body.code || '').trim().toUpperCase();
  const codes = Array.isArray(body.codes) ? body.codes.map(c => String(c).trim().toUpperCase()) : [];
  const revokeAllTest = body.revoke_all_test === true;

  try {
    let affected = 0;

    if (code) {
      const res = await env.DB.prepare(
        "UPDATE licenses SET status = 'REVOKED' WHERE code = ?"
      ).bind(code).run();
      affected = res.meta?.changes || 1;
    } else if (codes.length > 0) {
      for (const c of codes) {
        await env.DB.prepare(
          "UPDATE licenses SET status = 'REVOKED' WHERE code = ?"
        ).bind(c).run();
        affected++;
      }
    } else if (revokeAllTest) {
      const res = await env.DB.prepare(
        "UPDATE licenses SET status = 'REVOKED' WHERE code LIKE 'ZZ-TEST-%' OR code LIKE 'ZZ-DEV-%'"
      ).run();
      affected = res.meta?.changes || 0;
    } else {
      return jsonResponse({ error: 'Cần cung cấp code hoặc danh sách codes cần thu hồi.' }, 400);
    }

    return jsonResponse({
      success: true,
      message: `Đã thu hồi thành công ${affected} mã bản quyền.`,
      revoked_count: affected
    }, 200);

  } catch (err) {
    return jsonResponse({ error: 'Database revocation error: ' + err.message }, 500);
  }
}
