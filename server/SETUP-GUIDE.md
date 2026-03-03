# 🚀 Backend Kurulum ve Test Rehberi

## Hızlı Başlangıç

### 1️⃣ Environment Dosyasını Oluşturun

```bash
cd server
cp .env.example .env
```

### 2️⃣ SMTP Ayarlarını Yapın

**.env dosyasını açın ve düzenleyin:**

#### 🔐 Gmail ile Test (Önerilen):

1. Google Hesap → Güvenlik → 2-Factor Authentication'ı açın
2. "App Passwords" oluşturun
3. `.env` dosyasını güncelleyin:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # App password
EMAIL_FROM="Güneş Hotel <noreply@guneshotel.com>"

RESERVATION_EMAIL=gunesmotel@hotmail.com
CONTACT_EMAIL=gunesmotel@hotmail.com
```

#### 📧 Hotmail/Outlook ile:

```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=gunesmotel@hotmail.com
EMAIL_PASSWORD=your-password
```

### 3️⃣ Sunucuyu Başlatın ve Test Edin

```bash
npm run dev
```

**Başarılı ise görmelisiniz:**
```
🚀 Server running on port 5000 in development mode
📧 Email configured for: Güneş Hotel <noreply@guneshotel.com>
✅ SMTP server ready to send emails
```

> **Not:** "SMTP connection failed" hatası normal (gerçek email ayarları yapılmamış)

---

## 🧪 Test Etme

### API Test 1: Health Check

**Windows PowerShell:**
```powershell
Invoke-RestMethod -Uri http://localhost:5000/health -Method Get
```

**cURL:**
```bash
curl http://localhost:5000/health
```

**Beklenen Sonuç:**
```json
{
  "status": "ok",
  "timestamp": "2024-03-03...",
  "environment": "development"
}
```

---

### API Test 2: Rezervasyon Oluştur (EMAIL TEST)

> **⚠️ Not:** Bu test gerçek email gönderir! SMTP ayarlarınız doğruysa hem otele hem müşteriye mail gidecek.

**PowerShell:**
```powershell
$body = @{
    fullName = "Test Kullanıcı"
    email = "test@example.com"
    phone = "+90 555 123 4567"
    checkIn = "2026-06-15"
    checkOut = "2026-06-20"
    guests = 2
    roomType = "Deluxe"
    message = "Test rezervasyonu"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:5000/api/reservations -Method Post -Body $body -ContentType "application/json"
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test Kullanıcı",
    "email": "test@example.com",
    "phone": "+90 555 123 4567",
    "checkIn": "2026-06-15",
    "checkOut": "2026-06-20",
    "guests": 2,
    "roomType": "Deluxe",
    "message": "Test rezervasyonu"
  }'
```

**Beklenen Sonuç:**
```json
{
  "success": true,
  "message": "Rezervasyon talebiniz başarıyla alındı. En kısa sürede size dönüş yapılacaktır.",
  "data": {
    "checkIn": "2026-06-15T00:00:00.000Z",
    "checkOut": "2026-06-20T00:00:00.000Z",
    "guests": 2,
    "status": "pending"
  }
}
```

**Email Kontrolü:**
✅ `gunesmotel@hotmail.com` adresine detaylı rezervasyon maili gelmeli
✅ `test@example.com` adresine otomatik onay maili gelmeli

---

### API Test 3: İletişim Formu

**PowerShell:**
```powershell
$body = @{
    fullName = "Ayşe Yılmaz"
    email = "ayse@example.com"
    phone = "+90 555 987 6543"
    subject = "Fiyat Bilgisi"
    message = "Haziran ayı için oda fiyatları nedir?"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:5000/api/contact -Method Post -Body $body -ContentType "application/json"
```

---

### API Test 4: Logları İzleme

**Terminal'de (dev mode):**
Loglar otomatik olarak görünür.

**Log dosyalarını okuma:**
```bash
# Tüm loglar
cat logs/all.log

# Sadece hatalar
cat logs/error.log
```

**Windows PowerShell:**
```powershell
Get-Content logs\all.log -Tail 20
Get-Content logs\error.log -Wait  # Canlı izleme
```

---

## ❌ Yaygın Hatalar ve Çözümleri

### 1. "SMTP connection failed"
- `.env` dosyasındaki email bilgilerini kontrol edin
- Gmail için "App Password" kullandığınızdan emin olun
- Port 587 açık olmalı (firewall kontrolü)
- Email host doğru mu? (smtp.gmail.com veya smtp-mail.outlook.com)

### 2. "Email gönderilemedi"
- SMTP ayarları doğru mu?
- İnternet bağlantınız var mı?
- Firewall SMTP port'unu (587) engelliyor olabilir

### 3. "Rate limit exceeded"
- 15 dakika bekleyin veya
- `.env` dosyasında `NODE_ENV=development` olduğundan emin olun

### 4. "Validation error"
- Gönderdiğiniz JSON formatını kontrol edin
- Tüm gerekli alanlar dolu mu?
- Tarihler ISO format'ında mı? (YYYY-MM-DD)
- Tarihler gelecekte mi? (geçmiş tarih gönderilemez)

---

## 🔗 Frontend ile Bağlantı

Client tarafında `.env` dosyası:

```env
# client/.env
VITE_API_URL=http://localhost:5000/api
```

**Vite dev server CORS fix (development):**
Backend otomatik olarak `http://localhost:5173` için CORS aktif.

**Production'da:**
```env
# server/.env
CORS_ORIGIN=https://gunes-otel.com
```

---

## 📦 Production Deployment

### 1. Environment Variables
```env
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://gunes-otel.com

# Gerçek SMTP bilgileri
EMAIL_HOST=smtp.yourdomain.com
EMAIL_USER=noreply@guneshotel.com
EMAIL_PASSWORD=strong-password
```

### 2. PM2 ile Başlatma
```bash
npm install -g pm2
pm2 start src/app.js --name gunes-hotel-api
pm2 startup
pm2 save
```

### 3. Nginx Reverse Proxy
```nginx
location /api {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

---

## ✅ Başarı Kriterleri

- [x] Server `localhost:5000` üzerinde çalışıyor
- [x] SMTP bağlantısı aktif
- [x] POST /api/reservations çalışıyor
- [x] Email gönderimi başarılı (hem otele, hem müşteriye)
- [x] Rate limiting aktif
- [x] Validation çalışıyor
- [x] Loglar kaydediliyor

**Veritabanı yok, sadece mail gönderimi var!** 🎉

---

## 🆘 Sorun mu Yaşıyorsunuz?

1. Logları kontrol edin: `logs/error.log`
2. Environment variables'ı doğrulayın
3. SMTP bağlantısını test edin
4. Port 5000'in açık olduğundan emin olun

**Hala sorun varsa:**
- Logları paylaşın
- `.env` dosyanızı (şifreler hariç) kontrol edin
- SMTP ayarlarınızı doğrulayın
