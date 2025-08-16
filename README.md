# Hıdır Samet YALÇINKAYA - Kişisel Web Sitesi

Bu proje, Hıdır Samet YALÇINKAYA'nın kişisel web sitesidir. GitHub Pages üzerinde yayınlanmak üzere tasarlanmış, modern ve responsive bir web sitesidir.

## 🚀 Özellikler

### 📱 Responsive Tasarım
- Mobil öncelikli tasarım yaklaşımı
- Tüm cihazlarda optimum görüntüleme deneyimi
- Touch-friendly arayüz

### 🌓 Dark/Light Mode
- Sistem tercihi algılama
- Manuel tema değiştirme
- Smooth geçiş animasyonları
- localStorage ile tercih saklama

### 🌍 Çok Dilli Destek
- Türkçe (Ana dil)
- İngilizce desteği
- Dinamik dil değiştirici

### 🎨 Modern UI/UX
- Minimalist ve profesyonel tasarım
- Smooth animasyonlar
- Interactive elements
- Accessibility uyumluluğu

### 📊 İçerik Yönetimi
- Blog yazıları sistemi
- Proje showcase
- Araştırma yayınları
- Ders notları arşivi
- İletişim formu

### ⚡ Performans
- Lazy loading
- Image optimization
- CSS/JS minification
- Fast loading times

## 📁 Proje Yapısı

```
websitem/
├── index.html              # Ana sayfa
├── about.html              # Hakkımda sayfası
├── projects.html           # Projeler sayfası
├── research.html           # Araştırmalar sayfası
├── blog.html               # Blog sayfası
├── notes.html              # Ders notları sayfası
├── contact.html            # İletişim sayfası
├── assets/
│   ├── css/
│   │   ├── main.css        # Ana CSS dosyası
│   │   └── responsive.css  # Responsive CSS
│   ├── js/
│   │   ├── main.js         # Ana JavaScript
│   │   ├── theme.js        # Tema yönetimi
│   │   └── navigation.js   # Navigasyon yönetimi
│   ├── images/
│   │   ├── projects/       # Proje görselleri
│   │   └── blog/           # Blog görselleri
│   └── cv/                 # CV dosyaları
├── blog/                   # Blog yazıları
├── notes/                  # Ders notları
├── research/               # Araştırma dosyaları
├── .gitignore
└── README.md
```

## 🛠️ Teknolojiler

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling, Flexbox, Grid
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome** - Icons
- **Google Fonts** - Typography

### Hosting
- **GitHub Pages** - Static site hosting
- **Custom Domain** - (opsiyonel)

## 📦 Kurulum ve Geliştirme

### Gereksinimler
- Modern web browser
- Git
- Text editor (VS Code önerilir)

### Kurulum
```bash
# Repository'yi klonlayın
git clone https://github.com/[username]/websitem.git

# Dizine girin
cd websitem

# Dosyaları bir local server ile açın (örn: Live Server extension)
# veya direkt olarak index.html'yi browser'da açın
```

### GitHub Pages'e Deploy

1. Repository'yi GitHub'a push edin:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. GitHub repository settings'e gidin
3. Pages sekmesini açın
4. Source olarak "Deploy from a branch" seçin
5. Branch olarak "main" ve folder olarak "/ (root)" seçin
6. Save'e tıklayın

Site birkaç dakika içinde `https://[username].github.io/websitem` adresinde yayınlanacaktır.

### Custom Domain (Opsiyonel)

Custom domain kullanmak için:

1. Repository root'una `CNAME` dosyası oluşturun:
```
yourdomain.com
```

2. Domain sağlayıcınızda DNS ayarlarını yapın:
```
Type: CNAME
Name: www (veya @)
Value: [username].github.io
```

## 🎨 Kişiselleştirme

### Renkler ve Temalar
`assets/css/main.css` dosyasındaki CSS custom properties'i düzenleyerek tema renklerini değiştirebilirsiniz:

```css
:root {
    --primary-color: #2563eb;
    --primary-dark: #1d4ed8;
    --accent-color: #f59e0b;
    /* ... diğer renkler */
}
```

### İçerik Güncelleme
- **Kişisel bilgiler**: HTML dosyalarındaki metin içeriklerini düzenleyin
- **Sosyal medya linkleri**: HTML'deki href değerlerini güncelleyin
- **CV dosyası**: `assets/cv/` klasörüne CV dosyanızı ekleyin
- **Profil fotoğrafı**: `assets/images/profile.jpg` dosyasını değiştirin

### Blog Yazıları Ekleme
1. `blog/` klasöründe yeni HTML dosyası oluşturun
2. `blog.html` dosyasında blog listesine ekleyin
3. Gerekli meta bilgilerini güncelleyin

## 📱 Browser Desteği

- Chrome (son 2 versiyon)
- Firefox (son 2 versiyon)
- Safari (son 2 versiyon)
- Edge (son 2 versiyon)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Geliştirme Notları

### Performans Optimizasyonu
- Image lazy loading aktif
- CSS ve JS dosyalar minimize edilmiş
- Critical CSS inline olarak eklenmiş
- Font loading optimize edilmiş

### SEO Optimizasyonu
- Meta tags tüm sayfalarda mevcut
- Open Graph tags eklenmiş
- Sitemap.xml oluşturulacak
- Robots.txt konfigüre edilecek

### Accessibility
- ARIA labels kullanılmış
- Keyboard navigation destekleniyor
- Color contrast ratios uygun
- Screen reader uyumlu

## 📄 Lisans

Bu proje kişisel kullanım içindir. İzin almadan ticari kullanım yasaktır.

## 🤝 Katkıda Bulunma

Öneriler ve hata bildirimleri için lütfen GitHub Issues kullanın.

## 📞 İletişim

- **Email**: samet@example.com
- **LinkedIn**: [linkedin.com/in/sametyalcinkaya](https://linkedin.com/in/sametyalcinkaya)
- **GitHub**: [github.com/sametyalcinkaya](https://github.com/sametyalcinkaya)

---

⭐ Bu projeyi beğendiyseniz star vermeyi unutmayın!
