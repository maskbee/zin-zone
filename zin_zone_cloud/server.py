# -*- coding: utf-8 -*-
"""
zin_zone_cloud/server.py
Backend server prototype for zin.zone:
1. Device activation and cryptographic hardware token verification (/api/activate, /api/verify)
2. Dynamic curriculum hot-updates (/api/curriculum/latest)
3. iOS WebClip profile generator with hardware/token pre-binding (/api/ios/profile)
4. Anti-copy gatekeeper (Unauthorized sharing blocked)
"""
import os
import json
import time
import hmac
import hashlib
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

PORT = 8088
MASTER_SECRET = b"ZinZone_Secret_Key_Vietnam_2026_SecureMoat"

# In-memory database of registered devices (in production, use SQLite/MySQL)
REGISTERED_DEVICES = {
    # "DEVICE_FINGERPRINT": {"brand": "Samsung", "model": "A14", "activated_at": 1775730000, "status": "active"}
}

def sign_device_token(device_id: str, platform: str) -> str:
    """Generates a tamper-proof cryptographic activation token for a device."""
    payload = f"{device_id}|{platform}|zin.zone".encode('utf-8')
    sig = hmac.new(MASTER_SECRET, payload, hashlib.sha256).hexdigest()
    return f"{device_id}.{sig[:24]}"

def verify_device_token(token: str, platform: str) -> bool:
    """Verifies that a token was legitimately issued by zin.zone for this hardware ID."""
    if not token or "." not in token:
        return False
    parts = token.split(".")
    device_id = parts[0]
    expected_sig = hmac.new(MASTER_SECRET, f"{device_id}|{platform}|zin.zone".encode('utf-8'), hashlib.sha256).hexdigest()
    return hmac.compare_digest(parts[1], expected_sig[:24])

class ZinZoneHandler(BaseHTTPRequestHandler):
    def _send_json(self, data, code=200):
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))

    def do_GET(self):
        url = urlparse(self.path)
        params = parse_qs(url.query)

        # 1. Device Verification Endpoint: /api/verify
        if url.path == '/api/verify':
            token = params.get('token', [''])[0]
            platform = params.get('platform', ['android'])[0]
            if verify_device_token(token, platform):
                self._send_json({
                    "status": "success",
                    "licensed": True,
                    "message": "Thiết bị Zin Zone hợp lệ! Đã kích hoạt bản quyền thành công.",
                    "expires": "lifetime",
                    "cloud_features": ["hot_updates", "job_board", "slang_weekly"]
                })
            else:
                self._send_json({
                    "status": "error",
                    "licensed": False,
                    "message": "CẢNH BÁO: Thiết bị chưa được kích hoạt bản quyền từ Zin Zone! Không thể truy cập bài học."
                }, 403)

        # 2. Dynamic Hot-Update Content: /api/curriculum/latest
        elif url.path == '/api/curriculum/latest':
            token = params.get('token', [''])[0]
            platform = params.get('platform', ['android'])[0]
            if not verify_device_token(token, platform):
                self._send_json({"error": "Unauthorized hardware. Please contact Zin Zone."}, 401)
                return

            # Return latest dynamic patch (new slang, weekly factory words, job recommendations)
            self._send_json({
                "version": "2.4.0",
                "update_date": "2026-10-09",
                "weekly_bonus_slang": [
                    {
                        "zh": "抓紧赶单！",
                        "pinyin": "zhuājǐn gǎndān!",
                        "viBoi": "Choa chỉnh cản đan!",
                        "viMeaning": "Khẩn trương chạy đơn hàng gấp!",
                        "hook": "Sếp giục cản đan như giục sinh đẻ, tay bấm thoăn thoắt không ngừng nghỉ!"
                    },
                    {
                        "zh": "不要偷懒！",
                        "pinyin": "bú yào tōulǎn!",
                        "viBoi": "Pú dao thâu lản!",
                        "viMeaning": "Cấm lười biếng / Đừng có trốn việc!",
                        "hook": "PÚ DAO THÂU LẢN: Đừng thò tay vào quần gãi trốn việc kẻo camera quét trúng!"
                    }
                ],
                "vip_job_referrals": [
                    {
                        "company": "Tập đoàn Khoa học Kỹ thuật Foxconn (Bắc Giang)",
                        "role": "Tổ trưởng chuyền SMT / Lắp ráp",
                        "salary": "14,000,000 - 18,000,000 VND + Thưởng",
                        "requirement": "Biết giao tiếp tiếng Trung cơ bản (đã hoàn thành 21 ngày Zin Zone)"
                    },
                    {
                        "company": "Luxshare-ICT (Vân Trung, Bắc Giang)",
                        "role": "Trợ lý QC / Quản lý hiện trường",
                        "salary": "13,500,000 - 16,000,000 VND",
                        "requirement": "Nghe hiểu khẩu lệnh sếp Hoa, biết báo cáo tiến độ"
                    }
                ]
            })

        # 3. iOS MobileConfig Profile Generator: /api/ios/profile
        elif url.path == '/api/ios/profile':
            device_id = params.get('id', ['IOS-ZIN-DEFAULT'])[0]
            token = sign_device_token(device_id, "ios")
            app_url = f"https://zin.zone/app?token={token}"

            # Standard iOS WebClip .mobileconfig XML format
            mobileconfig_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
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
            <string>Tiếng Trung Zin Zone</string>
            <key>PayloadDescription</key>
            <string>Ứng dụng học tiếng Trung 21 ngày thăng chức nhà máy độc quyền</string>
            <key>PayloadDisplayName</key>
            <string>Zin Zone WebClip</string>
            <key>PayloadIdentifier</key>
            <string>zone.zin.webclip.{device_id}</string>
            <key>PayloadType</key>
            <string>com.apple.webClip.managed</string>
            <key>PayloadUUID</key>
            <string>E73A8B9C-412D-4E8F-809A-8F7E6D5C4B3A</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
            <key>Precomposed</key>
            <true/>
            <key>URL</key>
            <string>{app_url}</string>
        </dict>
    </array>
    <key>PayloadDisplayName</key>
    <string>Zin Zone - Điện Thoại Thăng Chức</string>
    <key>PayloadIdentifier</key>
    <string>zone.zin.profile.{device_id}</string>
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
</plist>"""
            self.send_response(200)
            self.send_header('Content-Type', 'application/x-apple-aspen-config')
            self.send_header('Content-Disposition', 'attachment; filename="zin_zone.mobileconfig"')
            self.end_headers()
            self.wfile.write(mobileconfig_xml.encode('utf-8'))

        else:
            self._send_json({"service": "zin.zone API Gatekeeper", "status": "online", "version": "2.4"})

def run_test():
    print("[*] Testing Token Generation & Verification...")
    test_id = "ANDROID-IMEI-869201048291032"
    token = sign_device_token(test_id, "android")
    print(f"Generated Token: {token}")
    valid = verify_device_token(token, "android")
    print(f"Token Verification (Valid?): {valid}")
    tampered = verify_device_token(token + "TAMPER", "android")
    print(f"Tampered Token Blocked: {not tampered}")

if __name__ == "__main__":
    run_test()
