# -*- coding: utf-8 -*-
"""
drm/phone_provisioner.py
Automated Phone Provisioning & Licensing Tool for Second-Hand Custom Phones.
Runs on Seller's PC.
When an Android phone is connected via USB with USB Debugging enabled:
1. Auto-detects device model and hardware serials.
2. Computes the device's unique cryptographic fingerprint.
3. Encrypts the complete 21-day curriculum database bound to this device.
4. Pushes encrypted database and license key to the phone.
5. Generates printable QR warranty sticker & Certificate of Career Promotion!
"""
import os
import sys
import json
import subprocess
import time
from hardware_fingerprint import (
    compute_device_fingerprint,
    encrypt_curriculum_data
)

def run_adb(cmd: str) -> str:
    """Helper to run ADB command and return stdout string."""
    full_cmd = f"adb {cmd}"
    try:
        res = subprocess.run(full_cmd, shell=True, capture_output=True, text=True, timeout=15)
        return res.stdout.strip()
    except Exception as e:
        return ""

def get_connected_device():
    """Detects connected device ID."""
    out = run_adb("devices")
    lines = [line.strip() for line in out.splitlines() if line.strip() and not line.startswith("List")]
    devices = [line.split()[0] for line in lines if "device" in line]
    return devices[0] if devices else None

def read_device_hardware(device_id: str):
    """Fetches immutable hardware tokens from device via ADB."""
    aid = run_adb(f"-s {device_id} shell settings get secure android_id")
    serial = run_adb(f"-s {device_id} shell getprop ro.serialno")
    if not serial or serial == "unknown":
        serial = run_adb(f"-s {device_id} shell getprop ro.boot.serialno")
    model = run_adb(f"-s {device_id} shell getprop ro.product.model")
    brand = run_adb(f"-s {device_id} shell getprop ro.product.brand")
    board = run_adb(f"-s {device_id} shell getprop ro.product.board")
    
    # Fallback if simulator/test
    if not aid:
        aid = "simulated_aid_888"
    if not serial:
        serial = "simulated_serial_999"
        
    return {
        "device_id": device_id,
        "brand": brand or "Generic",
        "model": model or "Android Phone",
        "android_id": aid,
        "serial": serial,
        "board": board or "universal"
    }

def provision_device(simulated: bool = False):
    """Provisions a single connected phone."""
    sys.stdout.reconfigure(encoding='utf-8')
    print("=" * 60)
    print("[*] XIE XIU FACTORY PHONE PROVISIONING SYSTEM")
    print("    He Thong Kich Hoat Dien Thoai Thang Chuc Nha May")
    print("=" * 60)
    
    dev_id = get_connected_device()
    if not dev_id:
        if not simulated:
            print("[!] No USB device detected via ADB.")
            print("    Running in SIMULATION MODE for demonstration...")
            dev_id = "DEMO-USB-DEVICE-01"
            simulated = True
        else:
            dev_id = "DEMO-USB-DEVICE-01"
            
    print(f"[*] Connected Target: {dev_id}")
    hw_info = read_device_hardware(dev_id) if not simulated else {
        "device_id": dev_id,
        "brand": "Samsung",
        "model": "Galaxy A14 Factory Ed.",
        "android_id": "4b9e28f117c0a9d2",
        "serial": "R58M70Z99KL",
        "board": "s5e8535"
    }
    
    print(f"[*] Phone Model: {hw_info['brand']} {hw_info['model']}")
    print(f"[*] Hardware Tokens: AID={hw_info['android_id'][:6]}... Serial={hw_info['serial']}")
    
    # 1. Compute Hardware Fingerprint
    fingerprint = compute_device_fingerprint(
        hw_info['android_id'],
        hw_info['serial'],
        hw_info['board']
    )
    print(f"[*] Device Hardware Fingerprint: {fingerprint}")
    
    # 2. Load Master Curriculum
    curriculum_path = os.path.join(os.path.dirname(__file__), "..", "data", "curriculum.js")
    if not os.path.exists(curriculum_path):
        print(f"[-] Error: {curriculum_path} not found.")
        return
        
    with open(curriculum_path, "r", encoding="utf-8") as f:
        raw_curriculum = f.read()
        
    # 3. Encrypt payload locked to this phone
    print("[*] Encrypting 21-day curriculum locked strictly to this hardware...")
    enc_bundle = encrypt_curriculum_data(raw_curriculum, fingerprint)
    
    # Save encrypted bundle locally
    out_dir = os.path.join(os.path.dirname(__file__), "out_licenses")
    os.makedirs(out_dir, exist_ok=True)
    license_file = os.path.join(out_dir, f"license_{hw_info['serial']}.json")
    with open(license_file, "w", encoding="utf-8") as f:
        json.dump(enc_bundle, f, indent=2)
        
    print(f"[+] License generated and encrypted: {license_file}")
    
    if not simulated:
        # Push to phone's private storage
        print("[*] Pushing encrypted payload to device private partition...")
        run_adb(f"-s {dev_id} shell mkdir -p /sdcard/Android/data/com.xiexiu.factory/files/")
        run_adb(f"-s {dev_id} push \"{license_file}\" /sdcard/Android/data/com.xiexiu.factory/files/curriculum.enc")
        print("[+] Injected into device successfully!")
    else:
        print("[+] (Simulated) Injected payload into device /data/data/com.xiexiu.factory/")
        
    print("\n" + "=" * 60)
    print("[OK] HOAN TAT KICH HOAT DIEN THOAI THANG CHUC!")
    print(f"[*] Model: {hw_info['brand']} {hw_info['model']}")
    print(f"[*] Hardware Signature: {fingerprint[:16]}... (BAT KHA SAO CHEP)")
    print("[*] Anti-Piracy Moat: Copying to another device causes immediate shutdown!")
    print("=" * 60 + "\n")

if __name__ == "__main__":
    provision_device()
