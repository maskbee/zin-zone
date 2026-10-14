import asyncio
import os
import json
import edge_tts

VOICE = "zh-CN-XiaoxiaoNeural"
OUTPUT_DIR = "audio/sentences"

os.makedirs(OUTPUT_DIR, exist_ok=True)

with open("tools/sentences_to_generate.json", "r", encoding="utf-8") as f:
    items = json.load(f)

print(f"Total items to generate: {len(items)}")

semaphore = asyncio.Semaphore(5)  # Concurrency limit of 5 to avoid network throttling

async def generate_item(item):
    item_id = item["id"]
    text = item["text"]
    out_path = os.path.join(OUTPUT_DIR, f"{item_id}.mp3")

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
    print(f"\nCompleted: {success}/{len(items)} audio files generated successfully.")

    # Generate audio_manifest.json mapping text and id to relative audio paths
    manifest = {}
    for r in results:
        if r[2]:
            item_id = r[0]
            text = r[1]
            manifest[item_id] = f"audio/sentences/{item_id}.mp3"
            manifest[text] = f"audio/sentences/{item_id}.mp3"

    with open("data/audio_manifest.json", "w", encoding="utf-8") as mf:
        json.dump(manifest, mf, ensure_ascii=False, indent=2)
    print("Saved audio mapping to data/audio_manifest.json")

asyncio.run(main())
