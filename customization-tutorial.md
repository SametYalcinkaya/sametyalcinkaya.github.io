# 🛠️ Kişisel Portföy Özelleştirme Eğitimi

Bu eğitim, hacker temalı kişisel portföy websitesini kendi bilgilerinizle nasıl özelleştireceğinizi adım adım açıklamaktadır.

---

## 🎯 1. Kişisel Bilgilerin Güncellenmesi

### Adım 1: Ana Sayfa Bilgileri ([index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/index.html))

[index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/index.html) dosyasını açın ve aşağıdaki alanları güncelleyin:

```html
<!-- Hero section'da isim -->
<h1 id="hero-name">Kendi Adınız</h1>

<!-- Hero section'da açıklama -->
<p id="hero-description">Kendi açıklamanız...</p>

<!-- Specialization alanları -->
<div class="specializations">
    <div class="spec-item">🔧 Uzmanlık Alanınız 1</div>
    <div class="spec-item">🔍 Uzmanlık Alanınız 2</div>
    <div class="spec-item">🤖 Uzmanlık Alanınız 3</div>
    <div class="spec-item">🧠 Uzmanlık Alanınız 4</div>
</div>
```

### Adım 2: Typewriter Efekti ([js/typewriter.js](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/js/typewriter.js))

[js/typewriter.js](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/js/typewriter.js) dosyasında şu satırları güncelleyin:

```javascript
// Hero name typewriter
nameTypewriter.start('Kendi Adınız');

// Hero description typewriter
const descriptionText = `Kendi açıklamanız...`;
```

### Adım 3: Hakkımda Bölümü ([index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/index.html))

[index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/index.html) dosyasında about section'ı güncelleyin:

```html
<div class="about-text">
    <p>Kendi hakkımda paragrafınız 1...</p>
    <p>Kendi hakkımda paragrafınız 2...</p>
    <p>Kendi hakkımda paragrafınız 3...</p>
</div>
```

---

## 🎨 2. Stil ve Renk Ayarlarının Değiştirilmesi

### Adım 1: Renk Paleti ([css/style.css](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/css/style.css))

[css/style.css](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/css/style.css) dosyasının `:root` bölümünde renkleri değiştirin:

```css
:root {
  --primary-green: #00FF00;    /* Ana renk - kendi renginizi seçin */
  --secondary-green: #00CC00;  /* İkincil renk */
  --neon-blue: #00FFFF;        /* Accent renk */
  --danger-red: #FF0000;       /* Uyarı rengi */
}
```

### Adım 2: Font Ayarları ([css/style.css](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/css/style.css))

Google Fonts'tan yeni fontlar seçin ve [css/style.css](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/css/style.css) dosyasında güncelleme yapın:

```css
--font-mono: 'Yeni Monospace Font', 'Courier New', monospace;
```

[index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/index.html) dosyasında da font bağlantısını güncelleyin:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Yeni+Font:wght@300;400;500;600;700&display=swap">
```

---

## 🛡️ 3. Yetenekler Bölümünün Özelleştirilmesi

[index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/index.html) dosyasında skills section'ı güncelleyin:

```html
<div class="skills-grid">
    <div class="skill-card">
        <div class="skill-header">
            <i class="fas fa-shield-alt skill-icon"></i>
            <h3>Yetenek 1</h3>
        </div>
        <div class="skill-progress">
            <div class="progress-bar" data-width="95"></div>
        </div>
        <div class="skill-level">95%</div>
    </div>
    
    <!-- Diğer yetenek kartları -->
</div>
```

Yetenek ikonlarını [Font Awesome Icons](https://fontawesome.com/icons) sitesinden seçebilirsiniz.

---

## 🎥 4. Video Galerisinin Güncellenmesi

### Adım 1: Video Verileri ([js/main.js](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/js/main.js))

[js/main.js](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/js/main.js) dosyasında `videoData` array'ini güncelleyin:

```javascript
const videoData = [
    {
        title: 'Video Başlığınız',
        videoId: 'YOUTUBE_VIDEO_ID', // YouTube video ID
        duration: '12:34',
        thumbnail: 'images/video1.jpg' // Opsiyonel
    },
    // Diğer videolar...
];
```

YouTube video ID'sini şu şekilde bulabilirsiniz:
```
YouTube URL: https://www.youtube.com/watch?v=ABC123XYZ789
Video ID: ABC123XYZ789
```

### Adım 2: Video Kartları ([index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/index.html))

[index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/index.html) dosyasında video kartlarını ekleyin:

```html
<div class="video-card">
    <div class="video-thumbnail">
        <img src="images/video-placeholder.jpg" alt="Video Başlığı" loading="lazy">
        <div class="play-button">
            <i class="fas fa-play"></i>
        </div>
        <div class="video-duration">12:34</div>
    </div>
    <div class="video-info">
        <h3 class="video-title">Video Başlığınız</h3>
        <div class="video-stats">
            <span class="views">1.5K görüntüleme</span>
            <span class="date">3 gün önce</span>
        </div>
    </div>
</div>
```

---

## 📝 5. Blog Sisteminin Özelleştirilmesi

### Adım 1: Yeni Blog Yazısı Oluşturma

[blog/](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/blog) klasöründe yeni bir HTML dosyası oluşturun:
```
blog/yeni-yazim.html
```

[blog/siber-guvenlik-temelleri.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/blog/siber-guvenlik-temelleri.html) dosyasını şablon olarak kullanabilirsiniz.

### Adım 2: Blog Listesine Ekleme ([blog/index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/blog/index.html))

[blog/index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/blog/index.html) dosyasında `blogPosts` array'ine yeni yazınızı ekleyin:

```javascript
const blogPosts = [
    {
        title: "Yeni Yazı Başlığınız",
        date: "2024-01-20",
        file: "yeni-yazim.html",
        description: "Yazınızın kısa açıklaması"
    },
    // Diğer yazılar...
];
```

---

## 📄 6. Dokümanlar Bölümünün Güncellenmesi

### Adım 1: CV/Doküman Ekleme

[docs/](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/docs) klasörüne CV ve diğer dokümanlarınızı ekleyin:
```
docs/
├── Hıdır_SAMET-CV.pdf
└── sertifikalar/
    └── cissp-certificate.pdf
```

### Adım 2: CV Dosyasının Güncellenmesi ([index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/index.html))

[index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/index.html) dosyasında CV modal iframe kaynağını güncelleyin:

```html
<iframe id="cv-frame" src="docs/Kendi-CV.pdf" type="application/pdf"></iframe>
```

---

## 📧 7. İletişim Formunun Yapılandırılması

### Adım 1: Formspree Hesabı Oluşturma

1. [formspree.io](https://formspree.io) adresine gidin
2. Ücretsiz hesap oluşturun
3. Yeni form oluşturun
4. Form ID'nizi alın (örn: `movnaalr`)

### Adım 2: Form Action'ının Güncellenmesi ([index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/index.html))

[index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/index.html) dosyasında form action'ını güncelleyin:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <input type="hidden" name="_next" value="thanks.html">
    <!-- Diğer form alanları -->
</form>
```

### Adım 3: Hedef Email'in Güncellenmesi

Formspree dashboard üzerinden hedef email adresinizi ayarlayın.

---

## 🔗 8. Sosyal Medya Bağlantılarının Güncellenmesi

[index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/index.html) dosyasında sosyal medya bağlantılarını güncelleyin:

```html
<div class="social-grid">
    <a href="https://www.linkedin.com/in/kullaniciadi" class="social-link">
        <i class="fab fa-linkedin"></i>
        <span>LinkedIn</span>
    </a>
    <a href="https://github.com/kullaniciadi" class="social-link">
        <i class="fab fa-github"></i>
        <span>GitHub</span>
    </a>
    <!-- Diğer sosyal medya bağlantıları -->
</div>
```

---

## 🖼️ 9. Görsellerin Değiştirilmesi

### Adım 1: Logo ve Profil Resmi

[images/](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/images) klasörüne kendi görsellerinizi ekleyin:
- `logo.svg` - Site logosu
- `HSY.png` - Profil resmi
- `favicon.svg` - Tarayıcı sekmesi ikonu

### Adım 2: Video Thumbnail'leri

[images/](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/images) klasörüne video thumbnail görsellerinizi ekleyin:
- `video1.jpg`
- `video2.jpg`
- `video3.jpg`

Görsel boyutu: 400x225 piksel (16:9 oranı)

---

## 🌐 10. SEO ve Meta Tag'lerin Güncellenmesi

[index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/index.html) dosyasında meta tag'leri güncelleyin:

```html
<meta name="description" content="Kendi açıklamanız - Siber Güvenlik Uzmanı">
<meta name="keywords" content="siber güvenlik, uzmanlık alanlarınız">
<meta name="author" content="Kendi Adınız">

<!-- Open Graph Meta Tags -->
<meta property="og:title" content="Kendi Adınız - Siber Güvenlik Uzmanı">
<meta property="og:description" content="Kendi açıklamanız">
<meta property="og:image" content="images/profil-resmi.jpg">

<!-- Twitter Card Meta Tags -->
<meta name="twitter:title" content="Kendi Adınız - Siber Güvenlik Uzmanı">
<meta name="twitter:description" content="Kendi açıklamanız">
```

---

## 🧪 11. Test ve Önizleme

### Yerel Test

[index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/index.html) dosyasını tarayıcıda açarak değişikliklerinizi test edin.

### VS Code Live Server Kullanımı

VS Code kullanıyorsanız:
1. Live Server eklentisini yükleyin
2. [index.html](file:///c%3A/Users/samet/Documents/GitHub/sametyalcinkaya.github.io/index.html) dosyasına sağ tıklayın
3. "Open with Live Server" seçeneğini seçin

---

## ☁️ 12. GitHub'a Yükleme ve GitHub Pages ile Yayınlama

### Adım 1: GitHub'a Yükleme

```bash
git add .
git commit -m "Portföy özelleştirmesi tamamlandı"
git push origin main
```

### Adım 2: GitHub Pages Aktivasyonu

1. GitHub repository'nizin Settings sekmesine gidin
2. Pages bölümünü açın
3. Source: "Deploy from a branch" seçin
4. Branch: `main` seçin
5. Folder: `/ (root)` seçin
6. Save butonuna basın

Web siteniz birkaç dakika içinde `kullaniciadi.github.io/WEB` adresinde yayında olacaktır.

---

## 🎉 Özelleştirme Tamamlandı!

Bu 12 adımlık süreçte kişisel portföy websitesini kendi bilgilerinizle özelleştirdiniz. Web siteniz artık şu özelliklere sahip:

✅ Kişisel bilgilerinizle güncellenmiş  
✅ Kendi stil tercihlerinize göre tasarlanmış  
✅ Video ve blog içeriklerinizle zenginleştirilmiş  
✅ Çalışır iletişim formu ile donatılmış  
✅ SEO ve performans optimizasyonları uygulanmış  
✅ GitHub Pages ile ücretsiz olarak yayınlanmış  

Bu portföy, profesyonel kimliğinizi yansıtmak ve kariyer hedeflerinize ulaşmak için mükemmel bir araçtır.