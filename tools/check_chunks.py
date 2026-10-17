import asyncio
import edge_tts

async def check_chunks():
    communicate = edge_tts.Communicate("Xin chào các bạn", "vi-VN-NamMinhNeural")
    chunk_types = set()
    async for chunk in communicate.stream():
        chunk_types.add(chunk["type"])
        if chunk["type"] != "audio":
            print("Non-audio chunk:", chunk)
    print("All chunk types:", chunk_types)

asyncio.run(check_chunks())
