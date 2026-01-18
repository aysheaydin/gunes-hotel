# Nemrut Dağı Oteli - Güneş Hotel

⭐ **UNESCO Dünya Mirası Nemrut Dağı'na en yakın otel (2 km mesafede)**

## 🎯 Canlıya Alma Rehberi

### Ön Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Kurulum

```bash
cd client
npm install
```

### Build (Canlı için)

```bash
npm run build
```

Build klasörü `client/build/` altında oluşacaktır.

### Canlıya Alma Adımları

#### 1. Domain ve Hosting Ayarları

**Domain:** `www.nemrutgunesmotel.com`

**DNS Ayarları:**
```
A Record: @ -> Hosting IP
CNAME: www -> nemrutgunesmotel.com
```

#### 2. Hosting'e Yükleme

**Tüm dosyaları `client/build/` klasöründen hosting'in public_html veya www dizinine yükleyin.**

#### 3. .htaccess Dosyası (Apache için)

Hosting'in root dizinine aşağıdaki `.htaccess` dosyasını ekleyin:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # HTTPS yönlendirmesi
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  
  # www yönlendirmesi
  RewriteCond %{HTTP_HOST} !^www\. [NC]
  RewriteRule ^(.*)$ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  
  # React Router için SPA yönlendirmesi
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  
  # Görseller - 1 yıl
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  
  # CSS ve JavaScript - 1 ay
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  
  # HTML - 1 saat
  ExpiresByType text/html "access plus 1 hour"
  
  # Fonts - 1 yıl
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType application/font-woff "access plus 1 year"
  ExpiresByType application/font-woff2 "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  # Preload & DNS prefetch
  Header set Link "</img/slide-1.webp>; rel=preload; as=image"
  
  # Security
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  
  # CORS for fonts
  <FilesMatch "\.(ttf|otf|eot|woff|woff2)$">
    Header set Access-Control-Allow-Origin "*"
  </FilesMatch>
</IfModule>
```

#### 4. Google Search Console Kaydı

1. [Google Search Console](https://search.google.com/search-console) hesabınıza giriş yapın
2. "Mülk Ekle" -> "URL Öneki" -> `https://www.nemrutgunesmotel.com` girin
3. Doğrulama için HTML dosyası yükleyin veya DNS kayıt ekleyin
4. Sitemap gönder: `https://www.nemrutgunesmotel.com/sitemap.xml`

#### 5. Google Analytics Kurulumu

`client/index.html` dosyasına, `</head>` etiketinden önce:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### 6. Google Business Profile (Yerel SEO)

**Çok Önemli!** Google Maps'te yerinizi kaydedin:

1. [Google Business Profile](https://business.google.com) açın
2. "İşletme Ekle" butonuna tıklayın
3. İşletme bilgilerini girin:
   - **İşletme Adı:** Güneş Hotel - Nemrut Dağı Oteli
   - **Kategori:** Otel
   - **Adres:** Büyüköz, Nemrut Dağı Yolu, Pütürge, Malatya
   - **Telefon:** +90 543 876 7271
   - **Web sitesi:** https://www.nemrutgunesmotel.com
   - **Koordinatlar:** 37.9853, 38.7429

4. Fotoğraflar ekleyin (en az 10 adet):
   - Otel dış görünüm
   - Odalar
   - Nemrut Dağı manzarası
   - Kahvaltı
   - Restorant

5. İşletme saatleri: 7/24 açık olarak işaretleyin

#### 7. Schema Markup Testi

Canlıya aldıktan sonra:
- [Google Rich Results Test](https://search.google.com/test/rich-results) ile test edin
- URL: `https://www.nemrutgunesmotel.com` girin
- Hotel schema, BreadcrumbList, FAQPage görünmeli

#### 8. PageSpeed Insights Kontrolü

- [PageSpeed Insights](https://pagespeed.web.dev/) açın
- URL girin ve test edin
- **Hedef skorlar:**
  - Mobile: 85+
  - Desktop: 95+
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

## 🔍 SEO Kontrol Listesi (Canlıya Aldıktan Sonra)

### Teknik SEO
- ✅ sitemap.xml erişilebilir mi? → `/sitemap.xml`
- ✅ robots.txt erişilebilir mi? → `/robots.txt`
- ✅ HTTPS çalışıyor mu?
- ✅ www yönlendirmesi çalışıyor mu?
- ✅ 404 sayfası çalışıyor mu?
- ✅ Tüm sayfalar indexlenebilir mi? (robots meta tag kontrolü)

### Schema Markup
- ✅ Hotel schema var mı?
- ✅ LocalBusiness schema var mı?
- ✅ BreadcrumbList çalışıyor mu?
- ✅ FAQPage schema var mı?
- ✅ Review/Rating schema var mı?

### Performans
- ✅ Gzip/Brotli compression aktif mi?
- ✅ Browser caching aktif mi?
- ✅ Görseller WebP formatında mı?
- ✅ Lazy loading çalışıyor mu?
- ✅ CDN kullanılıyor mu? (opsiyonel)

### Yerel SEO
- ✅ Google Business Profile oluşturuldu mu?
- ✅ Google Maps'te görünüyor mu?
- ✅ Telefon numarası doğru mu?
- ✅ Adres bilgileri doğru mu?
- ✅ Fotoğraflar yüklendi mi?

### İçerik SEO
- ✅ Tüm sayfalarda unique title var mı?
- ✅ Tüm sayfalarda unique meta description var mı?
- ✅ H1 tagları optimize mi?
- ✅ Alt tagları dolu mu?
- ✅ Internal linkler çalışıyor mu?

## 📱 Sosyal Medya

Aşağıdaki platformlarda profil oluşturun ve web sitesi linkini ekleyin:

1. **Facebook:** facebook.com/nemrutguneshotel
2. **Instagram:** instagram.com/nemrutguneshotel  
3. **TripAdvisor:** İşletme kaydı yapın
4. **Booking.com / Agoda:** OTA entegrasyonları

## 🎯 İlk Ay Yapılacaklar

### 1. Google Indexleme
- Google Search Console'da tüm önemli sayfaları manuel index isteği gönderin
- Özellikle:
  - Ana sayfa
  - Nemrut Dağı Oteli sayfası
  - Nemrut Dağı Konaklama rehberi
  - Gün doğumu turu sayfası
  - Odalar sayfası

### 2. Backlink Çalışması
- Yerel turizm sitelerine kayıt
- Adıyaman/Malatya turizm portallarına kayıt
- Nemrut Dağı rehber sitelerine kayıt
- Blog yazıları ile içerik pazarlama

### 3. Yerel Dizinler
- Yandex Haritalar
- Foursquare
- Yelp (uluslararası turistler için)
- TripAdvisor

### 4. İçerik Üretimi
Her hafta 1 blog yazısı:
- "Nemrut Dağı'na Nasıl Gidilir"
- "Nemrut Dağı Tarihi"
- "Malatya Pütürge Gezilecek Yerler"
- "Nemrut Gün Doğumu Fotoğrafları"

## 📊 Performans Takibi

### Aylık Kontrol
- Google Search Console → Hangi kelimeler trafik getiriyor?
- Google Analytics → Hangi sayfalar en çok ziyaret ediliyor?
- PageSpeed Insights → Performans düştü mü?
- Google Business Profile → Kaç arama, kaç tıklama?

### Hedef Metrikler (3 ay sonra)
- **"nemrut dağı oteli"** → İlk 3'te
- **"nemrut konaklama"** → İlk 5'te
- **"nemrut dağı nerede kalınır"** → İlk 5'te
- **"nemrut gün doğumu"** → İlk 10'da
- Organik trafik: 500+ ziyaretçi/ay

## 🚨 Önemli Notlar

1. **SSL Sertifikası:** Let's Encrypt ücretsiz SSL kullanılabilir
2. **Yedekleme:** Hosting otomatik yedekleme yapıyor mu kontrol edin
3. **E-posta:** info@nemrutgunesmotel.com mail hesabı aktif mi?
4. **Telefon:** +90 543 876 7271 numarası aktif ve WhatsApp'ta kayıtlı mı?
5. **İçerik:** Fiyatları düzenli güncelleyin (sezonluk)

## 📞 Destek

Herhangi bir sorun olursa:
- Google Search Console'dan hata kontrolü yapın
- PageSpeed Insights ile performans ölçün
- Browser'ın Developer Tools > Console'da hata var mı bakın

---

**✅ Canlıya alma tamamlandı! Başarılar dileriz! 🎉**
