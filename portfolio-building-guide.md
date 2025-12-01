# 🛡️ 20 Adımda Kişisel Siber Güvenlik Portföyü Oluşturma Rehberi

Bu rehber, hacker temalı kişisel portföy websitesini sıfırdan nasıl oluşturacağınızı adım adım açıklamaktadır. GitHub Pages ile yayınlama süreci de dahil olmak üzere tüm adımları kapsamlı olarak ele almaktadır.

---

## 1️⃣ Proje Planlaması ve Konsept Belirleme

İlk adım olarak projenizin amacını ve hedef kitlesini belirleyin. Bu portföy sitesi siber güvenlik uzmanları için tasarlanmıştır. Hacker/terminal temalı bir tasarım seçin. Renk paleti olarak koyu yeşil (#00FF00), siyah ve neon mavi kullanın. Monospace fontlar (Fira Code, JetBrains Mono) tercih edin.

**Temel hedefler:**
- Profesyonel siber güvenlik uzmanlığı imajı
- Etkileşimli ve modern kullanıcı deneyimi
- Responsive tasarım (mobil, tablet, masaüstü)
- GitHub Pages ile ücretsiz hosting

---

## 2️⃣ Teknik Gereksinimlerin Belirlenmesi

Projeniz için gerekli teknolojileri belirleyin:
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Animasyonlar:** Canvas API (Matrix yağmur efekti için)
- **Hosting:** GitHub Pages (ücretsiz)
- **İletişim Formu:** Formspree (ücretsiz hizmet)
- **Iconlar:** Font Awesome
- **Fontlar:** Google Fonts (Fira Code, JetBrains Mono)

Bu teknolojiler statik site hosting hizmetleriyle uyumludur.

---

## 3️⃣ GitHub Repository Oluşturma

GitHub hesabınızda yeni bir repository oluşturun:
1. [github.com](https://github.com) adresine gidin
2. "New repository" butonuna tıklayın
3. Repository adı olarak `WEB` veya `username.github.io` girin
4. Public olarak ayarlayın
5. "Initialize this repository with a README" seçeneğini işaretleyin
6. "Create repository" butonuna tıklayın

---

## 4️⃣ Yerel Geliştirme Ortamı Kurulumu

Repository'nizi bilgisayarınıza klonlayın:
```bash
git clone https://github.com/username/WEB.git
cd WEB
```

Temel dosya yapısını oluşturun:
```
WEB/
├── index.html
├── css/
│   ├── style.css
│   └── animations.css
├── js/
│   ├── main.js
│   ├── matrix.js
│   └── typewriter.js
├── images/
└── README.md
```

---

## 5️⃣ HTML İskeletinin Oluşturulması

[index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/index.html) dosyasını oluşturun ve temel HTML5 yapısını ekleyin:
- Semantic HTML5 elementleri
- SEO için meta tag'ler
- Responsive viewport ayarı
- Favicon ve temel görseller
- CSS ve JavaScript dosyalarının bağlantıları

---

## 6️⃣ Temel CSS Stil Dosyasının Oluşturulması

[css/style.css](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/css/style.css) dosyasını oluşturun:
- `:root` değişkenleri ile renk paleti tanımlama
- Temel typography ayarları
- Reset CSS ile tarayıcı farklılıklarının giderilmesi
- Dark theme uygulaması
- Terminal pencere tasarımı
- Responsive layout (CSS Grid ve Flexbox)

---

## 7️⃣ Animasyon CSS Dosyasının Hazırlanması

[css/animations.css](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/css/animations.css) dosyasını oluşturun:
- Glitch efektleri
- Typewriter animasyonları
- Fade-in animasyonları
- Hover efektleri
- Matrix rain için fallback efektler

---

## 8️⃣ Matrix Yağmur Animasyonunun Geliştirilmesi

[js/matrix.js](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/js/matrix.js) dosyasını oluşturun:
- Canvas API kullanımı
- Karakter dizisi tanımlama (Latin, Katakana)
- Düşen karakter animasyon algoritması
- FPS optimizasyonu ve adaptive quality
- Scroll sırasında opacity değişimi

---

## 9️⃣ Typewriter Efekti Animasyonunun Uygulanması

[js/typewriter.js](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/js/typewriter.js) dosyasını oluşturun:
- Karakter bazlı yazma animasyonu
- Cursor blink animasyonu
- Configurable speed ayarları
- Callback sistem uygulaması
- Terminal komut simülasyonu

---

## 🔟 Ana Sayfa İçeriklerinin Eklenmesi

[index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/index.html) dosyasına şu bölümleri ekleyin:
- **Hero Section:** İsim, açıklama ve typewriter efekti
- **Hakkımda Section:** Profil bilgileri
- **Yetenekler Section:** Skill matrix ve progress bar'lar
- **Video Section:** YouTube video galerisi
- **İletişim Section:** Formspree entegreli iletişim formu
- **Footer:** Sistem durumu ve copyright

---

## 1️⃣1️⃣ Responsive Tasarımın Uygulanması

CSS media query'lerini kullanarak responsive tasarım uygulayın:
- Mobile-first yaklaşım
- Breakpoint tanımları (mobil, tablet, masaüstü)
- Hamburger menü sistemi
- Responsive typography ölçeklendirme
- Touch-friendly element tasarımı

---

## 1️⃣2️⃣ Video Galeri Sisteminin Geliştirilmesi

JavaScript ile dinamik video galeri sistemi oluşturun:
- YouTube iframe entegrasyonu
- Modal popup sistemi
- Responsive video player
- Thumbnail optimizasyonu
- Video veri yönetimi (js/main.js dosyasında)

---

## 1️⃣3️⃣ Blog Sisteminin Oluşturulması

Blog sistemi için şu dosyaları oluşturun:
- [blog/index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/blog/index.html): Blog ana sayfası
- [blog/post-template.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/blog/siber-guvenlik-temelleri.html): Blog yazısı şablonu
- Dinamik içerik yönetimi için JavaScript
- Terminal stili blog tasarımı
- Syntax highlighting entegrasyonu

---

## 1️⃣4️⃣ Dokümanlar ve CV Bölümünün Eklenmesi

Dökümanlar bölümü için şu özellikleri ekleyin:
- Terminal stili file system arayüzü
- PDF viewer modal (ESC tuşu desteği ile)
- Download buton entegrasyonu
- Responsive doküman önizleme
- CV ve sertifika dosyaları için klasör yapısı

---

## 1️⃣5️⃣ İletişim Formunun Entegrasyonu

Formspree servisini kullanarak iletişim formunu entegre edin:
1. [formspree.io](https://formspree.io) adresinden ücretsiz hesap oluşturun
2. Yeni form oluşturun ve form ID'nizi alın
3. [index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/index.html) dosyasındaki form action'ını güncelleyin:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. [thanks.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/thanks.html) dosyasını oluşturun (başarılı gönderim sonrası gösterilecek sayfa)

---

## 1️⃣6️⃣ SEO ve Performans Optimizasyonu

Web sitesi için SEO ve performans optimizasyonu yapın:
- Semantic HTML kullanımı
- Meta tag optimizasyonu
- Open Graph entegrasyonu
- Lazy loading uygulaması
- Image compression
- Critical CSS optimizasyonu
- Accessibility uyumluluğu (ARIA label kullanımı)

---

## 1️⃣7️⃣ Easter Egg ve Gelişmiş Özelliklerin Eklenmesi

Kullanıcı etkileşimini artırmak için ekstra özellikler ekleyin:
- Konami code implementasyonu (↑↑↓↓←→←→BA)
- Keyboard shortcut sistemi (Alt+H, Alt+A, Alt+C)
- Back-to-top butonu
- Loading screen animasyonu
- Terminal feedback mesajları

---

## 1️⃣8️⃣ Test ve Hata Ayıklama

Web sitesini farklı cihazlarda ve tarayıcılarda test edin:
- Cross-browser testleri (Chrome, Firefox, Safari, Edge)
- Responsive testleri (mobil, tablet, masaüstü)
- Form submission testleri
- Modal sistem testleri
- Performance testleri (Core Web Vitals)
- Accessibility audit

---

## 1️⃣9️⃣ GitHub'a Yükleme ve Versiyon Kontrolü

Projeyi GitHub'a yükleyin:
```bash
git add .
git commit -m "Initial commit: Hacker-style portfolio website"
git push origin main
```

Versiyon kontrolü için iyi pratikler:
- Feature branch kullanımı
- Anlamlı commit mesajları
- README.md dosyasının güncellenmesi
- Kullanım ve deployment kılavuzlarının hazırlanması

---

## 2️⃣0️⃣ GitHub Pages ile Yayınlama

Web sitesini GitHub Pages ile yayınlayın:
1. Repository Settings → Pages sekmesine gidin
2. Source: "Deploy from a branch" seçin
3. Branch: `main` seçin
4. Folder: `/ (root)` seçin
5. Save butonuna basın
6. Site birkaç dakika içinde `username.github.io/WEB` adresinde yayında olacaktır

**Opsiyonel Custom Domain:**
1. Repository root'una `CNAME` dosyası oluşturun:
   ```
   yourdomain.com
   ```
2. DNS ayarlarında CNAME record ekleyin:
   ```
   Type: CNAME
   Name: @
   Value: username.github.io
   ```

---

## 🎉 Tebrikler! Portföyünüz Hazır

Bu 20 adımlık süreçte hacker temalı kişisel portföy websitesi oluşturma sürecini tamamladınız. Web siteniz artık şu özelliklere sahip:

✅ Modern ve etkileyici hacker-style tema  
✅ Matrix rain arka plan animasyonu  
✅ Typewriter metin animasyonları  
✅ Responsive tasarım (mobil, tablet, masaüstü)  
✅ Video galeri sistemi  
✅ Blog sistemi  
✅ Çalışır iletişim formu  
✅ CV ve doküman görüntüleme  
✅ SEO ve performans optimizasyonu  
✅ GitHub Pages ile ücretsiz hosting  

Bu portföy, siber güvenlik uzmanlığı imajınızı yansıtmak ve potansiyel işverenler ile bağlantı kurmak için mükemmel bir araçtır.

---

## 📚 Ek Kaynaklar

- [Product Requirements Document (PRD)](prd.md) - Detaylı proje gereksinimleri
- [Kullanım Rehberi](kullanim-rehberi.md) - Site yönetimi ve içerik güncelleme
- [Blog ve Video Rehberi](BLOG-VIDEO-GUIDE.md) - İçerik oluşturma ve yönetimi
- [Deployment Rehberi](DEPLOYMENT-GUIDE.md) - Yayınlama ve konfigürasyon
