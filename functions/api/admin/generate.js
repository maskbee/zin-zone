/**
 * functions/api/admin/generate.js
 * Cloudflare Pages Function: POST /api/admin/generate
 * Password-protected endpoint to generate and store batch activation codes in D1.
 */

import { jsonResponse } from '../../_utils.js';

const DEFAULT_ADMIN_KEY = 'ZinZone_Secret_Admin_Key_2026';

function randomHex(length = 4) {
  const chars = '0123456789ABCDEF';
  let res = '';
  for (let i = 0; i < length; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return res;
}

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

  const count = Math.min(Math.max(parseInt(body.count || 1, 10), 1), 500);
  const channel = (body.channel || 'VIP').toUpperCase().replace(/[^A-Z0-9]/g, '') || 'VIP';
  const orderNote = (body.order_note || '').trim();
  const now = Date.now();

  const generated = [];

  try {
    for (let i = 0; i < count; i++) {
      const code = `ZZ-${channel}-${randomHex(4)}-${randomHex(4)}`;
      await env.DB.prepare(
        'INSERT INTO licenses (code, status, device_id, created_at, activated_at, order_note) VALUES (?, ?, NULL, ?, NULL, ?)'
      ).bind(code, 'ACTIVE', now, orderNote).run();

      generated.push({
        code,
        channel,
        url: `https://zin.zone?token=${code}`
      });
    }

    return jsonResponse({
      success: true,
      count: generated.length,
      created_at: now,
      licenses: generated
    }, 200);

  } catch (err) {
    return jsonResponse({ error: 'Database insertion error: ' + err.message }, 500);
  }
}
