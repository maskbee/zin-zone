import os

# Check MP3 duration using basic frame header or ffprobe/mutagen if available
promo_files = [
    "audio/promo/zin_zone_promo_nam_minh.mp3",
    "audio/promo/zin_zone_promo_hoai_my.mp3",
    "audio/promo/zin_zone_promo_nam_minh_normal.mp3",
    "audio/promo/zin_zone_promo_hoai_my_normal.mp3"
]

for p in promo_files:
    if os.path.exists(p):
        sz = os.path.getsize(p)
        # Approximate duration at 48kbps or standard edge_tts bitrate (48000 bps = 6000 bytes/sec)
        est_sec = sz / 6000.0
        print(f"{p}: {sz} bytes (approx {est_sec:.1f}s)")
