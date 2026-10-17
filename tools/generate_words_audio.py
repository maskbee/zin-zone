import asyncio
import os
import json
import edge_tts

VOICE = "zh-CN-XiaoxiaoNeural"
RATE = "+15%"
OUTPUT_DIR = "audio/words"

os.makedirs(OUTPUT_DIR, exist_ok=True)

# 1. Load 210 words from words_to_generate.json
with open("tools/words_to_generate.json", "r", encoding="utf-8") as f:
    items = json.load(f)

# 2. Load 12 words from extra_to_generate.json
if os.path.exists("tools/extra_to_generate.json"):
    with open("tools/extra_to_generate.json", "r", encoding="utf-8") as f:
        extras = json.load(f)
        for e in extras:
            if e.get("type") == "words":
                items.append({"id": e["id"], "text": e["text"]})

print(f"Total word items to generate (with 3-repeat triplet): {len(items)}")

semaphore = asyncio.Semaphore(10)

async def generate_item(item):
    item_id = item["id"]
    text = item["text"]
    out_path = os.path.join(OUTPUT_DIR, f"{item_id}.mp3")
    triplet_text = f"{text} {text} {text}"

    async with semaphore:
        for attempt in range(4):
            try:
                communicate = edge_tts.Communicate(triplet_text, VOICE, rate=RATE)
                await communicate.save(out_path)
                size = os.path.getsize(out_path)
                if size > 1000:
                    return (item_id, text, True, size)
            except Exception as e:
                if attempt == 3:
                    print(f"Failed {item_id} ({text}): {e}")
                    return (item_id, text, False, str(e))
                await asyncio.sleep(1 + attempt)

async def main():
    tasks = [generate_item(item) for item in items]
    results = await asyncio.gather(*tasks)

    success = sum(1 for r in results if r[2])
    failed = [r for r in results if not r[2]]
    print(f"\nCompleted: {success}/{len(items)} word audio files generated successfully.")
    if failed:
        print(f"Failed count: {len(failed)}")
        for f_item in failed:
            print(" -", f_item)

if __name__ == "__main__":
    asyncio.run(main())
