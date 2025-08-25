from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from time import sleep
import random

# Ayarlar
URL = "https://eksisozluk.com/anneler-gunu--72708"
ENTRY_LIMIT = 110
OUTPUT_FILE = "anneler_gunu_entryler.txt"

# ChromeDriver ayarları
chrome_options = Options()
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")
# chrome_options.add_argument("--headless")  # İstersen görünmeden çalışsın

# ✅ Tam yol: dikkat et!
service = Service(r"C:\Users\samet\Downloads\chromedriver-win64\chromedriver-win64\chromedriver.exe")

driver = webdriver.Chrome(service=service, options=chrome_options)
driver.get(URL)
sleep(3)

entry_list = []
page = 1

while len(entry_list) < ENTRY_LIMIT:
    sleep(2)
    entries = driver.find_elements(By.CSS_SELECTOR, ".content")
    for entry in entries:
        text = entry.text.strip()
        if text and text not in entry_list:
            entry_list.append(text)
            if len(entry_list) >= ENTRY_LIMIT:
                break

    page += 1
    driver.get(f"{URL}?p={page}")

# Entry'leri rastgele sırala
random.shuffle(entry_list)

# Dosyaya yaz
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    for i, entry in enumerate(entry_list[:ENTRY_LIMIT], 1):
        f.write(f"{i}. {entry}\n\n")

print(f"{ENTRY_LIMIT} entry başarıyla '{OUTPUT_FILE}' dosyasına kaydedildi.")
driver.quit()
