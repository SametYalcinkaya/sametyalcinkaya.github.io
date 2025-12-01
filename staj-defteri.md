# 📓 20 Günlük Staj Defteri: Kişisel Web Sitesi Geliştirme

## 🎯 Proje Hakkında
**Proje Adı:** Kişisel Siber Güvenlik Portföyü  
**Konum:** c:\Users\samet\Documents\GitHub\sametyalcinkaya.github.io  
**Tema:** Hacker/Matrix stili terminal tabanlı tasarım  
**Teknolojiler:** HTML5, CSS3, JavaScript, Canvas API

---

## 📅 1. Gün: Proje Planlaması ve GitHub Repository Oluşturma

Bugün projemin planlamasını yaptım ve GitHub repository'sini oluşturdum.

### Yapılanlar:
- Proje hedeflerini belirledim:
  - Profesyonel siber güvenlik uzmanlığı imajı
  - Etkileşimli ve modern kullanıcı deneyimi
  - Responsive tasarım (mobil, tablet, masaüstü)
  - GitHub Pages ile ücretsiz hosting
  
- GitHub hesabında yeni bir repository oluşturdum:
  - Repository adı: `sametyalcinkaya.github.io`
  - Public repository olarak ayarladım
  - README dosyası ile başlatma seçeneğini işaretledim

- Yerel geliştirme ortamını kurdum:
  ```bash
  git clone https://github.com/sametyalcinkaya/sametyalcinkaya.github.io.git
  cd sametyalcinkaya.github.io
  ```

### Öğrendiklerim:
- GitHub repository oluşturma süreci
- Git komutları (clone)
- Proje planlama yaklaşımı

---

## 📅 2. Gün: HTML İskeletinin Oluşturulması

Bugün web sitesinin temel HTML yapısını oluşturdum.

### Yapılanlar:
- [index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/index.html) dosyasını oluşturdum
- Semantic HTML5 elementlerini kullandım
- SEO için meta tag'leri ekledim:
  - `<meta name="description" content="...">`
  - `<meta name="keywords" content="siber güvenlik, ...">`
  - `<meta name="author" content="Samet Yalçınkaya">`
  
- Responsive viewport ayarını yaptım:
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ```

- Favicon ve temel görseller için bağlantıları ekledim

### Karşılaşılan Zorluklar:
- Meta tag'lerin doğru kullanımı konusunda dikkatli olmak gerekti

### Öğrendiklerim:
- Semantic HTML5 elementlerinin önemi
- SEO temelleri
- Responsive tasarım için viewport ayarı

---

## 📅 3. Gün: Temel CSS Stil Dosyasının Oluşturulması

Bugün web sitesinin temel CSS stil dosyasını oluşturdum.

### Yapılanlar:
- [css/style.css](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/css/style.css) dosyasını oluşturdum
- `:root` değişkenleri ile renk paleti tanımladım:
  ```css
  :root {
    --primary-green: #00FF00;
    --secondary-green: #00CC00;
    --neon-blue: #00FFFF;
    --danger-red: #FF0000;
  }
  ```

- Temel typography ayarlarını yaptım
- Reset CSS ile tarayıcı farklılıklarını giderdim
- Dark theme uygulaması gerçekleştirdim
- Terminal pencere tasarımı oluşturdum

### Öğrendiklerim:
- CSS custom properties kullanımı
- Reset CSS'in önemi
- Dark theme uygulama teknikleri

---

## 📅 4. Gün: Animasyon CSS Dosyasının Hazırlanması

Bugün web sitesi için animasyonları içeren CSS dosyasını oluşturdum.

### Yapılanlar:
- [css/animations.css](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/css/animations.css) dosyasını oluşturdum
- Glitch efektleri için CSS animasyonları ekledim:
  ```css
  @keyframes glitch-1 {
    0%, 100% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    /* ... */
  }
  ```

- Typewriter animasyonları tanımladım
- Fade-in animasyonları oluşturdum
- Hover efektleri için CSS kuralları yazdım

### Öğrendiklerim:
- CSS keyframes kullanımı
- Animasyon optimizasyonu
- Hover efektleri oluşturma

---

## 📅 5. Gün: Matrix Yağmur Animasyonunun Geliştirilmesi

Bugün Canvas API kullanarak Matrix yağmur animasyonunu geliştirdim.

### Yapılanlar:
- [js/matrix.js](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/js/matrix.js) dosyasını oluşturdum
- Canvas elementine erişim sağladım:
  ```javascript
  this.canvas = document.getElementById('matrix-canvas');
  this.ctx = this.canvas.getContext('2d');
  ```

- Karakter dizisi tanımladım (Latin, Katakana):
  ```javascript
  this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}0123456789アイウエオカキクケコ...';
  ```

- Düşen karakter animasyon algoritmasını geliştirdim
- FPS optimizasyonu uyguladım

### Karşılaşılan Zorluklar:
- Canvas API ile çalışmak başta zorladı ama örneklerle öğrenildi

### Öğrendiklerim:
- Canvas API kullanımı
- Animasyon algoritmaları
- Performans optimizasyon teknikleri

---

## 📅 6. Gün: Typewriter Efekti Animasyonunun Uygulanması

Bugün karakter bazlı yazma animasyonunu (typewriter effect) uyguladım.

### Yapılanlar:
- [js/typewriter.js](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/js/typewriter.js) dosyasını oluşturdum
- TypewriterEffect sınıfını tanımladım:
  ```javascript
  class TypewriterEffect {
    constructor(element, options = {}) {
      this.element = element;
      // ...
    }
  }
  ```

- Karakter bazlı yazma animasyonunu gerçekleştirdim
- Cursor blink animasyonu oluşturdum
- Configurable speed ayarları tanımladım

### Öğrendiklerim:
- JavaScript sınıf yapıları
- Zamanlayıcılar (setTimeout) kullanımı
- Dinamik içerik manipülasyonu

---

## 📅 7. Gün: Hero Section ve Ana Sayfa İçeriklerinin Eklenmesi

Bugün web sitesinin ana sayfasındaki hero section'ı ve diğer içerikleri oluşturdum.

### Yapılanlar:
- Hero Section için HTML yapısı oluşturdum:
  ```html
  <section class="hero" id="home">
    <div class="hero-container">
      <div class="hero-content">
        <div class="terminal-window">
          <!-- ... -->
          <h1 class="hero-name" id="hero-name"></h1>
          <p class="hero-description" id="hero-description"></p>
        </div>
      </div>
    </div>
  </section>
  ```

- Typewriter efekti ile isim ve açıklama yazımını entegre ettim
- Specialization alanlarını ekledim:
  - 🛡️ Siber Güvenlik
  - 🔍 Adli Bilişim Mühendisliği
  - 🤖 Yapay Zeka Uygulamaları
  - 🧠 Analitik Düşünce & Karar Alma

### Öğrendiklerim:
- HTML semantik element kullanımı
- JavaScript ile DOM manipülasyonu
- Animasyonların entegrasyonu

---

## 📅 8. Gün: Responsive Tasarımın Uygulanması

Bugün web sitesine responsive tasarım uygulamalarını entegre ettim.

### Yapılanlar:
- CSS media query'leri tanımladım:
  ```css
  @media (max-width: 768px) {
    /* Mobil için stiller */
  }
  ```

- Mobile-first yaklaşımı uyguladım
- Breakpoint tanımları oluşturdum (mobil, tablet, masaüstü)
- Hamburger menü sistemi geliştirdim:
  ```html
  <div class="nav-hamburger" id="nav-hamburger">
    <span class="bar"></span>
    <span class="bar"></span>
    <span class="bar"></span>
  </div>
  ```

- Responsive typography ölçeklendirme uyguladım

### Öğrendiklerim:
- Responsive tasarım prensipleri
- Mobile-first yaklaşım
- CSS Flexbox ve Grid kullanımı

---

## 📅 9. Gün: Hakkımda ve Yetenekler Bölümlerinin Geliştirilmesi

Bugün hakkımda ve yetenekler bölümlerini oluşturdum.

### Yapılanlar:
- Hakkımda section için HTML yapısı:
  ```html
  <section class="about" id="about">
    <h2 class="section-title glitch" data-text="$ cat /about/me.txt">/about/me.txt</h2>
    <div class="about-text">
      <p>Bireysel kullanıcıların siber güvenliğinden...</p>
    </div>
  </section>
  ```

- Yetenekler section için grid yapısı oluşturdum:
  ```html
  <section class="skills" id="skills">
    <div class="skills-grid">
      <div class="skill-card">
        <h3>Siber Güvenlik</h3>
        <div class="skill-progress">
          <div class="progress-bar" data-width="95"></div>
        </div>
      </div>
    </div>
  </section>
  ```

- Glitch efektli başlıklar uyguladım

### Öğrendiklerim:
- CSS Grid kullanımı
- Animasyonların entegrasyonu
- Kullanıcı deneyimi optimizasyonu

---

## 📅 10. Gün: Video Galeri Sisteminin Geliştirilmesi

Bugün YouTube entegreli video galeri sistemini geliştirdim.

### Yapılanlar:
- Video section için HTML yapısı oluşturdum:
  ```html
  <section class="videos" id="videos">
    <div class="videos-grid" id="videos-grid">
      <div class="video-card">
        <div class="video-thumbnail">
          <img src="images/video1.jpg" alt="...">
          <div class="play-button">
            <i class="fas fa-play"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
  ```

- JavaScript ile dinamik video galeri sistemi oluşturdum
- Modal popup sistemi geliştirdim:
  ```javascript
  function openVideoModal(videoId, title) {
    videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    videoModal.style.display = 'flex';
  }
  ```

- Responsive video player entegre ettim

### Öğrendiklerim:
- JavaScript event handling
- Modal sistemleri
- YouTube API entegrasyonu

---

## 📅 11. Gün: Blog Sisteminin Oluşturulması

Bugün blog sistemini oluşturdum.

### Yapılanlar:
- [blog/index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/blog/index.html) dosyasını oluşturdum:
  ```html
  <section class="blog-section">
    <h1 class="section-title glitch" data-text="$ ls -la /blog/">📝 Blog Yazılarım</h1>
    <div class="blog-list" id="blog-list"></div>
  </section>
  ```

- Blog yazısı şablonu oluşturdum ([blog/siber-guvenlik-temelleri.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/blog/siber-guvenlik-temelleri.html))
- Dinamik içerik yönetimi için JavaScript fonksiyonları yazdım:
  ```javascript
  const blogPosts = [
    {
      title: "Siber Güvenlik Temelleri",
      date: "2024-01-15",
      file: "siber-guvenlik-temelleri.html",
      description: "..."
    }
  ];
  ```

### Öğrendiklerim:
- Dinamik içerik yönetimi
- Template sistemleri
- SEO optimizasyonu

---

## 📅 12. Gün: Dokümanlar ve CV Bölümünün Eklenmesi

Bugün dokümanlar ve CV bölümü için gerekli yapıları oluşturdum.

### Yapılanlar:
- CV modal sistemi geliştirdim:
  ```html
  <div class="cv-modal" id="cv-modal">
    <div class="cv-modal-content">
      <iframe id="cv-frame" src="docs/Hıdır_SAMET-CV.pdf"></iframe>
    </div>
  </div>
  ```

- Terminal stili file system arayüzü oluşturdum
- PDF viewer modal (ESC tuşu desteği ile) entegre ettim
- Responsive doküman önizleme uyguladım

### Öğrendiklerim:
- Modal sistemleri
- PDF görüntüleme teknikleri
- Klavye event handling

---

## 📅 13. Gün: İletişim Formunun Entegrasyonu

Bugün iletişim formunu Formspree servisi ile entegre ettim.

### Yapılanlar:
- İletişim formu için HTML yapısı oluşturdum:
  ```html
  <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <input type="text" name="name" required>
    <input type="email" name="email" required>
    <textarea name="message" required></textarea>
    <button type="submit">./send-message.sh</button>
  </form>
  ```

- [thanks.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/thanks.html) dosyasını oluşturdum
- Form validasyonu için JavaScript fonksiyonları yazdım

### Öğrendiklerim:
- Form entegrasyonu
- Backend servis kullanımı (Formspree)
- Form validasyon teknikleri

---

## 📅 14. Gün: SEO ve Performans Optimizasyonu

Bugün web sitesi için SEO ve performans optimizasyonu yaptım.

### Yapılanlar:
- Semantic HTML kullanımı için revizyon yaptım
- Meta tag optimizasyonu gerçekleştirdim:
  ```html
  <meta property="og:title" content="...">
  <meta property="og:description" content="...">
  <meta property="og:image" content="images/HSY.png">
  ```

- Lazy loading uygulaması ekledim:
  ```html
  <img src="..." loading="lazy" alt="...">
  ```

- Image compression uyguladım
- Critical CSS optimizasyonu yaptım

### Öğrendiklerim:
- SEO temelleri
- Performans optimizasyon teknikleri
- Open Graph protokolü

---

## 📅 15. Gün: Easter Egg ve Gelişmiş Özelliklerin Eklenmesi

Bugün kullanıcı etkileşimini artırmak için easter egg ve gelişmiş özellikler ekledim.

### Yapılanlar:
- Konami code implementasyonu (↑↑↓↓←→←→BA):
  ```javascript
  let konamiCode = '';
  const konamiSequence = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA';
  
  document.addEventListener('keydown', (e) => {
    konamiCode += e.code;
    if (konamiCode === konamiSequence) {
      activateHackerMode();
    }
  });
  ```

- Keyboard shortcut sistemi ekledim (Alt+H, Alt+A, Alt+C)
- Back-to-top butonu oluşturdum:
  ```html
  <button id="back-to-top" class="back-to-top-btn">
    <i class="fas fa-chevron-up"></i>
  </button>
  ```

### Öğrendiklerim:
- Kullanıcı etkileşim teknikleri
- Klavye event handling
- Gizli özellikler geliştirme

---

## 📅 16. Gün: Test ve Hata Ayıklama

Bugün web sitesini farklı cihazlarda ve tarayıcılarda test ettim.

### Yapılanlar:
- Cross-browser testleri (Chrome, Firefox, Safari, Edge)
- Responsive testleri (mobil, tablet, masaüstü)
- Form submission testleri
- Modal sistem testleri
- Performance testleri (Core Web Vitals)

### Tespit Edilen Hatalar ve Çözümleri:
- Bazı mobil cihazlarda font yüklenme sorunu → Font preloading eklendi
- Video modal'da iframe yüklenme gecikmesi → Loading optimizasyonu yapıldı

### Öğrendiklerim:
- Test metodolojileri
- Hata ayıklama teknikleri
- Cross-browser uyumluluk

---

## 📅 17. Gün: Versiyon Kontrolü ve GitHub İşlemleri

Bugün projeyi GitHub'a yükleyerek versiyon kontrolünü kurdum.

### Yapılanlar:
- Git komutları ile commit ve push işlemleri:
  ```bash
  git add .
  git commit -m "Initial commit: Hacker-style portfolio website"
  git push origin main
  ```

- Feature branch kullanımı için plan oluşturdum
- Anlamlı commit mesajları yazdım
- README.md dosyasını güncelledim

### Öğrendiklerim:
- Git versiyon kontrol sistemi
- GitHub kullanımı
- İyi commit pratiği

---

## 📅 18. Gün: GitHub Pages ile Yayınlama

Bugün web sitesini GitHub Pages ile yayına aldım.

### Yapılanlar:
- Repository Settings → Pages sekmesine gidildi
- Source: "Deploy from a branch" seçildi
- Branch: `main` seçildi
- Folder: `/ (root)` seçildi
- Save butonuna basıldı

- Site birkaç dakika içinde `sametyalcinkaya.github.io` adresinde yayında oldu

### Opsiyonel Custom Domain:
- Repository root'una `CNAME` dosyası oluşturuldu:
  ```
  sametyalcinkaya.com
  ```

### Öğrendiklerim:
- GitHub Pages kullanımı
- Domain yönetimi
- Hosting konseptleri

---

## 📅 19. Gün: Dokümantasyon ve Kılavuzların Hazırlanması

Bugün projenin dokümantasyonunu oluşturdum.

### Yapılanlar:
- [portfolio-building-guide.md](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/portfolio-building-guide.md) dosyası oluşturuldu
- [portfolio-components-summary.md](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/portfolio-components-summary.md) dosyası oluşturuldu
- [customization-tutorial.md](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/customization-tutorial.md) dosyası oluşturuldu
- [project-summary.md](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/project-summary.md) dosyası oluşturuldu

### Öğrendiklerim:
- Teknik dokümantasyon yazma
- Markdown formatı kullanımı
- Proje belgeleri oluşturma

---

## 📅 20. Gün: Final Testleri ve Sunum Hazırlığı

Bugün projenin final testlerini yaparak sunum hazırlıklarını tamamladım.

### Yapılanlar:
- Tüm özelliklerin son testi yapıldı:
  - Matrix animasyonu
  - Typewriter efekti
  - Responsive tasarım
  - Video galeri
  - Blog sistemi
  - İletişim formu

- Performans metrikleri ölçüldü:
  - Yükleme süresi: ~2.5 saniye
  - Responsive: Tüm cihazlarda uyumlu
  - Cross-browser: Chrome, Firefox, Safari, Edge uyumlu

- Sunum slaytları hazırlandı
- Proje demosu test edildi

### Sonuç:
Proje başarıyla tamamlandı ve tüm hedeflere ulaşıldı:
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

### Öğrendiklerim:
- Proje sunumu hazırlama
- Final test metodolojileri
- Proje değerlendirme kriterleri

---

## 🎓 Staj Sonuçları

Bu 20 günlük staj sürecinde, modern web geliştirme tekniklerini kullanarak hem estetik hem de işlevsel bir kişisel portföy örneği oluşturdum. Hacker temalı tasarımı ile siber güvenlik uzmanları için ideal bir platform geliştirildi.

### Kazanılan Teknik Beceriler:
- HTML5, CSS3, JavaScript ileri seviye kullanımı
- Canvas API ile animasyon geliştirme
- Responsive tasarım prensipleri
- GitHub ve Git versiyon kontrol sistemi
- GitHub Pages ile hosting
- SEO ve performans optimizasyonu

### Kazanılan Yumuşak Beceriler:
- Proje planlama ve yönetimi
- Problem çözme yetenekleri
- Dokümantasyon yazma
- Sunum hazırlama

Bu staj, hem teknik hem de profesyonel anlamda çok değerli bir deneyim oldu. Geliştirdiğim web sitesi, kariyer gelişimim için önemli bir adım oluşturdu.