# 📝🎥 Blog ve Video Ekleme Rehberi

Bu rehber, siber güvenlik portföyünüze blog yazıları ve YouTube videolarını nasıl ekleyeceğinizi gösterir.

---

## 📝 **BLOG YAZILARI EKLEME**

### 1️⃣ **Blog Yapısı**
```
blog/
├── index.html                    # ✅ Blog ana sayfası (hazır)
├── siber-guvenlik-temelleri.html # ✅ Örnek yazı (hazır)
└── [yeni-yaziniz].html          # ➕ Yeni yazılarınız buraya
```

### 2️⃣ **Yeni Blog Yazısı Ekleme**

#### A) Yeni HTML Dosyası Oluşturun:
`blog/yeni-yazi-adi.html` formatında dosya oluşturun.

#### B) Şablon Kullanın:
`blog/siber-guvenlik-temelleri.html` dosyasını kopyalayıp düzenleyin:

```html
<!DOCTYPE html>
<html lang="tr">
<head>
    <title>Yazı Başlığınız | Hıdır Samet Yalçınkaya</title>
    <!-- Diğer head tagları aynı kalacak -->
</head>
<body>
    <!-- İçeriği değiştirin -->
    <h1 class="article-title">🔍 Yazı Başlığınız</h1>
    <div class="article-info">
        <span class="date">📅 Tarih</span>
        <span class="author">👤 Hıdır Samet Yalçınkaya</span>
        <span class="reading-time">⏱️ X dakika okuma</span>
    </div>
    <!-- Markdown içeriğiniz buraya -->
</body>
</html>
```

#### C) Blog Index'i Güncelleyin:
`blog/index.html` dosyasında `blogPosts` array'ine yeni yazınızı ekleyin:

```javascript
const blogPosts = [
    {
        title: "Yeni Yazı Başlığınız",
        date: "2024-01-20",
        file: "yeni-yazi-adi.html",
        description: "Yazınızın kısa açıklaması"
    },
    // Diğer yazılar...
];
```

### 3️⃣ **Desteklenen İçerik Formatları**

#### ✅ **HTML Tags:**
```html
<h2>🎯 Ana Başlık</h2>
<h3>Alt Başlık</h3>
<p>Paragraf metni</p>
<ul><li>Liste elemanı</li></ul>
<ol><li>Numaralı liste</li></ol>
<strong>Kalın metin</strong>
<em>İtalik metin</em>
<a href="#" style="color: var(--neon-blue);">Link</a>
```

#### ✅ **Kod Blokları:**
```html
<pre><code class="bash">
# Terminal komutları
sudo apt update
nmap -sS target.com
</code></pre>

<code>inline kod</code>
```

#### ✅ **Özel Kutular:**
```html
<div class="risk-matrix" style="background: var(--bg-gray); padding: 1rem; border-radius: 0.5rem;">
    <h4>Önemli Bilgi</h4>
    <p>Dikkat çekici içerik</p>
</div>
```

---

## 🎥 **VIDEO EKLEME**

### 1️⃣ **YouTube Video ID Alma**

YouTube URL'inizden video ID'sini alın:
```
YouTube URL: https://www.youtube.com/watch?v=ABC123XYZ789
Video ID: ABC123XYZ789
```

### 2️⃣ **Video Verilerini Güncelleme**

`js/main.js` dosyasında `videoData` array'ini düzenleyin:

```javascript
const videoData = [
    {
        title: 'Video Başlığınız',
        videoId: 'ABC123XYZ789', // ✅ Gerçek YouTube ID'nizi buraya
        duration: '12:34',
        thumbnail: 'images/video1-thumb.jpg' // ✅ Opsiyonel
    },
    {
        title: 'İkinci Videonuz',
        videoId: 'DEF456UVW012',
        duration: '08:45',
        thumbnail: 'images/video2-thumb.jpg'
    },
    // Daha fazla video ekleyin...
];
```

### 3️⃣ **Video Thumbnail'leri**

#### A) **Otomatik YouTube Thumbnail (Kolay):**
`thumbnail` parametresini silip YouTube'un otomatik thumbnail'ini kullanın:

```javascript
{
    title: 'Video Başlığınız',
    videoId: 'ABC123XYZ789',
    duration: '12:34'
    // thumbnail parametresini eklemeyin
}
```

#### B) **Özel Thumbnail (Önerilen):**
1. 400x225 piksel (16:9) boyutunda görsel hazırlayın
2. `images/` klasörüne `video1-thumb.jpg` formatında kaydedin  
3. Dosya yolunu `thumbnail` parametresinde belirtin

### 4️⃣ **Ana Sayfada Video Kartlarını Güncelleme**

`index.html` dosyasında video kartlarını ekleyin/çıkarın:

```html
<!-- Video kartı şablonu -->
<div class="video-card">
    <div class="video-thumbnail">
        <img src="images/video-placeholder.jpg" alt="Video Thumbnail" loading="lazy">
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

### 5️⃣ **Video Kategorileri**

Ana sayfadaki video grid'ine kategori filtreleme eklemek için:

```javascript
// js/main.js dosyasına kategori sistemi ekleyebilirsiniz
const videoCategories = {
    'siber-guvenlik': 'Siber Güvenlik',
    'adli-bilisim': 'Adli Bilişim', 
    'ai-ml': 'AI/ML',
    'conference': 'Konferanslar'
};
```

---

## 🎯 **HIZLI BAŞLANGIÇ**

### ✅ **Blog Yazısı Eklemek İçin:**
1. `blog/ornek-yazi.html` oluşturun
2. `blog/siber-guvenlik-temelleri.html` dosyasını kopyalayın
3. İçeriği kendi yazınızla değiştirin
4. `blog/index.html` dosyasında `blogPosts` array'ine ekleyin

### ✅ **YouTube Video Eklemek İçin:**
1. YouTube video ID'nizi kopyalayın (URL'deki v= kısmından sonra)
2. `js/main.js` dosyasında `videoData` array'ine ekleyin
3. İsteğe bağlı: `images/` klasörüne thumbnail ekleyin

### ✅ **Önizleme İçin:**
1. `index.html` dosyasını tarayıcıda açın
2. `/blog` linkine tıklayıp blog sayfasını kontrol edin
3. Video kartlarına tıklayıp modal'ın çalıştığını test edin

---

## 🛠️ **GELİŞMİŞ ÖZELLİKLER**

### 📊 **Blog İstatistikleri:**
```javascript
// Blog yazısına okuma süresi ekleme
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}
```

### 🔍 **Blog Arama:**
```html
<!-- Blog sayfasına arama kutusu ekleme -->
<div class="blog-search">
    <input type="text" id="search" placeholder="Yazı ara..." />
</div>
```

### 📱 **Video Responsive:**
Ana sayfada video grid otomatik responsive:
- **Mobile**: 1 sütun
- **Tablet**: 2 sütun  
- **Desktop**: 3-4 sütun

---

## ⚠️ **DİKKAT EDİLECEKLER**

### ❌ **Yapmayın:**
- Video dosyalarını doğrudan sunucuda barındırmayın (yavaş olur)
- Blog yazılarında çok büyük görseller kullanmayın
- YouTube video ID'lerini yanlış yazmayın

### ✅ **Yapın:**
- YouTube embedded videoları kullanın (hızlı + güvenilir)
- Blog görsellerini optimize edin (WebP formatı önerilir)
- SEO için meta description ekleyin
- Mobile responsive kontrol edin

---

## 🔧 **SORUN GİDERME**

### 🎥 Video Çalışmıyor:
1. YouTube video ID'yi kontrol edin
2. Video'nun "Gömme" iznini kontrol edin (YouTube ayarları)
3. Console'da JavaScript hata olup olmadığını kontrol edin

### 📝 Blog Yazısı Görünmüyor:
1. HTML dosya adını kontrol edin
2. `blog/index.html` dosyasında array'e eklendiğini kontrol edin
3. Dosya yolunun doğru olduğunu kontrol edin

### 🐛 Stil Bozukluğu:
1. CSS dosyalarının yüklenmesini kontrol edin
2. Terminal window yapısını kontrol edin
3. Class adlarının doğru olduğunu kontrol edin

---

**Başarılar! 🚀 Sorularınız için README.md dosyasındaki iletişim bilgilerimi kullanabilirsiniz.**
