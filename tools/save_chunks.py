import asyncio
import edge_tts
import json

async def test_chunk():
    communicate = edge_tts.Communicate("Xin chao cac ban", "vi-VN-NamMinhNeural")
    chunks = []
    async for chunk in communicate.stream():
        if chunk["type"] != "audio":
            chunks.append(chunk)
    with open("tools/chunks_sample.json", "w", encoding="utf-8") as f:
        json.dump(chunks, f, ensure_ascii=False, indent=2)
    print("Saved", len(chunks), "non-audio chunks")

asyncio.run(test_chunk())
