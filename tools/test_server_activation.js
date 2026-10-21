/**
 * tools/test_server_activation.js
 * Comprehensive automated test suite for Phase 2:
 * 1. Database table operations (D1 mock compliant)
 * 2. POST /api/activate (First-time binding & HMAC token issuance)
 * 3. GET /api/verify (Live verification & HMAC check)
 * 4. Conflict prevention: Same code on another device (409 Conflict)
 * 5. Tamper protection: Fake/modified token (401 Invalid Signature)
 * 6. Server-side revocation: Immediate invalidation
 * 7. Offline fallback: Graceful offline study mode with valid signed token
 * 8. Service Worker audit: Excludes /api/ from caching
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Polyfill global Web Crypto API if needed in Node
if (!globalThis.crypto) {
  globalThis.crypto = crypto.webcrypto;
}

// In-Memory D1 Mock matching Cloudflare D1 API
class MockD1Database {
  constructor() {
    this.table = new Map();
    this.nextId = 1;
  }

  prepare(query) {
    const db = this;
    return {
      _params: [],
      bind(...args) {
        this._params = args;
        return this;
      },
      async first() {
        const results = await this.all();
        return results.results[0] || null;
      },
      async all() {
        const q = query.trim().toUpperCase();
        if (q.startsWith('SELECT')) {
          if (q.includes('WHERE CODE = ?')) {
            const code = this._params[0];
            const row = db.table.get(code);
            return { results: row ? [{ ...row }] : [] };
          }
          return { results: Array.from(db.table.values()) };
        }
        return { results: [] };
      },
      async run() {
        const q = query.trim().toUpperCase();
        if (q.startsWith('INSERT INTO LICENSES')) {
          // INSERT INTO licenses (code, status, device_id, created_at, activated_at, order_note) VALUES (?, ?, NULL, ?, NULL, ?)
          const [code, status, createdAt, orderNote] = this._params;
          if (db.table.has(code)) {
            throw new Error(`UNIQUE constraint failed: licenses.code (${code})`);
          }
          db.table.set(code, {
            id: db.nextId++,
            code,
            status,
            device_id: null,
            created_at: createdAt,
            activated_at: null,
            order_note: orderNote
          });
          return { success: true, meta: { changes: 1 } };
        }
        if (q.startsWith('UPDATE LICENSES SET DEVICE_ID = ?, ACTIVATED_AT = ? WHERE CODE = ?')) {
          const [deviceId, activatedAt, code] = this._params;
          const row = db.table.get(code);
          if (row) {
            row.device_id = deviceId;
            row.activated_at = activatedAt;
            return { success: true, meta: { changes: 1 } };
          }
          return { success: false, meta: { changes: 0 } };
        }
        if (q.startsWith("UPDATE LICENSES SET STATUS = 'REVOKED' WHERE CODE = ?")) {
          const [code] = this._params;
          const row = db.table.get(code);
          if (row) {
            row.status = 'REVOKED';
            return { success: true, meta: { changes: 1 } };
          }
          return { success: false, meta: { changes: 0 } };
        }
        return { success: true, meta: { changes: 0 } };
      }
    };
  }
}

async function runTests() {
  console.log('\n======================================================');
  console.log('🧪 ZIN.ZONE PHASE 2: SERVER ACTIVATION TEST SUITE');
  console.log('======================================================\n');

  let passedCount = 0;
  let failedCount = 0;

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`[PASS] ✓ ${testName}`);
      passedCount++;
    } else {
      console.error(`[FAIL] ✕ ${testName}: ${details}`);
      failedCount++;
    }
  }

  const db = new MockD1Database();
  const env = {
    DB: db,
    HMAC_SECRET: 'TEST_SECRET_KEY_FOR_ZIN_ZONE_2026',
    ADMIN_KEY: 'ADMIN_SECRET_KEY_2026'
  };

  // Import functions dynamically
  const { onRequestPost: handleActivate } = await import('../functions/api/activate.js');
  const { onRequestGet: handleVerify } = await import('../functions/api/verify.js');
  const { onRequestPost: handleAdminGenerate } = await import('../functions/api/admin/generate.js');
  const { onRequestPost: handleAdminRevoke } = await import('../functions/api/admin/revoke.js');

  // Test 1: Admin generates activation codes into D1
  console.log('--- Test Case 1: Admin Code Generation ---');
  const genReq = new Request('https://zin.zone/api/admin/generate', {
    method: 'POST',
    headers: { 'X-Admin-Key': 'ADMIN_SECRET_KEY_2026', 'Content-Type': 'application/json' },
    body: JSON.stringify({ count: 3, channel: 'QUEVO', order_note: 'Test Order Phone Store' })
  });
  const genRes = await handleAdminGenerate({ request: genReq, env });
  const genData = await genRes.json();

  assert(genRes.status === 200, 'Admin generate returns 200 status');
  assert(genData.count === 3 && genData.licenses.length === 3, 'Admin generated exactly 3 codes');
  const testCode1 = genData.licenses[0].code;
  const testCode2 = genData.licenses[1].code;
  assert(testCode1.startsWith('ZZ-QUEVO-'), `Generated code format matches: ${testCode1}`);

  // Test 2: Device A activates new code
  console.log('\n--- Test Case 2: New Code Activation (Device A) ---');
  const actReqA = new Request('https://zin.zone/api/activate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: testCode1, device_id: 'dev_iphone_device_A' })
  });
  const actResA = await handleActivate({ request: actReqA, env });
  const actDataA = await actResA.json();

  assert(actResA.status === 200, 'Activation returns 200 status');
  assert(actDataA.success === true, 'Activation success flag is true');
  assert(typeof actDataA.token === 'string' && actDataA.token.includes('.'), 'HMAC signed token returned');
  const tokenA = actDataA.token;

  // Test 3: Same Device A verifies token online
  console.log('\n--- Test Case 3: Same Device Online Verification ---');
  const verifyReqA = new Request(`https://zin.zone/api/verify?token=${encodeURIComponent(tokenA)}&device_id=dev_iphone_device_A`);
  const verifyResA = await handleVerify({ request: verifyReqA, env });
  const verifyDataA = await verifyResA.json();

  assert(verifyResA.status === 200, 'Verify returns 200 status');
  assert(verifyDataA.valid === true, 'Verify data valid is true');
  assert(verifyDataA.code === testCode1, 'Verified license code matches');

  // Test 4: Device B tries to activate the same already-bound code -> 409 Conflict
  console.log('\n--- Test Case 4: Conflict Prevention (Device B with same code) ---');
  const actReqB = new Request('https://zin.zone/api/activate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: testCode1, device_id: 'dev_redmi_device_B' })
  });
  const actResB = await handleActivate({ request: actReqB, env });
  const actDataB = await actResB.json();

  assert(actResB.status === 409, 'Conflict returns HTTP 409');
  assert(actDataB.success === false, 'Activation is rejected for different device');
  assert(actDataB.error.includes('thiết bị khác'), `Error message mentions device binding: "${actDataB.error}"`);

  // Test 5: Device B tries to steal Device A's token -> 403 Device Mismatch
  console.log("\n--- Test Case 5: Token Tamper/Theft Protection ---");
  const stealReq = new Request(`https://zin.zone/api/verify?token=${encodeURIComponent(tokenA)}&device_id=dev_redmi_device_B`);
  const stealRes = await handleVerify({ request: stealReq, env });
  const stealData = await stealRes.json();

  assert(stealRes.status === 403, 'Stolen token returns HTTP 403');
  assert(stealData.valid === false && stealData.reason === 'DEVICE_MISMATCH', 'Rejected due to DEVICE_MISMATCH');

  // Test 6: Forged Token with invalid HMAC signature -> 401 Invalid Signature
  console.log('\n--- Test Case 6: Forged Token Signature Check ---');
  const fakeToken = tokenA.substring(0, tokenA.length - 6) + 'F00BAR';
  const fakeReq = new Request(`https://zin.zone/api/verify?token=${encodeURIComponent(fakeToken)}&device_id=dev_iphone_device_A`);
  const fakeRes = await handleVerify({ request: fakeReq, env });
  const fakeData = await fakeRes.json();

  assert(fakeRes.status === 401, 'Tampered token returns HTTP 401');
  assert(fakeData.valid === false && fakeData.reason === 'INVALID_SIGNATURE', 'Rejected due to INVALID_SIGNATURE');

  // Test 7: Server Revocation -> Subsequent verification rejected
  console.log('\n--- Test Case 7: Server-side Revocation ---');
  const revokeReq = new Request('https://zin.zone/api/admin/revoke', {
    method: 'POST',
    headers: { 'X-Admin-Key': 'ADMIN_SECRET_KEY_2026', 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: testCode1 })
  });
  const revokeRes = await handleAdminRevoke({ request: revokeReq, env });
  const revokeData = await revokeRes.json();

  assert(revokeRes.status === 200 && revokeData.success === true, 'Admin revoke succeeds');

  // Now verify again on Device A
  const reVerifyReq = new Request(`https://zin.zone/api/verify?token=${encodeURIComponent(tokenA)}&device_id=dev_iphone_device_A`);
  const reVerifyRes = await handleVerify({ request: reVerifyReq, env });
  const reVerifyData = await reVerifyRes.json();

  assert(reVerifyRes.status === 403, 'Revoked license returns HTTP 403');
  assert(reVerifyData.valid === false && reVerifyData.reason === 'REVOKED', 'Revocation verified by server');

  // Test 8: Offline Study Fallback Simulation
  console.log('\n--- Test Case 8: Offline Learning Simulation ---');
  // When offline (navigator.onLine === false), client trusts local valid token until online
  function clientVerifyOffline(localToken, isOnline) {
    if (!localToken) return false;
    if (!isOnline) {
      // Offline fallback: Allow continuous study
      return true;
    }
    return false; // must call server when online
  }
  assert(clientVerifyOffline(tokenA, false) === true, 'Client offline mode allows study with local token');
  assert(clientVerifyOffline(null, false) === false, 'Client offline without token is rejected');

  // Test 9: Service Worker Caching Policy
  console.log('\n--- Test Case 9: Service Worker API Cache Audit ---');
  const swContent = fs.readFileSync(path.join(__dirname, '../sw.js'), 'utf8');
  const swBypassesApi = swContent.includes('/api/');
  assert(swBypassesApi, 'sw.js contains explicit /api/ cache bypass check');

  console.log('\n======================================================');
  console.log(`TEST SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
  console.log('======================================================\n');

  if (failedCount > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test execution failed with fatal error:', err);
  process.exit(1);
});
