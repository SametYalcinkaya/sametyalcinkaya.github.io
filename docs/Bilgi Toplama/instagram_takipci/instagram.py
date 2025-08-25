from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import config  # Kullanıcı adı ve şifreyi buradan alacağız
import re

# Tarayıcıyı başlat
options = webdriver.ChromeOptions()
options.add_argument("--start-maximized")
driver = webdriver.Chrome(options=options)
wait = WebDriverWait(driver, 15)

# Instagram'a git
driver.get("https://www.instagram.com/")

# Giriş yap
username_input = wait.until(EC.presence_of_element_located((By.NAME, "username")))
password_input = wait.until(EC.presence_of_element_located((By.NAME, "password")))
username_input.send_keys(config.username)
password_input.send_keys(config.password)

login_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']")))
login_button.click()

# Giriş sonrası bekleme
time.sleep(5)

# Takipçi listesini çekeceğimiz kullanıcı adı
target_username = "sametyalcinkaya23"

# Kullanıcının profil sayfasına git
driver.get(f"https://www.instagram.com/{target_username}/")
time.sleep(5)

# "Takipçiler" butonuna tıkla
followers_button = wait.until(
    EC.element_to_be_clickable((By.XPATH, f'//a[contains(@href,"/{target_username}/followers")]'))
)
followers_button.click()
time.sleep(3)
# Pop-up pencereyi bul
try:
    followers_popup = wait.until(
        EC.presence_of_element_located((
            By.XPATH,
            "//div[@role='dialog']//div[contains(@class, 'xyi19xy') and contains(@class, 'x1ccrb07')]"
        ))
    )
except:
    print("Takipçi popup'ı yüklenemedi.")
    driver.save_screenshot("popup_error.png")
    driver.quit()
    exit()


# Listeyi kaydırarak tüm takipçileri çek
scroll_box = followers_popup
last_height = 0
follower_usernames = set()

while True:
    driver.execute_script("arguments[0].scrollTop = arguments[0].scrollHeight", scroll_box)
    time.sleep(2)

    new_height = driver.execute_script("return arguments[0].scrollTop", scroll_box)
    if new_height == last_height:
        break
    last_height = new_height

    links = scroll_box.find_elements(By.TAG_NAME, 'a')
    for link in links:
        href = link.get_attribute('href')
        if href:
            match = re.search(r"instagram\.com/([^/]+)/", href)
            if match:
                username = match.group(1)
                follower_usernames.add(username)

with open("takipciler.txt", "w", encoding="utf-8") as file:
    file.write(f"Toplam {len(follower_usernames)} takipçi bulundu.\n\n")
    for i, user in enumerate(follower_usernames, 1):
        file.write(f"{i}: {user}\n")

print("Takipçi listesi 'takipciler.txt' dosyasına kaydedildi.")

