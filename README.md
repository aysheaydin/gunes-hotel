# 🏨 Güneş Hotel - Nemrut Dağı

> UNESCO Dünya Mirası Nemrut Dağı'na en yakın otel. Modern web teknolojileri ile geliştirilmiş rezervasyon ve tanıtım web sitesi.

## 📋 İçindekiler

- [Özellikler](#özellikler)
- [Teknoloji Stack](#teknoloji-stack)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [Environment Variables](#environment-variables)
- [Production Build](#production-build)

## ✨ Özellikler

### Frontend
- ✅ **Modern React 18.2** - Hooks, Functional Components
- ✅ **Çoklu Dil Desteği** - Türkçe, İngilizce, İtalyanca (i18next)
- ✅ **Progressive Web App (PWA)** - Offline çalışma desteği
- ✅ **SEO Optimizasyonu** - Meta tags, Structured data, Sitemap
- ✅ **Responsive Tasarım** - Mobil, tablet ve masaüstü uyumlu
- ✅ **Lazy Loading** - Code splitting ve performans optimizasyonu
- ✅ **Erişilebilirlik (A11y)** - WCAG 2.1 standartlarına uyumlu
- ✅ **Form Validasyonu** - React Hook Form ile güçlü doğrulama
- ✅ **Toast Bildirimleri** - Kullanıcı geri bildirimleri
- ✅ **WhatsApp Entegrasyonu** - Hızlı iletişim butonu
- ✅ **Image Optimization** - WebP formatı, lazy loading
- ✅ **Gzip & Brotli Compression** - Hızlı yükleme süreleri

### Backend (Planlanan)
- 🔄 **RESTful API** - Express.js
- 🔄 **MongoDB** - Veritabase yönetimi
- 🔄 **Email Service** - Nodemailer

## 🛠 Teknoloji Stack

### Frontend
- **Framework:** React 18.2
- **Build Tool:** Vite 5.0
- **Routing:** React Router v6
- **State Management:** React Hooks, Context API
- **Styling:** SCSS, Bootstrap 5.3
- **Forms:** React Hook Form
- **Internationalization:** i18next, react-i18next
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast
- **Animations:** AOS (Animate on Scroll)
- **PWA:** Vite Plugin PWA

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Email:** Nodemailer
- **Security:** Helmet, CORS, Express Rate Limit
- **Validation:** Express Validator
- **Logging:** Winston, Morgan

### DevOps
- **Version Control:** Git
- **Package Manager:** npm
- **Linting:** ESLint
- **Code Formatting:** Built-in

## 📦 Kurulum

### Gereksinimler

- Node.js 18.0 veya üzeri
- npm 9.0 veya üzeri
- MongoDB 6.0 veya üzeri (backend için)

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/your-username/gunes-hotel.git
cd gunes-hotel
```

### 2. Client Kurulumu

```bash
cd client
npm install

# .env dosyasını oluşturun (gerekirse)
# VITE_API_URL değişkenini ayarlayın

# Geliştirme sunucusunu başlatın
npm run dev
```

Client şimdi http://localhost:5173 adresinde çalışıyor.

### 3. Server Kurulumu (İlerleyen aşamada)

```bash
cd server
npm install

# .env dosyasını oluşturun
cp .env.example .env

# MongoDB bağlantı bilgilerini ve email ayarlarını .env'de yapılandırın

# Geliştirme sunucusunu başlatın
npm run dev
```

Server şimdi http://localhost:5000 adresinde çalışıyor.

## 🚀 Kullanım

### Geliştirme Modu

```bash
cd client
npm run dev
```

### Production Build

```bash
cd client
npm run build

# Build önizleme
npm run preview
```

### Linting

```bash
cd client
npm run lint
npm run lint:fix
```

## 🔐 Environment Variables

### Client (.env.example)

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
```

Eğer API URL'nizi değiştirmek isterseniz, `.env.example` dosyasını `.env` olarak kopyalayıp düzenleyin.

## 📦 Production Build & Deployment

### Build

```bash
cd client
npm run build
```

Build dosyaları `client/dist` klasöründe oluşturulacak.

### Deployment Seçenekleri

#### 1. Vercel (Önerilen)
- Vercel hesabınıza GitHub repo'nuzı bağlayın
- Otomatik deployment yapılacak
- Environment variables'ı Vercel dashboard'dan ekleyin

#### 2. Netlify
```bash
cd client
npm run build
netlify deploy --prod --dir=dist
```

#### 3. Statik Hosting (Apache/Nginx)
- `client/dist` klasörünü sunucunuza yükleyin
- SPA routing için yönlendirme yapılandırın

## 📊 Performans

- **Lighthouse Score:** 95+ 
- **First Contentful Paint:** < 1.5s
- **Total Bundle Size:** < 300KB (gzipped)
- **PWA:** Offline çalışma desteği

## 🌍 Browser Support

- Chrome, Firefox, Safari, Edge (son 2 versiyon)
- iOS Safari 12+
- Android Chrome 90+

## 👥 İletişim

**Güneş Hotel**
- 📍 Büyüköz Köyü, Pütürge/Malatya
- 📞 +90 543 876 7271 / +90 536 287 0639
- 📧 gunesmotel@hotmail.com
- 🌐 https://www.nemrutgunesmotel.com

---

**Nemrut Dağı'nın büyüleyici atmosferinde sizleri ağırlamaktan mutluluk duyarız! 🏔️**
