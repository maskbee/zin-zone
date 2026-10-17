import inspect
import edge_tts

submaker = edge_tts.SubMaker()
with open("tools/submaker_methods.txt", "w", encoding="utf-8") as f:
    for attr in dir(submaker):
        if not attr.startswith("_"):
            f.write(f"{attr}: {getattr(submaker, attr)}\n")
print("Done inspecting SubMaker")
