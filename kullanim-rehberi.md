# 🛡️ Web Sitesi Kullanım ve Yönetim Kılavuzu

Bu rehber, hazırlanan hacker stilindeki web sitenizin nasıl kullanılacağını ve yönetileceğini açıklamaktadır.

🌐 **Canlı Site:** [sametyn558.github.io/WEB](https://sametyn558.github.io/WEB)  
📁 **Repository:** [github.com/sametyn558/WEB](https://github.com/sametyn558/WEB)

---

## 🎆 Mevcut Özellikler Genel Bakış

### ✅ Tamamlanmış Özellikler
- **Matrix Rain Animation** - Canlı arka plan animasyonu
- **Terminal Interface** - Authentic hacker-style görünüm
- **Responsive Design** - Tüm cihazlarda mükemmel deneyim
- **Contact Form** - Formspree ile çalışır iletişim (sametyn558@gmail.com)
- **Thanks Page** - Terminal-style başarı sayfası
- **Video Gallery** - YouTube modal player entegrasyonu
- **Blog System** - Terminal-style dinamik blog sistemi
- **CV Modal** - PDF viewer ESC tuşu desteği ile
- **Keyboard Shortcuts** - Alt+H, Alt+A, Alt+C kısayolları
- **Loading Screen** - Profesyonel yükleme animasyonu
- **SEO Optimization** - Meta tags ve Open Graph desteği

### 📊 Performance Metrikleri
- **Yükleme Süresi:** ~2.5 saniye
- **Responsive:** 320px-4K çözünürlük desteği
- **Browser Support:** Chrome, Firefox, Safari, Edge
- **Mobile-First:** Mobil cihazlar için optimize

---

## 📁 Genel Yapı ve Dosya Konumları

### Ana Dizin Yapısı:
```
WEB/
├── index.html          # Ana sayfa
├── blog/               # Blog sistemi
│   ├── index.html      # Blog ana sayfası
│   ├── cyber-security-basics.html
│   └── (diğer blog yazıları)
├── docs/               # Dökümanlar ve CV
│   └── index.html      # Dökümanlar sayfası
├── css/                # Stil dosyaları
│   ├── style.css       # Ana stiller
│   └── animations.css  # Animasyonlar
├── js/                 # JavaScript dosyaları
│   ├── matrix.js       # Matrix yağmur efekti
│   ├── typewriter.js   # Yazı animasyonları
│   └── main.js         # Ana işlevler
├── images/             # Görseller
│   ├── logo.svg        # Logo
│   ├── profile.svg     # Profil resmi
│   ├── favicon.svg     # Favicon
│   └── video-placeholder.jpg
└── videos/             # Video dosyaları (opsiyonel)
```

---

## ✏️ Yeni Blog Yazısı Ekleme

### Adım 1: Yeni HTML dosyası oluştur
`blog/` klasöründe yeni bir `.html` dosyası oluşturun:
```
blog/yeni-yazim.html
```

### Adım 2: İçerik şablonunu kullan
Mevcut blog yazılarından birini kopyalayarak şablonu elde edin. Temel yapı:

```html
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yazı Başlığı | Cyber Security Blog</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/animations.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <!-- Prism.js for syntax highlighting -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-dark.min.css" rel="stylesheet">
</head>
<body>
    <!-- Matrix Canvas Background -->
    <canvas id="matrix-canvas"></canvas>
    
    <!-- Terminal Window -->
    <div class="container">
        <article class="blog-post terminal-window">
            <div class="terminal-header">
                <div class="terminal-buttons">
                    <span class="btn-close"></span>
                    <span class="btn-minimize"></span>
                    <span class="btn-maximize"></span>
                </div>
                <div class="terminal-title">blog_post.md</div>
                <div class="terminal-user">user@cybersec</div>
            </div>
            
            <div class="terminal-body">
                <!-- İçerik buraya -->
                <h1>Yazı Başlığı</h1>
                <div class="post-meta">
                    <span class="date">2024-01-15</span> |
                    <span class="category">Kategori</span> |
                    <span class="read-time">5 dk okuma</span>
                </div>
                
                <div class="post-content">
                    <!-- Blog içeriği -->
                </div>
            </div>
        </article>
        
        <div class="back-navigation">
            <a href="index.html" class="btn btn-secondary">
                <i class="fas fa-arrow-left"></i> Blog Ana Sayfası
            </a>
        </div>
    </div>

    <!-- Scripts -->
    <script src="../js/matrix.js"></script>
</body>
</html>
```

### Adım 3: Blog listesine ekle
`blog/index.html` dosyasında, blog listesine yeni yazınızı ekleyin:

```html
<li class="blog-item">
    <a href="yeni-yazim.html">
        <span class="command-prompt">[2024-01-15]</span>
        <span class="post-title">Yeni Yazım Başlığı</span>
        <span class="post-category">[kategori]</span>
    </a>
</li>
```

---

## 🎥 Yeni Video Ekleme

### Adım 1: Video bilgilerini hazırla
YouTube videolarınız için gerekli bilgiler:
- Video ID (YouTube URL'den: `watch?v=ABC123` kısmındaki ABC123)
- Video başlığı
- Video süresi
- Görüntülenme sayısı (opsiyonel)

### Adım 2: Video verilerini güncelle
`js/main.js` dosyasını açın ve `videoData` dizisine yeni video ekleyin:

```javascript
const videoData = [
    // Mevcut videolar...
    {
        id: "YOUTUBE_VIDEO_ID",
        title: "Video Başlığı",
        duration: "12:34",
        views: "1.2K",
        category: "Siber Güvenlik"
    }
];
```

### Adım 3: Ana sayfada video kartlarını güncelle
`index.html` dosyasında video kartlarını ekleyin/çıkarın.

**Not:** Video modal otomatik olarak çalışacak!

---

## 🖼️ Logo ve Görsel Güncelleme

### Logo Değiştirme:
1. Yeni logonuzu `images/logo.svg` olarak kaydedin
2. Veya farklı bir format kullanıyorsanız, `index.html`'de referansı güncelleyin:
```html
<img src="images/yeni-logo.png" alt="Logo" class="brand-logo">
```

### Profil Resmi:
1. `images/profile.svg` dosyasını değiştirin
2. Ana sayfadaki "About" bölümünde otomatik olarak görünecektir

### Favicon:
1. `images/favicon.svg` dosyasını değiştirin
2. Tarayıcı sekmesinde görünecektir

---

## 📄 Döküman Ekleme (CV, Sertifika vb.)

### Adım 1: Dosyaları yerleştir
Dökümanlarınızı `docs/` klasörü altında uygun klasörlere yerleştirin:
```
docs/
├── cv/
│   └── cv-2024.pdf
├── certificates/
│   └── cissp-certificate.pdf
└── projects/
    └── proje-raporu.pdf
```

### Adım 2: Docs sayfasını güncelle
`docs/index.html` dosyasında file tree ve download butonlarına yeni dosyaları ekleyin:

```html
<!-- File tree'ye ekle -->
<div class="file-item">
    <i class="fas fa-file-pdf"></i>
    <span>yeni-dokuman.pdf</span>
</div>

<!-- Download butonuna ekle -->
<button class="download-btn" data-file="yeni-dokuman.pdf">
    <i class="fas fa-download"></i>
    <span>download yeni-dokuman.pdf</span>
</button>
```

---

## 🎨 Stil ve Animasyon Düzenleme

### Renk Değişiklikleri:
`css/style.css` dosyasının başındaki `:root` bölümünde renkleri değiştirebilirsiniz:

```css
:root {
  --primary-green: #00FF00;    /* Ana yeşil renk */
  --secondary-green: #00CC00;  /* İkincil yeşil */
  --neon-blue: #00FFFF;        /* Neon mavi */
  /* Diğer renkler... */
}
```

### Animasyon Hızları:
Transition sürelerini ayarlayın:
```css
:root {
  --transition-fast: 0.15s ease-in-out;
  --transition-normal: 0.3s ease-in-out;
  --transition-slow: 0.5s ease-in-out;
}
```

---

## 📱 Responsive Tasarım

Web sitesi otomatik olarak farklı ekran boyutlarına uyum sağlar:
- **Desktop**: Full özellikli görünüm
- **Tablet**: Grid düzenlemeleri
- **Mobile**: Hamburger menü ve tek sütun düzen

---

## 🔧 JavaScript İşlevleri

### Matrix Yağmur Efekti:
`js/matrix.js` - Arka plan animasyonu

### Typewriter Animasyonu:
`js/typewriter.js` - Terminal yazı efektleri

### Ana İşlevler:
`js/main.js` - Video modal, form validasyon, smooth scroll

---

## 🚀 Site Yayınlama

### GitHub Pages için:
1. Tüm dosyaları GitHub repository'sine yükleyin
2. Repository ayarlarından Pages'i etkinleştirin
3. `main` branch'ten yayınlayın

### Lokal Test:
1. `index.html` dosyasını tarayıcıda açın
2. Blog ve docs linklerinin çalıştığını kontrol edin

---

## 📱 İletişim Formu Yönetimi

### Formspree Konfigürasyonu
İletişim formu **Formspree** servisi ile çalışmaktadır:
- **Form ID:** `movnaalr`
- **Hedef Email:** `sametyn558@gmail.com`
- **Başarı Sayfası:** `thanks.html`
- **Form Action:** `https://formspree.io/f/movnaalr`
- **Method:** POST
- **Current Status:** ✅ Çalışır durumda

### Formspree Dashboard Yönetimi
1. [formspree.io](https://formspree.io) hesabınıza giriş yapın
2. Form submission'larını kontrol edin
3. Email notification ayarlarını kontrol edin
4. Spam filtreleme ayarlarını yapın

### Formspree Özellikleri
- **Spam Protection:** Otomatik spam filtreleme
- **Email Notifications:** Anlık email bildirimleri
- **Form Validation:** Client-side ve server-side validation
- **GDPR Compliant:** Veri koruma uyumlu
- **Submission Archive:** Form gönderimlerinin arşivi

### Email Teslimat Sorunları
**Sorun:** Emailler gelmiyor  
**Çözüm:**
1. Gmail spam klasörünü kontrol edin
2. `@formspree.io` adreslerini whitelist'e ekleyin
3. Formspree dashboard'da email verified mi kontrol edin
4. Form submission'larını Formspree dashboard'dan kontrol edin
5. Internet bağlantısını kontrol edin

### Form Alanı Güncellemeleri
Form alanı değiştirmek için `index.html` dosyasında contact form section'ı düzenleyin:
```
<form action="https://formspree.io/f/movnaalr" method="POST">
    <input type="text" name="name" placeholder="> name:" required>
    <input type="email" name="email" placeholder="> email:" required>
    <textarea name="message" placeholder="> message:" required></textarea>
    <input type="hidden" name="_next" value="thanks.html">
    <button type="submit">Execute Command</button>
</form>
```

---

## 🏗️ Site Bakımı

### Performans İpuçları
1. **Görseller:** WebP formatını tercih edin
2. **Videolar:** YouTube embed kullanarak bandwidth tasarrufu yapın
### Güvenlik
1. **Sensitive Data:** Production'da hassas bilgi bulundurmayın
### SEO
1. **Meta Tags:** Her sayfada uygun meta description
2. **Alt Tags:** Görsellerde alt attribute kullanın

---

## 🐛 Sorun Giderme

### Blog/Docs Boş Görünüyor:
- Navigation linklerinin doğru olduğunu kontrol edin
- File path'lerin doğru olduğunu kontrol edin

### Matrix Animasyonu Çalışmıyor:
- `js/matrix.js` dosyasının yüklendiğini kontrol edin
- Console'da JavaScript hatalarını kontrol edin

### Video Modal Açılmıyor:
- YouTube video ID'lerinin doğru olduğunu kontrol edin
- `js/main.js` dosyasındaki video data'yı kontrol edin

---

## 📞 Destek

Bu rehber ile ilgili herhangi bir sorunuz olursa, site yapısını bozmadan güvenle düzenlemeler yapabilirsiniz. Önemli değişikliklerden önce backup almayı unutmayın!

---

*Hacker tarzı web siteniz hazır! 🔥*
