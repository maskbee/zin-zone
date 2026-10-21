/**
 * functions/_utils.js
 * Cryptographic HMAC-SHA256 Token utilities and HTTP helpers for Cloudflare Pages Functions.
 */

const DEFAULT_SECRET = 'ZinZone_Production_Master_Key_Secret_2026_SecureMoat';

export function getSecret(env) {
  return (env && env.HMAC_SECRET) ? env.HMAC_SECRET : DEFAULT_SECRET;
}

export function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

function stringToUint8Array(str) {
  return new TextEncoder().encode(str);
}

function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function hexToUint8Array(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

export async function signToken(payloadObj, secretStr) {
  const secretKey = await crypto.subtle.importKey(
    'raw',
    stringToUint8Array(secretStr),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const payloadJson = JSON.stringify(payloadObj);
  const payloadBase64 = btoa(unescape(encodeURIComponent(payloadJson)));

  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    secretKey,
    stringToUint8Array(payloadBase64)
  );

  const signatureHex = bufferToHex(signatureBuffer);
  return `${payloadBase64}.${signatureHex}`;
}

export async function verifyToken(tokenString, secretStr) {
  if (!tokenString || typeof tokenString !== 'string') return null;
  const parts = tokenString.split('.');
  if (parts.length !== 2) return null;

  const [payloadBase64, signatureHex] = parts;

  try {
    const secretKey = await crypto.subtle.importKey(
      'raw',
      stringToUint8Array(secretStr),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const isValid = await crypto.subtle.verify(
      'HMAC',
      secretKey,
      hexToUint8Array(signatureHex),
      stringToUint8Array(payloadBase64)
    );

    if (!isValid) return null;

    const payloadJson = decodeURIComponent(escape(atob(payloadBase64)));
    return JSON.parse(payloadJson);
  } catch (err) {
    return null;
  }
}
