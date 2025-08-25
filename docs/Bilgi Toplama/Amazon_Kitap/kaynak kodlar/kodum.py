from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from time import sleep
import random

BASE_URL = "https://www.amazon.com.tr/s?i=stripbooks&rh=n%3A12466496011&s=review-rank&page={page}&qid=1748017039&xpid=8wJiG5JLpILI9&ref=sr_pg_{page}"

PRODUCT_LIMIT = 100
OUTPUT_FILE = "veri.txt"

chrome_options = Options()
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")

service = Service(r"chromedriver.exe")
driver = webdriver.Chrome(service=service, options=chrome_options)

product_list = []
pages_visited = set()

def wait_for_products():
    try:
        WebDriverWait(driver, 15).until(
            EC.presence_of_all_elements_located(
                (By.CSS_SELECTOR, "div.s-main-slot div.s-result-item[data-component-type='s-search-result']")
            )
        )
        return True
    except TimeoutException:
        print("Ürünler yüklenemedi veya CAPTCHA engeli.")
        return False

def extract_price(product):
    try:
        price_whole = product.find_element(By.CSS_SELECTOR, "span.a-price-whole").text.replace(".", "").replace(",", ".").strip()
        price_fraction = product.find_element(By.CSS_SELECTOR, "span.a-price-fraction").text.strip()
        price = f"{price_whole},{price_fraction} TL"
        return price
    except:
        return "Fiyat yok"

while len(product_list) < PRODUCT_LIMIT:
    page = random.randint(1, 70)
    if page in pages_visited:
        continue
    pages_visited.add(page)
    print(f"Sayfa {page} açılıyor...")

    url = BASE_URL.format(page=page)
    driver.get(url)
    sleep(3)

    if not wait_for_products():
        break

    products = driver.find_elements(By.CSS_SELECTOR, "div.s-main-slot div.s-result-item[data-component-type='s-search-result']")

    for product in products:
        if len(product_list) >= PRODUCT_LIMIT:
            break

        try:
            rating_str = product.find_element(By.CSS_SELECTOR, "span.a-icon-alt").get_attribute("innerHTML")
            rating = float(rating_str.split()[0].replace(",", "."))
            if rating < 4.0:
                continue
        except:
            continue

        try:
            author = product.find_element(By.CSS_SELECTOR, ".a-row.a-size-base.a-color-secondary .a-link-normal").text.strip()
        except:
            try:
                author = product.find_element(By.CSS_SELECTOR, ".a-row.a-size-base.a-color-secondary").text.strip()
            except:
                author = "Yazar yok"

        # Standart olmayan yazar bilgisi varsa atla
        if any(x in author for x in ["yeni ürün", "İngilizce Baskı", "Kolektif"]):
            continue

        try:
            date = product.find_element(By.CSS_SELECTOR, ".a-row.a-size-base.a-color-secondary .a-text-normal").text.strip()
        except:
            date = "Tarih yok"

        price = extract_price(product)

        entry = f"Yazar: {author} | Yayın Tarihi: {date} | Puan: {rating} | Fiyat: {price}"

        if entry not in product_list:
            product_list.append(entry)

print(f"Toplam {len(product_list)} kitap bulundu. Dosyaya yazılıyor...")

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    for i, entry in enumerate(product_list, 1):
        f.write(f"{i}. {entry}\n\n")

print(f"✅ Veriler '{OUTPUT_FILE}' dosyasına kaydedildi.")

driver.quit()
