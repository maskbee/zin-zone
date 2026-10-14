var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker.js
var DOMAIN = "zin.zone";
var ORIGIN = "hanyu-xiexiu.pages.dev";
var encoder = new TextEncoder();
async function hmacSha256Hex(keyBytes, payload) {
  const key = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(hmacSha256Hex, "hmacSha256Hex");
function secretBytes(env) {
  if (!env.SECRET) {
    throw new Error("SECRET not configured");
  }
  return encoder.encode(env.SECRET);
}
__name(secretBytes, "secretBytes");
async function signDeviceToken(env, deviceId, platform) {
  const sig = await hmacSha256Hex(secretBytes(env), `${deviceId}|${platform}|${DOMAIN}`);
  return `${deviceId}.${sig.slice(0, 24)}`;
}
__name(signDeviceToken, "signDeviceToken");
async function verifyDeviceToken(env, token, platform) {
  if (!token || !token.includes("."))
    return false;
  const parts = token.split(".");
  const expectedSig = await hmacSha256Hex(secretBytes(env), `${parts[0]}|${platform}|${DOMAIN}`);
  return expectedSig.slice(0, 24) === parts[1];
}
__name(verifyDeviceToken, "verifyDeviceToken");
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
  });
}
__name(json, "json");
function getCookie(name, header) {
  if (!header)
    return "";
  for (const part of header.split(";")) {
    const kv = part.trim().split("=");
    if (kv[0] === name)
      return decodeURIComponent(kv[1] || "");
  }
  return "";
}
__name(getCookie, "getCookie");
function isMobileUA(ua) {
  return /Mobile|Android|iPhone|iPad|iPod/i.test(ua);
}
__name(isMobileUA, "isMobileUA");
function platformFromUA(ua) {
  return /iPhone|iPad|iPod/i.test(ua) ? "ios" : "android";
}
__name(platformFromUA, "platformFromUA");
function forbiddenPage() {
  const html = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Zin Zone - Thi\u1EBFt b\u1ECB ch\u01B0a k\xEDch ho\u1EA1t</title>
<style>
body{font-family:-apple-system,'Segoe UI',Roboto,sans-serif;background:#0f1115;color:#f5f5f5;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;padding:20px;text-align:center}
.box{max-width:420px;background:#1a1d24;border:1px solid #2c3140;border-radius:16px;padding:36px 28px}
h1{font-size:22px;margin:0 0 14px;color:#ff6b6b}
p{font-size:15px;line-height:1.7;color:#b8bdc9;margin:8px 0}
.code{color:#8ab4f8;word-break:break-all}
</style>
</head>
<body>
<div class="box">
<h1>\u{1F6AB} Thi\u1EBFt b\u1ECB ch\u01B0a \u0111\u01B0\u1EE3c k\xEDch ho\u1EA1t</h1>
<p>Trang n\xE0y ch\u1EC9 d\xE0nh ri\xEAng cho thi\u1EBFt b\u1ECB Zin Zone \u0111\xE3 k\xEDch ho\u1EA1t b\u1EA3n quy\u1EC1n.</p>
<p>Vui l\xF2ng d\xF9ng \u0111\xFAng \u0111i\u1EC7n tho\u1EA1i \u0111\xE3 c\xE0i \u0111\u1EB7t Zin Zone, ho\u1EB7c li\xEAn h\u1EC7 qu\u1EA3n l\xFD \u0111\u1EC3 k\xEDch ho\u1EA1t.</p>
<p class="code">zin.zone - H\u1EC7 th\u1ED1ng ch\u1ED1ng sao ch\xE9p \u0111ang b\u1EA3o v\u1EC7 n\u1ED9i dung.</p>
</div>
</body>
</html>`;
  return new Response(html, {
    status: 403,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" }
  });
}
__name(forbiddenPage, "forbiddenPage");
async function proxyPages(request, url) {
  const target = new URL(url.toString());
  target.host = ORIGIN;
  target.protocol = "https:";
  return fetch(new Request(target.toString(), request));
}
__name(proxyPages, "proxyPages");
var LATEST_PATCH = {
  version: "2.4.0",
  update_date: "2026-10-09",
  weekly_bonus_slang: [
    {
      zh: "\u6293\u7D27\u8D76\u5355\uFF01",
      pinyin: "zhu\u0101j\u01D0n g\u01CEnd\u0101n!",
      viBoi: "Choa ch\u1EC9nh c\u1EA3n \u0111an!",
      viMeaning: "Kh\u1EA9n tr\u01B0\u01A1ng ch\u1EA1y \u0111\u01A1n h\xE0ng g\u1EA5p!",
      hook: "S\u1EBFp gi\u1EE5c c\u1EA3n \u0111an nh\u01B0 gi\u1EE5c sinh \u0111\u1EBB, tay b\u1EA5m tho\u0103n tho\u1EAFt kh\xF4ng ng\u1EEBng ngh\u1EC9!"
    },
    {
      zh: "\u4E0D\u8981\u5077\u61D2\uFF01",
      pinyin: "b\xFA y\xE0o t\u014Dul\u01CEn!",
      viBoi: "P\xFA dao th\xE2u l\u1EA3n!",
      viMeaning: "C\u1EA5m l\u01B0\u1EDDi bi\u1EBFng / \u0110\u1EEBng c\xF3 tr\u1ED1n vi\u1EC7c!",
      hook: "P\xDA DAO TH\xC2U L\u1EA2N: \u0110\u1EEBng th\xF2 tay v\xE0o qu\u1EA7n g\xE3i tr\u1ED1n vi\u1EC7c k\u1EBBo camera qu\xE9t tr\xFAng!"
    }
  ],
  vip_job_referrals: [
    {
      company: "T\u1EADp \u0111o\xE0n Khoa h\u1ECDc K\u1EF9 thu\u1EADt Foxconn (B\u1EAFc Giang)",
      role: "T\u1ED5 tr\u01B0\u1EDFng chuy\u1EC1n SMT / L\u1EAFp r\xE1p",
      salary: "14,000,000 - 18,000,000 VND + Th\u01B0\u1EDFng",
      requirement: "Bi\u1EBFt giao ti\u1EBFp ti\u1EBFng Trung c\u01A1 b\u1EA3n (\u0111\xE3 ho\xE0n th\xE0nh 21 ng\xE0y Zin Zone)"
    },
    {
      company: "Luxshare-ICT (V\xE2n Trung, B\u1EAFc Giang)",
      role: "Tr\u1EE3 l\xFD QC / Qu\u1EA3n l\xFD hi\u1EC7n tr\u01B0\u1EDDng",
      salary: "13,500,000 - 16,000,000 VND",
      requirement: "Nghe hi\u1EC3u kh\u1EA9u l\u1EC7nh s\u1EBFp Hoa, bi\u1EBFt b\xE1o c\xE1o ti\u1EBFn \u0111\u1ED9"
    }
  ]
};
function iosProfile(deviceId, token) {
  const appUrl = `https://${DOMAIN}/app?token=${token}`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>FullScreen</key>
            <true/>
            <key>Icon</key>
            <data></data>
            <key>IsRemovable</key>
            <true/>
            <key>Label</key>
            <string>Ti\u1EBFng Trung Zin Zone</string>
            <key>PayloadDescription</key>
            <string>\u1EE8ng d\u1EE5ng h\u1ECDc ti\u1EBFng Trung 21 ng\xE0y th\u0103ng ch\u1EE9c nh\xE0 m\xE1y \u0111\u1ED9c quy\u1EC1n</string>
            <key>PayloadDisplayName</key>
            <string>Zin Zone WebClip</string>
            <key>PayloadIdentifier</key>
            <string>zone.zin.webclip.${deviceId}</string>
            <key>PayloadType</key>
            <string>com.apple.webClip.managed</string>
            <key>PayloadUUID</key>
            <string>E73A8B9C-412D-4E8F-809A-8F7E6D5C4B3A</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
            <key>Precomposed</key>
            <true/>
            <key>URL</key>
            <string>${appUrl}</string>
        </dict>
    </array>
    <key>PayloadDisplayName</key>
    <string>Zin Zone - \u0110i\u1EC7n Tho\u1EA1i Th\u0103ng Ch\u1EE9c</string>
    <key>PayloadIdentifier</key>
    <string>zone.zin.profile.${deviceId}</string>
    <key>PayloadOrganization</key>
    <string>Zin Zone Vietnam</string>
    <key>PayloadRemovalDisallowed</key>
    <false/>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>A1B2C3D4-E5F6-7890-1234-56789ABCDEF0</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
</dict>
</plist>`;
}
__name(iosProfile, "iosProfile");
var worker_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const params = url.searchParams;
    const path = url.pathname;
    const ua = request.headers.get("user-agent") || "";
    try {
      if (path === "/api/_debug_secret") {
        return json({
          configured: !!env.SECRET,
          len: env.SECRET ? env.SECRET.length : -1,
          prefix_ok: env.SECRET ? env.SECRET.startsWith("ZinZone_") : false,
          suffix_ok: env.SECRET ? env.SECRET.endsWith("SecureMoat") : false
        });
      }
      if (path === "/api/verify") {
        const token2 = params.get("token") || "";
        const platform2 = params.get("platform") || "android";
        if (await verifyDeviceToken(env, token2, platform2)) {
          return json({
            status: "success",
            licensed: true,
            message: "Thi\u1EBFt b\u1ECB Zin Zone h\u1EE3p l\u1EC7! \u0110\xE3 k\xEDch ho\u1EA1t b\u1EA3n quy\u1EC1n th\xE0nh c\xF4ng.",
            expires: "lifetime",
            cloud_features: ["hot_updates", "job_board", "slang_weekly"]
          });
        }
        return json({
          status: "error",
          licensed: false,
          message: "C\u1EA2NH B\xC1O: Thi\u1EBFt b\u1ECB ch\u01B0a \u0111\u01B0\u1EE3c k\xEDch ho\u1EA1t b\u1EA3n quy\u1EC1n t\u1EEB Zin Zone! Kh\xF4ng th\u1EC3 truy c\u1EADp b\xE0i h\u1ECDc."
        }, 403);
      }
      if (path === "/api/curriculum/latest") {
        const token2 = params.get("token") || "";
        const platform2 = params.get("platform") || "android";
        if (!await verifyDeviceToken(env, token2, platform2)) {
          return json({ error: "Unauthorized hardware. Please contact Zin Zone." }, 401);
        }
        return json(LATEST_PATCH);
      }
      if (path === "/api/ios/profile") {
        const deviceId = params.get("id") || "IOS-ZIN-DEFAULT";
        const token2 = await signDeviceToken(env, deviceId, "ios");
        return new Response(iosProfile(deviceId, token2), {
          status: 200,
          headers: {
            "Content-Type": "application/x-apple-aspen-config",
            "Content-Disposition": 'attachment; filename="zin_zone.mobileconfig"'
          }
        });
      }
      if (!isMobileUA(ua)) {
        return proxyPages(request, url);
      }
      const token = params.get("token") || getCookie("zin_token", request.headers.get("cookie") || "");
      const platform = platformFromUA(ua);
      if (token && await verifyDeviceToken(env, token, platform)) {
        const resp = await proxyPages(request, url);
        if (path === "/" || path === "/app") {
          const headers = new Headers(resp.headers);
          headers.append("Set-Cookie", `zin_token=${token}; Path=/; Max-Age=31536000; Secure; SameSite=Lax`);
          return new Response(resp.body, { status: resp.status, headers });
        }
        return resp;
      }
      return forbiddenPage();
    } catch (e) {
      return json({ error: "Internal error", detail: e.message }, 500);
    }
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
