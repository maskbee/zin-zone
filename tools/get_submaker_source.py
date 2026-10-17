import inspect
import edge_tts.submaker

src = inspect.getsource(edge_tts.submaker.SubMaker)
with open("tools/submaker_source.py", "w", encoding="utf-8") as f:
    f.write(src)
print("SubMaker source saved")
