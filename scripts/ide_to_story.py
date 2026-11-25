import json, os, sys, urllib.request, urllib.error

ide = os.environ.get("IDE", "").strip()
if not ide:
    print("Ide kosong, pakai data/story.json yang sudah ada")
    sys.exit(0)

key = os.environ["GEMINI_API_KEY"]
VOICES = ["id-ID-ArdiNeural", "id-ID-GadisNeural"]
candidates = [os.environ.get("GEMINI_MODEL", "").strip(), "gemini-3.8-flash", "gemini-3.5-flash-lite"]
models = [m for m in candidates if m]

prompt = (
    "Kamu penulis naskah video pendek vertikal berbahasa Indonesia. "
    "Dari ide di bawah, buat 4 sampai 6 scene. "
    "Tiap scene satu kalimat pendek (maksimal 12 kata) yang enak dibacakan. "
    "Kolom voice diisi id-ID-ArdiNeural (cowok) atau id-ID-GadisNeural (cewek), "
    "boleh bergantian seperti dialog. "
    'Balas HANYA JSON valid dengan bentuk: {"title": "...", "fps": 30, "scenes": [{"text": "...", "voice": "..."}]}. '
    "Tiap scene juga wajib punya kolom place (pilih satu: kota, rumah, taman) dan time (pilih satu: pagi, siang, senja, malam) sesuai tempat dan waktu kejadian scene itu. Ide: " + ide
)

body = json.dumps({
    "contents": [{"parts": [{"text": prompt}]}],
    "generationConfig": {"responseMimeType": "application/json"},
}).encode("utf-8")

result = None
for model in models:
    url = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent"
    req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json", "x-goog-api-key": key})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            data = json.load(r)
        text = data["candidates"][0]["content"]["parts"][0]["text"].strip()
        if text.startswith("```"):
            text = text.split("\n", 1)[1].rsplit("```", 1)[0]
        result = json.loads(text)
        print("Model dipakai:", model)
        break
    except urllib.error.HTTPError as e:
        print("Gagal", model, e.code, e.read().decode("utf-8")[:200])
    except Exception as e:
        print("Gagal", model, repr(e))

if not result or not result.get("scenes"):
    print("Gemini tidak menghasilkan naskah")
    sys.exit(1)

for i, s in enumerate(result["scenes"]):
    if s.get("voice") not in VOICES:
        s["voice"] = VOICES[i % 2]
result["fps"] = 30
result.setdefault("title", "Video")

with open("data/story.json", "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print("Naskah:", len(result["scenes"]), "scene")
for s in result["scenes"]:
    print("-", s["voice"].replace("id-ID-", "").replace("Neural", ""), ":", s["text"])
