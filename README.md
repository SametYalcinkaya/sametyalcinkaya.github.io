# 🛡️ Hıdır Samet Yalçınkaya - Siber Güvenlik Portföyü

Modern ve etkileyici **hacker-style** temalı kişisel portföy websitesi. Siber güvenlik, adli bilişim ve yapay zeka uzmanlığı sergilemek için tasarlanmıştır.

🌐 **Live Demo:** [sametyn558.github.io/WEB](https://sametyn558.github.io/WEB)  
📚 **Documentation:** [PRD.md](prd.md) | [Usage Guide](kullanim-rehberi.md) | [Blog-Video Guide](BLOG-VIDEO-GUIDE.md) | [Deployment Guide](DEPLOYMENT-GUIDE.md)

## 🎨 Özellikler

### ✨ Hacker-Style Tema
- **Matrix Rain Animasyonu** - Canvas tabanlı background efekti
- **Terminal Interface** - Komut satırı görünümü
- **Typewriter Effect** - İsim ve açıklamaların yazılma animasyonu
- **Glitch Effects** - Hover ve focus efektleri
- **Neon Glow** - Yeşil neon ışık efektleri

### 🎯 Current Features
- **Hero Section** - Terminal window with personal introduction and typewriter effects
- **About** - Detailed profile information with skill matrix and progress bars
- **Skills** - Animated skill bars (95% Cyber Security, 90% Digital Forensics, 85% AI/ML)
- **Videos** - YouTube-style video gallery with modal player integration
- **Blog** - Terminal-style blog system with dynamic content management
- **Contact** - Working contact form with Formspree integration and thanks page
- **Docs** - CV viewer modal with PDF preview and keyboard support

### 📱 Responsive Tasarım
- **Mobile-First** - Mobil cihazlar için optimize edilmiş
- **Tablet Uyumlu** - Orta ölçekli ekranlar için uygun  
- **Desktop Enhanced** - Büyük ekranlarda tam özellikli deneyim
- **Hamburger Menu** - Mobilde terminal-style navigation

### ⚡ Performance & Advanced Features
- **Matrix Rain Animation** - Canvas-based background with customizable opacity
- **Lazy Loading** - Images and content loaded on demand for optimal performance
- **Optimized Animations** - 60 FPS smooth animations with GPU acceleration
- **Keyboard Shortcuts** - Alt+H (Home), Alt+A (About), Alt+C (Contact), ESC (Close modals)
- **Working Contact Form** - Formspree integration with email delivery to sametyn558@gmail.com
- **CV Modal System** - PDF viewer with ESC key support and responsive design
- **Thanks Page** - Terminal-style success page after form submission
- **Loading Screen** - Professional loading animation with security protocol theme
- **SEO Optimization** - Meta tags, Open Graph, and Twitter Card support

## 🚀 Kurulum

### 1. Repo'yu klonlayın
```bash
git clone https://github.com/sametyn558/WEB.git
cd WEB
```

### 2. Live Server ile çalıştırın
VS Code Live Server eklentisi kullanarak `index.html` dosyasını açın veya herhangi bir HTTP server kullanın:

```bash
# Python ile
python -m http.server 8000

# Node.js ile
npx serve .

# PHP ile  
php -S localhost:8000
```

### 3. Tarayıcıda açın
`http://localhost:8000` adresini ziyaret edin

### 4. GitHub Pages Deployment
- Repository Settings → Pages
- Source: "Deploy from a branch"
- Branch: `main`
- Folder: `/ (root)`
- Custom domain: opsiyonel

## 📁 Proje Yapısı

```
/
├── index.html              # Ana sayfa
├── thanks.html             # İletişim formu başarı sayfası
├── css/
│   ├── style.css          # Ana stil dosyası (responsive, hacker theme)
│   └── animations.css     # Animasyon tanımları
├── js/
│   ├── main.js           # Ana JavaScript (form, modal, interactions)
│   ├── matrix.js         # Matrix rain animasyonu
│   └── typewriter.js     # Typewriter efektleri
├── images/
│   ├── logo.svg          # Ana logo
│   ├── HSY.png           # Kişisel logo
│   └── video*.jpg        # Video thumbnails
├── blog/               # Blog sistemi
│   ├── index.html        # Blog ana sayfası
│   └── *.html            # Blog yazıları
├── docs/               # Dokümanlar (CV, sertifikalar)
├── prd.md              # Proje gereksinimleri dokümanı
├── kullanim-rehberi.md # Kullanım kılavuzu
├── BLOG-VIDEO-GUIDE.md # Blog ve video ekleme rehberi
└── README.md
```

## 🎨 Customization

### Renk Paleti Değiştirme
`css/style.css` dosyasındaki `:root` değişkenlerini düzenleyin:

```css
:root {
  --primary-green: #00FF00;      /* Ana yeşil renk */
  --secondary-green: #00CC00;    /* İkincil yeşil */
  --neon-blue: #00FFFF;         /* Neon mavi */
  --danger-red: #FF0000;        /* Uyarı kırmızısı */
}
```

### Content Customization
1. **Name and Description**: Update texts in `js/typewriter.js` file
2. **Skills**: Edit skill cards in `index.html` file  
3. **Videos**: Update `videoData` array in `js/main.js` file
4. **Contact Information**: Update social media links and contact details
5. **Blog Posts**: Add new posts in `blog/` directory and update blog index
6. **CV/Documents**: Replace files in `docs/` directory

### Video Management
1. Add YouTube video IDs to `js/main.js` file
2. Upload thumbnail images to `images/` folder
3. Update video cards in `index.html` file
4. Configure video modal settings for optimal playback

## 🌐 GitHub Pages Deployment

### 1. Repository Ayarları
- Repository adı: `username.github.io` olmalı
- Public repository olarak ayarlayın

### 2. GitHub Pages Aktifleştirme  
1. Repository Settings → Pages
2. Source: "Deploy from a branch" 
3. Branch: `main` / `master`
4. Folder: `/ (root)`

### 3. Custom Domain (Opsiyonel)
`CNAME` dosyası oluşturun:
```
yourdomain.com
```

## ⌨️ Keyboard Shortcuts

- `Alt + H` - Ana sayfa
- `Alt + A` - Hakkımda  
- `Alt + C` - İletişim
- `Ctrl + /` - Shortcut listesi
- `ESC` - Modal kapat

## 🎮 Easter Eggs

- **Konami Code**: ↑↑↓↓←→←→BA - Özel mod aktif edilir
- **Matrix Rain**: Scroll sırasında opacity değişir
- **Terminal Feedback**: Her etkileşimde terminal-style bildirimler

## 🛠️ Teknolojiler

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **Vanilla JavaScript** - ES6+ features
- **Canvas API** - Matrix rain animasyonu
- **Intersection Observer API** - Scroll animasyonları
- **Font Awesome** - İkonlar
- **Google Fonts** - Fira Code, JetBrains Mono

## 📊 Browser Support

- ✅ Chrome 88+
- ✅ Firefox 85+  
- ✅ Safari 14+
- ✅ Edge 88+
- ⚠️ IE 11 (Kısıtlı destek)

## 🔧 Geliştirme

### Dev Dependencies
```bash
# Code formatting
npm install -g prettier

# Live reload
npm install -g live-server
```

### VS Code Extensions
- Live Server
- Prettier
- Auto Rename Tag
- Bracket Pair Colorizer

## 📝 Lisans

MIT License - Detaylar için `LICENSE` dosyasını inceleyin.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit atın (`git commit -m 'Add some AmazingFeature'`)
4. Push yapın (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📞 Contact & Support

**Hıdır Samet Yalçınkaya**
- 🌐 Live Website: [sametyn558.github.io/WEB](https://sametyn558.github.io/WEB)
- 💼 LinkedIn: [linkedin.com/in/hidirsametyalcinkaya](https://linkedin.com/in/hidirsametyalcinkaya)
- 🐙 GitHub: [@sametyn558](https://github.com/sametyn558) | Main Profile: [@SametYalcinkaya](https://github.com/SametYalcinkaya)
- 📷 Instagram: [@sametyalcinkaya23](https://instagram.com/sametyalcinkaya23)
- 📧 Email: sametyn558@gmail.com | Alternative: hidirsametyalcinkaya@gmail.com

### 📚 Complete Documentation
- **PRD (Product Requirements Document):** [prd.md](prd.md) - Complete project requirements and implementation status
- **Usage Guide:** [kullanim-rehberi.md](kullanim-rehberi.md) - Site management and maintenance guide
- **Blog/Video Guide:** [BLOG-VIDEO-GUIDE.md](BLOG-VIDEO-GUIDE.md) - Content creation and management
- **Deployment Guide:** [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) - Setup and configuration instructions
- **Portfolio Building Guide:** [portfolio-building-guide.md](portfolio-building-guide.md) - Step-by-step portfolio creation tutorial
- **Components Summary:** [portfolio-components-summary.md](portfolio-components-summary.md) - Technical components overview
- **Customization Tutorial:** [customization-tutorial.md](customization-tutorial.md) - Personalization guide
- **Internship Diary:** [staj-defteri.md](staj-defteri.md) - 20-day detailed internship diary
- **Detailed Internship Diary:** [staj-defteri-detayli.md](staj-defteri-detayli.md) - Comprehensive 20-day internship diary with detailed explanations

---

⭐ Bu projeyi beğendiyseniz, lütfen bir yıldız verin!
