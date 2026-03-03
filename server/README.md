# Güneş Hotel - Backend API

Express.js tabanlı otel rezervasyon ve iletişim formu API'si. **Sadece SMTP email gönderimi** ile çalışır, veritabanı gerektirmez.

## 🚀 Özellikler

- 📧 **Çift Email Gönderimi:**
  - Otele: Detaylı rezervasyon bilgileri (Reply-To: müşteri)
  - Müşteriye: Otomatik onay maili
- 🛡️ **Güvenlik:** Helmet, Rate Limiting, Input Validation, XSS koruması
- 📝 **Logging:** Winston ile tüm işlemler loglanır
- 🔍 **Form Validasyonu:** express-validator
- ⚡ **Hafif ve Hızlı:** Veritabanı yok, sadece mail servisi

## 📋 Gereksinimler

- Node.js >= 18.0.0
- SMTP mail hesabı (Gmail, Hotmail, veya kendi domain mailiniz)

## 🔧 Kurulum

### 1. Bağımlılıkları Yükleyin

```bash
cd server
npm install
```

### 2. Environment Variables (.env dosyası)

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:

```env
# Server
PORT=5000
NODE_ENV=development

# SMTP Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM="Güneş Hotel <noreply@guneshotel.com>"

# Receiver Emails
RESERVATION_EMAIL=gunesmotel@hotmail.com
CONTACT_EMAIL=gunesmotel@hotmail.com

# CORS
CORS_ORIGIN=http://localhost:5173
```

### 3. SMTP Yapılandırması

#### Gmail için:
1. Google Hesap Ayarları → Güvenlik
2. 2-Step Verification'ı aktif edin
3. "App Passwords" oluşturun
4. Oluşan şifreyi `.env` dosyasına ekleyin

#### Hotmail/Outlook için:
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=gunesmotel@hotmail.com
EMAIL_PASSWORD=your-password
```

#### cPanel/Plesk (Kendi Domain) için:
```env
EMAIL_HOST=mail.yourdomain.com
EMAIL_PORT=587
EMAIL_USER=rezervasyon@guneshotel.com
EMAIL_PASSWORD=your-mail-password
```

### 4. Sunucuyu Başlatın
2. Cluster oluşturun
3. Connection string'i alın
4. `.env` dosyasına ekleyin:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gunes-hotel
```

### 5. Sunucuyu Başlatın

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server: `http://localhost:5000`

## 📡 API Endpoints

### Health Check
```
GET /health
```

### Rezervasyon

**Yeni Rezervasyon Oluştur (2 Email Gönderir):**
```
POST /api/reservations
Content-Type: application/json

{
  "fullName": "Ahmet Yılmaz",
  "email": "ahmet@example.com",
  "phone": "+90 555 123 4567",
  "checkIn": "2024-06-15",
  "checkOut": "2024-06-20",
  "guests": 2,
  "roomType": "Deluxe",
  "message": "Deniz manzaralı oda istiyorum"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Rezervasyon talebiniz başarıyla alındı...",
  "data": {
    "checkIn": "2024-06-15",
    "checkOut": "2024-06-20",
    "guests": 2,
    "status": "pending"
  }
}
```

### İletişim Formu

**Mesaj Gönder:**
```
POST /api/contact
Content-Type: application/json

{
  "fullName": "Ayşe Demir",
  "email": "ayse@example.com",
  "phone": "+90 555 987 6543",
  "subject": "Fiyat Bilgisi",
  "message": "Haziran ayı için oda fiyatları nedir?"
}
```

## 🔒 Güvenlik Özellikleri

### Rate Limiting
- Rezervasyon: 15 dakikada 3 istek/IP
- İletişim: 10 dakikada 5 istek/IP

### Input Validation
- Email formatı kontrol
- XSS injection koruması
- Tarih validasyonu
- String length kontrolü

### Email Güvenliği
- **From:** Daima otel domaini (`noreply@guneshotel.com`)
- **Reply-To:** Müşteri email'i (otel yanıtlayınca müşteriye gider)
- HTML injection koruması
- SMTP TLS/SSL güvenliği

## 📧 Email Flow

1. **Müşteri formu doldurur**
2. **Backend validasyon yapar**
3. **MongoDB'ye kaydeder**
4. **2 email gönderir (paralel):**
   - **Otele:** Detaylı rezervasyon bilgileri + Reply-To: müşteri
   - **Müşteriye:** "Talebiniz alındı" onay maili
5. **Response döner**

## 🗂️ Klasör Yapısı

```
server/
```
server/
├── src/
│   ├── app.js                 # Ana application
│   ├── config/
│   │   └── email.js           # SMTP configuration
│   ├── controllers/
│   │   ├── reservationController.js
│   │   └── contactController.js
│   ├── middleware/
│   │   ├── errorHandler.js    # Global error handler
│   │   ├── rateLimiter.js     # Rate limiting
│   │   └── validator.js       # Input validation
│   ├── routes/
│   │   ├── reservation.js
│   │   └── contact.js
│   ├── services/
│   │   └── emailService.js    # Email templates & sending
│   └── utils/
│       └── logger.js          # Winston logger
├── logs/                      # Log dosyaları
├── .env                       # Environment variables
├── .env.example
└── package.json
```

## 🐛 Hata Ayıklama

### Email Gönderilmiyor:
Logları kontrol edin:
```bash
cat logs/error.log
cat logs/all.log
```

SMTP ayarlarını kontrol edin (.env dosyası):
- EMAIL_HOST doğru mu?
- EMAIL_PORT açık mı? (genelde 587)
- EMAIL_USER ve EMAIL_PASSWORD doğru mu?
- Gmail için "App Password" kullanıyor musunuz?

### Rate Limit Hatası:
Development'ta IP kontrolünü devre dışı bırakmak için:
```env
NODE_ENV=development
```

## 🚀 Production Önerileri

1. **Environment Variables:**
Development'ta IP kontrolünü devre dışı bırakmak için:
```env
NODE_ENV=development
```

## 🚀 Production Önerileri

1. **Environment Variables:**
   - NODE_ENV=production
   - Güçlü şifreler kullanın
   - Hassas bilgileri .env'de tutun

2. **SMTP:**
   - Kendi domain'inizden email gönderin (örn: noreply@guneshotel.com)
   - SPF, DKIM, DMARC kayıtlarını ekleyin
   - SSL/TLS kullanın (port 465 veya 587)

3. **Security:**
   - HTTPS kullanın
   - Rate limiting aktif tutun
   - Logs'ları monitör edin
   - Firewall ayarlarını yapın

4. **Performance:**
   - PM2 ile çalıştırın (process manager)
   - Nginx reverse proxy
   - Compression aktif (zaten var)

## 📊 Monitoring

**Logs:**
```bash
# Tüm loglar
tail -f logs/all.log

# Sadece hatalar
tail -f logs/error.log
```

**PM2 (Production):**
```bash
pm2 start src/app.js --name gunes-hotel-api
pm2 logs gunes-hotel-api
pm2 monit
```

## 🤝 Destek

Sorunlar için: gunesmotel@hotmail.com

## 📄 Lisans

MIT License
