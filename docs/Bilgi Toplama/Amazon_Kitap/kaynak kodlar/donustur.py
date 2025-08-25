import json
import re

INPUT_FILE = "veri.txt"
OUTPUT_FILE = "veri.json"

def parse_line(line):
    # Satırdaki bilgileri düzenli ifadeyle yakalayıp parçala
    pattern = r"Yazar:\s*(.*?)\s*\|\s*Yayın Tarihi:\s*(.*?)\s*\|\s*Puan:\s*([\d.,]+)\s*\|\s*Fiyat:\s*(.*)"
    match = re.search(pattern, line)
    if match:
        yazar = match.group(1).strip()
        yayin_tarihi = match.group(2).strip()
        puan_str = match.group(3).replace(",", ".").strip()  # Virgülü noktaya çevir (float için)
        try:
            puan = float(puan_str)
        except ValueError:
            puan = None
        fiyat = match.group(4).strip()
        return {
            "Yazar": yazar,
            "Yayın Tarihi": yayin_tarihi,
            "Puan": puan,
            "Fiyat": fiyat
        }
    return None

def main():
    data = []
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        lines = f.readlines()
        for line in lines:
            line = line.strip()
            if line == "" or line[0].isdigit() == False:  # Satır boşsa veya numaralı değilse atla
                continue
            parsed = parse_line(line)
            if parsed:
                data.append(parsed)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"✅ {len(data)} kayıt '{OUTPUT_FILE}' dosyasına dönüştürüldü.")

if __name__ == "__main__":
    main()
