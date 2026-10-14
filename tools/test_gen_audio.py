import asyncio
import os
import json
import edge_tts

VOICE = "zh-CN-XiaoxiaoNeural"
OUTPUT_DIR = "audio/sentences"

os.makedirs(OUTPUT_DIR, exist_ok=True)

test_sentences = [
    ("d1_s1", "打卡"),
    ("d1_s2", "加班"),
    ("d1_s3", "迟到了"),
    ("d1_s4", "我想请假"),
    ("d1_s5", "下班了")
]

async def generate_item(item_id, text):
    out_path = os.path.join(OUTPUT_DIR, f"{item_id}.mp3")
    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(out_path)
    size = os.path.getsize(out_path)
    print(f"Generated {out_path} for '{text}' ({size} bytes)")

async def main():
    tasks = [generate_item(item_id, text) for item_id, text in test_sentences]
    await asyncio.gather(*tasks)

asyncio.run(main())
