import json, subprocess, os
from mutagen.mp3 import MP3

PAD = 0.5
os.makedirs("public/audio", exist_ok=True)

with open("data/story.json", encoding="utf-8") as f:
    story = json.load(f)

for i, scene in enumerate(story["scenes"]):
    name = f"audio/scene{i + 1}.mp3"
    base = ["edge-tts", "--voice", scene["voice"], "--text", scene["text"], "--write-media", "public/" + name]
    pitch = scene.get("pitch")
    extra = ["--pitch=" + pitch] if pitch and pitch != "+0Hz" else []
    try:
        subprocess.run(base + extra, check=True)
    except subprocess.CalledProcessError:
        subprocess.run(base, check=True)
    length = MP3("public/" + name).info.length
    scene["audio"] = name
    scene["seconds"] = round(length + PAD, 2)
    print(name, scene["seconds"], "detik")

with open("data/timeline.json", "w", encoding="utf-8") as f:
    json.dump(story, f, ensure_ascii=False, indent=2)
print("Selesai: data/timeline.json")
