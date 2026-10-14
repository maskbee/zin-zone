import asyncio
import os
import json
import edge_tts

VOICE = "zh-CN-XiaoxiaoNeural"

with open("tools/extra_to_generate.json", "r", encoding="utf-8") as f:
    items = json.load(f)

print(f"Total extra items to generate: {len(items)}")

semaphore = asyncio.Semaphore(5)

async def generate_item(item):
    item_id = item["id"]
    text = item["text"]
    item_type = item.get("type", "sentences")
    output_dir = os.path.join("audio", item_type)
    os.makedirs(output_dir, exist_ok=True)
    out_path = os.path.join(output_dir, f"{item_id}.mp3")

    async with semaphore:
        for attempt in range(3):
            try:
                communicate = edge_tts.Communicate(text, VOICE)
                await communicate.save(out_path)
                size = os.path.getsize(out_path)
                if size > 1000:
                    print(f"OK: [{item_id}] {text} ({size} bytes)")
                    return (item_id, text, item_type, True, size)
            except Exception as e:
                if attempt == 2:
                    print(f"Failed {item_id} ({text}): {e}")
                    return (item_id, text, item_type, False, str(e))
                await asyncio.sleep(1)

async def main():
    tasks = [generate_item(item) for item in items]
    results = await asyncio.gather(*tasks)

    success = sum(1 for r in results if r[3])
    print(f"\nCompleted: {success}/{len(items)} audio files generated successfully.")

asyncio.run(main())
