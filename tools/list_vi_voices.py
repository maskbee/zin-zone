import asyncio
import edge_tts

async def list_vi_voices():
    voices = await edge_tts.list_voices()
    vi_voices = [v for v in voices if v["Locale"].startswith("vi")]
    for v in vi_voices:
        print(f"Name: {v['ShortName']}, Gender: {v['Gender']}, Friendly: {v['FriendlyName']}")

asyncio.run(list_vi_voices())
