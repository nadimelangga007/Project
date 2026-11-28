import json, os, sys, time, urllib.request, urllib.error

ide = os.environ.get("IDE", "").strip()
if not ide:
    print("Ide kosong, pakai data/story.json yang sudah ada")
    sys.exit(0)

key = os.environ["GEMINI_API_KEY"]
PLACES = ["kota", "jalan", "rumah", "taman", "kamar", "kelas", "kafe", "desa", "pantai", "hutan", "gunung"]
TIMES = ["pagi", "siang", "senja", "malam"]
CUACA = ["cerah", "mendung", "hujan", "salju", "kabut"]
MOODS = ["normal", "ceria", "sedih", "tegang", "seram"]
PROPS = ["tidak", "gelas", "pedang", "payung", "tas", "buku", "bunga"]
EKSPR = ["netral", "senang", "sedih", "kaget", "marah"]
BAJU = ["biru", "merah", "hijau", "kuning", "ungu", "pink", "oranye", "hitam", "putih", "abu"]
CELANA = ["biru", "hitam", "cokelat", "abu", "hijau"]
RAMBUT = ["hitam", "cokelat", "pirang", "merah", "ungu", "abu", "biru"]
GAYA = ["pendek", "panjang", "kuncir", "botak"]
AKS = ["tidak", "topi", "kacamata", "keduanya"]
VOICE = {"cowok": "id-ID-ArdiNeural", "cewek": "id-ID-GadisNeural"}
candidates = [
    os.environ.get("GEMINI_MODEL", "").strip(),
    "gemini-3.8-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.7-flash",
    "gemini-3.1-flash-lite",
]
models = [m for m in candidates if m]

prompt = (
    "Kamu penulis naskah video pendek vertikal berbahasa Indonesia. "
    "Dari ide di bawah, buat 4 sampai 6 scene. "
    "Tiap scene satu kalimat pendek (maksimal 12 kata) yang enak dibacakan. "
    "Buat daftar karakter di kolom karakter (2 sampai 3 orang, nama pendek sesuai cerita). "
    "Tiap karakter punya: nama, gender (cowok atau cewek), baju (biru, merah, hijau, kuning, ungu, pink, oranye, hitam, putih, abu), "
    "celana (biru, hitam, cokelat, abu, hijau), rambut (hitam, cokelat, pirang, merah, ungu, abu, biru), "
    "gaya_rambut (pendek, panjang, kuncir, botak), aksesori (tidak, topi, kacamata, keduanya). "
    "Pilih penampilan yang cocok dengan ceritanya. "
    "Kolom pembicara di tiap scene adalah nomor urut karakter yang bicara, mulai dari 0. "
    "Kolom ekspresi adalah ekspresi karakter yang bicara, dan reaksi adalah ekspresi karakter lain; "
    "pilih satu: netral, senang, sedih, kaget, marah. "
    "Kolom place pilih satu: kota (di luar, pinggir jalan kota), jalan (jalan raya), desa (pedesaan dan sawah), pantai, hutan, gunung (pegunungan), "
    "taman (taman luar ruangan), rumah (ruang tamu atau dalam rumah), kamar (kamar tidur), kelas (ruang kelas sekolah), kafe (kafe atau warung). "
    "Kolom time pilih satu: pagi, siang, senja, malam. "
    "Isi place dan time sesuai tempat dan waktu kejadian tiap scene. "
    "Kolom action pilih satu: bicara (berdiri ngobrol) atau jalan (jalan bersama). "
    "Kolom prop pilih satu: tidak, gelas, pedang, payung, tas, buku, bunga "
    "(benda yang dibawa karakter sesuai cerita; kalau benda itu dibawa terus, isi sama di semua scene yang relevan). "
    "Kolom pembawa adalah nomor urut karakter yang membawa benda itu (mulai dari 0). "
    "Kolom cuaca pilih satu: cerah, mendung, hujan, salju, kabut. "
    "Kolom mood pilih satu: normal, ceria, sedih, tegang, seram (suasana hati adegan). "
    'Balas HANYA JSON valid dengan bentuk: {"title": "...", "gaya": "pixel", "karakter": [{"nama": "...", "gender": "...", "baju": "...", "celana": "...", "rambut": "...", "gaya_rambut": "...", "aksesori": "..."}], '
    '"scenes": [{"text": "...", "pembicara": 0, "ekspresi": "...", "reaksi": "...", "place": "...", "time": "...", "action": "...", "prop": "...", "pembawa": 0, "cuaca": "...", "mood": "..."}]}. '
    "Kolom gaya (satu untuk seluruh video) pilih satu: pixel, stick (stick figure di kertas putih), papan (papan tulis kapur), komik (komik dengan balon dialog). Isi pixel kecuali ide menyebut gaya lain dengan jelas. "
    "Ide: " + ide
)

body = json.dumps({
    "contents": [{"parts": [{"text": prompt}]}],
    "generationConfig": {"responseMimeType": "application/json"},
}).encode("utf-8")

result = None
for model in models:
    url = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent"
    for attempt in range(3):
        req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json", "x-goog-api-key": key})
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                data = json.load(r)
            text = data["candidates"][0]["content"]["parts"][0]["text"].strip()
            if text.startswith("```"):
                text = text.split("\n", 1)[1].rsplit("```", 1)[0]
            result = json.loads(text)
            break
        except urllib.error.HTTPError as e:
            print("Gagal", model, "percobaan", attempt + 1, e.code, e.read().decode("utf-8")[:150])
            if e.code != 503:
                break
            time.sleep(10 * (attempt + 1))
        except Exception as e:
            print("Gagal", model, repr(e))
            break
    if result:
        print("Model dipakai:", model)
        break

if not result or not result.get("scenes"):
    print("Gemini tidak menghasilkan naskah")
    sys.exit(1)


def pick(v, allowed, default):
    return v if v in allowed else default


def as_idx(v, n):
    try:
        i = int(v)
    except Exception:
        i = 0
    return min(max(i, 0), n - 1)


kar = result.get("karakter")
if not isinstance(kar, list) or not kar:
    kar = [{"nama": "Ardi", "gender": "cowok"}, {"nama": "Gadis", "gender": "cewek"}]
kar = kar[:3]
if len(kar) < 2:
    kar.append({"nama": "Gadis", "gender": "cewek"})

cleaned = []
count = {"cowok": 0, "cewek": 0}
for i, k in enumerate(kar):
    if not isinstance(k, dict):
        k = {}
    g = pick(k.get("gender"), ["cowok", "cewek"], "cowok" if i % 2 == 0 else "cewek")
    pitch = "+0Hz"
    if count[g] == 1:
        pitch = "-22Hz" if g == "cowok" else "+20Hz"
    elif count[g] >= 2:
        pitch = "+22Hz" if g == "cowok" else "-18Hz"
    count[g] += 1
    cleaned.append({
        "nama": str(k.get("nama") or ("Karakter" + str(i + 1)))[:12],
        "gender": g,
        "baju": pick(k.get("baju"), BAJU, "biru"),
        "celana": pick(k.get("celana"), CELANA, "biru"),
        "rambut": pick(k.get("rambut"), RAMBUT, "hitam"),
        "gaya_rambut": pick(k.get("gaya_rambut"), GAYA, "panjang" if g == "cewek" else "pendek"),
        "aksesori": pick(k.get("aksesori"), AKS, "tidak"),
        "voice": VOICE[g],
        "pitch": pitch,
    })

n = len(cleaned)
for s in result["scenes"]:
    b = as_idx(s.get("pembicara"), n)
    s["pembicara"] = b
    s["voice"] = cleaned[b]["voice"]
    s["pitch"] = cleaned[b]["pitch"]
    s["ekspresi"] = pick(s.get("ekspresi"), EKSPR, "netral")
    s["reaksi"] = pick(s.get("reaksi"), EKSPR, "netral")
    s["place"] = pick(s.get("place"), PLACES, "kota")
    s["time"] = pick(s.get("time"), TIMES, "siang")
    s["action"] = pick(s.get("action"), ["bicara", "jalan"], "bicara")
    s["prop"] = pick(s.get("prop"), PROPS, "tidak")
    s["pembawa"] = as_idx(s.get("pembawa"), n)
    s["cuaca"] = pick(s.get("cuaca"), CUACA, "cerah")
    s["mood"] = pick(s.get("mood"), MOODS, "normal")
    s["text"] = str(s.get("text") or "...")

result["karakter"] = cleaned
result["gaya"] = pick(result.get("gaya"), ["pixel", "stick", "papan", "komik"], "pixel")
result["fps"] = 30
result.setdefault("title", "Video")

with open("data/story.json", "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print("Karakter:", ", ".join(c["nama"] + " (" + c["gender"] + ")" for c in cleaned))
print("Naskah:", len(result["scenes"]), "scene")
for s in result["scenes"]:
    print("-", cleaned[s["pembicara"]]["nama"], s["place"], s["time"], s["cuaca"], s["mood"], s["ekspresi"], ":", s["text"])
