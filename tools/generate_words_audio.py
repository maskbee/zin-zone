import asyncio
import os
import json
import edge_tts

VOICE = "zh-CN-XiaoxiaoNeural"
OUTPUT_DIR = "audio/words"

os.makedirs(OUTPUT_DIR, exist_ok=True)

with open("tools/words_to_generate.json", "r", encoding="utf-8") as f:
    items = json.load(f)

print(f"Total words to generate: {len(items)}")

semaphore = asyncio.Semaphore(8)

async def generate_item(item):
    item_id = item["id"]
    text = item["text"]
    out_path = os.path.join(OUTPUT_DIR, f"{item_id}.mp3")

    if os.path.exists(out_path) and os.path.getsize(out_path) > 1000:
        return (item_id, text, True, os.path.getsize(out_path))

    async with semaphore:
        for attempt in range(3):
            try:
                communicate = edge_tts.Communicate(text, VOICE)
                await communicate.save(out_path)
                size = os.path.getsize(out_path)
                if size > 1000:
                    return (item_id, text, True, size)
            except Exception as e:
                if attempt == 2:
                    print(f"Failed {item_id} ({text}): {e}")
                    return (item_id, text, False, str(e))
                await asyncio.sleep(1)

async def main():
    tasks = [generate_item(item) for item in items]
    results = await asyncio.gather(*tasks)

    success = sum(1 for r in results if r[2])
    print(f"\nCompleted: {success}/{len(items)} word audio files generated successfully.")

asyncio.run(main())
