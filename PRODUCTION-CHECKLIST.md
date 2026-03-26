# 🚀 Production Checklist - Güneş Hotel

## ✅ Tamamlanan Hazırlıklar

### 1. Multi-Language Desteği ✅
- [x] Tüm sayfalar TR/EN/IT dillerinde
- [x] Otomatik tarayıcı dili algılama aktif
- [x] SEO meta tags 3 dilde
- [x] Smart Translation: Kritik UI elementleri çevrilmiş

### 2. Build Başarılı ✅
- [x] `npm run build` başarıyla tamamlandı
- [x] Gzip compression (.gz dosyalar oluşturuldu)
- [x] Brotli compression (.br dosyalar oluşturuldu)
- [x] PWA Service Worker oluşturuldu
- [x] 35 dosya precache edildi (874 KB)

### 3. SEO Optimizasyonu ✅
- [x] sitemap.xml mevcut
- [x] robots.txt yapılandırıldı
- [x] Meta tags tüm sayfalarda
- [x] Structured Data (JSON-LD) eklendi
- [x] Canonical URLs tanımlı

### 4. Güvenlik ✅
- [x] Helmet.js güvenlik headers
- [x] CSRF koruması
- [x] XSS koruması (DOMPurify)
- [x] SQL injection koruması
- [x] Rate limiting yapılandırıldı
- [x] CORS ayarları hazır
- [x] HPP (HTTP Parameter Pollution) koruması

### 5. Performance ✅
- [x] Lazy loading (görseller + route)
- [x] Code splitting
- [x] Gzip/Brotli compression
- [x] CDN'den yüklenen kaynaklar cache'leniyor
- [x] PWA (Progressive Web App) desteği
- [x] Service Worker ile offline çalışma

---

## 🔧 Production'a Geçiş Adımları

### ADIM 1: Environment Variables Ayarla

#### Client (.env)
`client/.env` dosyası oluştur:

```env
# API Configuration
VITE_API_URL=https://yourserver.com/api

# App Configuration
VITE_APP_NAME=Güneş Hotel
VITE_APP_URL=https://www.nemrutgunesmotel.com

# Contact Information
VITE_PHONE_1=+905438767271
VITE_PHONE_2=+905362870639
VITE_EMAIL=gunesmotel@hotmail.com
VITE_WHATSAPP=+905438767271

# Analytics (İsteğe bağlı - Google Analytics eklenebilir)
# VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X
```

#### Server (.env)
`server/.env` dosyası oluştur:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Security (ÖNEMLİ: Güçlü bir secret kullanın!)
CSRF_SECRET=xxxxxxx-değiştir-güçlü-random-string-xxxxxxx

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=gunesmotel@hotmail.com
EMAIL_PASSWORD=xxxx-app-specific-password-xxxx
EMAIL_FROM="Güneş Hotel <gunesmotel@hotmail.com>"

# Receiver Emails
CONTACT_EMAIL=gunesmotel@hotmail.com
RESERVATION_EMAIL=gunesmotel@hotmail.com

# CORS (Production domain)
CORS_ORIGIN=https://www.nemrutgunesmotel.com,https://nemrutgunesmotel.com

# Rate Limiting (Ayarları kontrol edin)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
```

---

### ADIM 2: Gmail App Password Oluştur

Email gönderimleri için Gmail App Password gerekli:

1. Google hesabına giriş yap
2. https://myaccount.google.com/security
3. "2-Step Verification" aktif olmalı
4. "App passwords" bölümüne git
5. "Mail" için yeni app password oluştur
6. Oluşturulan şifreyi `.env` dosyasındaki `EMAIL_PASSWORD` kısmına yapıştır

---

### ADIM 3: Build Al

```bash
cd client
npm run build
```

Build dosyaları `client/build/` klasörüne oluşacak.

---

### ADIM 4: Server Kurulumu

#### A. Shared Hosting (cPanel, Plesk)

**1. Client dosyalarını yükle:**
- `client/build/` klasöründeki TÜM dosyaları hosting'in `public_html` veya `www` dizinine yükle
- `.htaccess` dosyasını ekle (aşağıda)

**2. .htaccess dosyası oluştur:**

`public_html/.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # HTTPS yönlendirmesi
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  
  # www olmadan www'ye yönlendir (veya tersi)
  RewriteCond %{HTTP_HOST} !^www\. [NC]
  RewriteRule ^(.*)$ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  
  # React Router için - tüm istekleri index.html'e yönlendir
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Gzip Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType image/x-icon "access plus 1 year"
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

**3. Backend API'yi ayrı port'ta çalıştır:**

Shared hosting'de Node.js uygulaması çalıştırmak için:
- cPanel'de "Setup Node.js App" bölümüne git
- Node.js versiyonu: 18+
- Application root: `server/`
- Application URL: `/api`
- Application startup file: `src/app.js`
- "Create" tıkla

Veya VPS kullanıyorsanız PM2 ile:

```bash
cd server
npm install --production
pm2 start src/app.js --name gunes-hotel-api
pm2 save
pm2 startup
```

#### B. VPS/Cloud Server (Nginx + PM2)

**1. Nginx yapılandırması:**

`/etc/nginx/sites-available/guneshotel`:

```nginx
server {
    listen 80;
    server_name www.nemrutgunesmotel.com nemrutgunesmotel.com;
    return 301 https://www.nemrutgunesmotel.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.nemrutgunesmotel.com;

    # SSL Sertifikaları (Let's Encrypt önerilir)
    ssl_certificate /etc/letsencrypt/live/nemrutgunesmotel.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/nemrutgunesmotel.com/privkey.pem;

    root /var/www/guneshotel/build;
    index index.html;

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;

    # React Router - SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API Proxy
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|webp|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

**2. PM2 ile backend başlat:**

```bash
cd /var/www/guneshotel/server
npm install --production
pm2 start src/app.js --name gunes-hotel-api
pm2 save
pm2 startup
```

**3. SSL Sertifikası (Let's Encrypt):**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d nemrutgunesmotel.com -d www.nemrutgunesmotel.com
```

---

### ADIM 5: DNS Ayarları

Domain sağlayıcınızda (GoDaddy, Namecheap vs.):

```
A Record:
@ -> Server IP Adresi
www -> Server IP Adresi

veya CNAME:
www -> nemrutgunesmotel.com
```

---

### ADIM 6: Son Testler

#### ✅ Kontrol Listesi:

1. **Sayfa açılışları:**
   - [ ] Ana sayfa yükleniyor mu?
   - [ ] Tüm alt sayfalar çalışıyor mu?
   - [ ] Dil değiştirme çalışıyor mu?

2. **Formlar:**
   - [ ] İletişim formu email gönderiyor mu?
   - [ ] Rezervasyon formu çalışıyor mu?
   - [ ] Hata mesajları görünüyor mu?

3. **SEO:**
   - [ ] https://www.nemrutgunesmotel.com/sitemap.xml açılıyor mu?
   - [ ] https://www.nemrutgunesmotel.com/robots.txt görünüyor mu?
   - [ ] Google Search Console'a sitemap eklenmiş mi?

4. **Görsel kontrol:**
   - [ ] Görseller yükleniyor mu?
   - [ ] Mobil uyumluluk tamam mı?
   - [ ] Farklı tarayıcılarda test edildi mi? (Chrome, Firefox, Safari)

5. **Performance:**
   - [ ] https://pagespeed.web.dev/ ile test et (hedef: 90+)
   - [ ] GTmetrix ile test et

6. **SSL:**
   - [ ] HTTPS çalışıyor mu?
   - [ ] HTTP otomatik HTTPS'e yönleniyor mu?
   - [ ] SSL sertifikası geçerli mi?

---

## 🔒 Güvenlik Önerileri

### 1. Email Güvenliği
- Gmail App Password kullanın (normal şifre değil!)
- `.env` dosyası asla git'e commit edilmemeli (`client/.env` ve `server/.env`)
- Hassas bilgiler environment variable'larda

### 2. Rate Limiting
- Brute force saldırılarına karşı korumalı
- Contact form: 5 istek / 15 dakika
- API genel: 100 istek / 15 dakika

### 3. CORS
- Sadece kendi domain'inize izin verin
- Production'da `CORS_ORIGIN=https://www.nemrutgunesmotel.com`

### 4. Firewall
- Sadece 80 (HTTP) ve 443 (HTTPS) portları açık olmalı
- API backend'e direk erişim olmamalı (nginx proxy ile)

---

## 📊 Monitoring & Analytics

### Google Analytics Ekleme (İsteğe Bağlı)

1. Google Analytics hesabı oluştur
2. Tracking ID al (örn: UA-XXXXXXXXX-X veya G-XXXXXXXXXX)
3. `client/.env` dosyasına ekle:
   ```
   VITE_GA_TRACKING_ID=G-XXXXXXXXXX
   ```
4. `client/index.html` head kısmına:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

### Google Search Console

1. https://search.google.com/search-console
2. Property ekle: `www.nemrutgunesmotel.com`
3. Domain doğrulama yap
4. Sitemap gönder: `https://www.nemrutgunesmotel.com/sitemap.xml`

---

## ⚡ Performance İpuçları

### CDN Kullanımı
- Cloudflare ücretsiz CDN hizmeti sunuyor
- Görseller ve static dosyalar için CDN kullan
- DDoS koruması ve cache için ideal

### Database (Gelecek için)
- Şu an database kullanılmıyor ✅
- Rezervasyon kayıtları için gelecekte MongoDB veya PostgreSQL eklenebilir

### Backup Stratejisi
- Haftalık server backup
- Database backup (eklenirse)
- Git repository her zaman güncel tutun

---

## 🐛 Sorun Giderme

### "Sayfa yüklenmiyor"
- Nginx/Apache restart: `sudo systemctl restart nginx`
- .htaccess dosyası doğru mu?
- DNS propagation bekleyin (24-48 saat)

### "Email gönderilmiyor"
- Gmail App Password doğru mu?
- `.env` dosyası server'da mı?
- Server logs kontrol: `pm2 logs gunes-hotel-api`

### "API çalışmıyor"
- Backend çalışıyor mu?: `pm2 status`
- CORS_ORIGIN doğru mu?
- Firewall port 5000'i block ediyor olabilir

### "HTTPS çalışmıyor"
- SSL sertifikası kurulu mu?: `sudo certbot certificates`
- Nginx config doğru mu?: `sudo nginx -t`
- Port 443 açık mı?: `sudo netstat -tulpn | grep 443`

---

## ✅ Deployment Tamamlandı!

Tüm adımları tamamladıysanız siteniz canlıda! 🎉

**Test URL:** https://www.nemrutgunesmotel.com

**Destek:**
- Email: gunesmotel@hotmail.com
- Telefon: +90 543 876 7271

---

**Not:** Bu checklist, güvenli ve profesyonel bir production deployment için gerekli tüm adımları içermektedir. Her adımı dikkatlice takip edin.
