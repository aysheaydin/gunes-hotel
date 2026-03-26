#!/bin/bash

echo "🔒 GÜNEŞ HOTEL - ACİL GÜVENLİK FİX"
echo "=================================="
echo ""

# 1. GIT HISTORY'DEN .env SİL
echo "1️⃣ Git history'den .env dosyası siliniyor..."
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch server/.env" \
  --prune-empty --tag-name-filter cat -- --all

# 2. FORCE PUSH (DİKKAT: Collaboration varsa takım arkadaşlarını uyar!)
echo "2️⃣ Git force push yapılıyor..."
git push origin --force --all
git push origin --force --tags

# 3. YENİ CSRF SECRET OLUŞTUR
echo ""
echo "3️⃣ Yeni CSRF secret oluşturuluyor..."
NEW_CSRF_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")
echo "Yeni CSRF_SECRET: $NEW_CSRF_SECRET"

# 4. server/.env dosyasını güncelle
echo ""
echo "4️⃣ .env dosyası güncelleniyor..."
sed -i "s/CSRF_SECRET=.*/CSRF_SECRET=$NEW_CSRF_SECRET/" server/.env

echo ""
echo "✅ Git history temizlendi!"
echo ""
echo "📋 ŞİMDİ YAPMANIZ GEREKENLER:"
echo ""
echo "1. Gmail'de App Password'ü SİL ve YENİSİNİ OLUŞTUR:"
echo "   https://myaccount.google.com/apppasswords"
echo ""
echo "2. server/.env dosyasında EMAIL_PASSWORD'ü güncelle:"
echo "   EMAIL_PASSWORD=<yeni-app-password>"
echo ""
echo "3. Repository'yi PRIVATE yap (public ise):"
echo "   GitHub → Settings → Danger Zone → Change visibility"
echo ""
echo "4. GitHub Secrets ekle (Production için):"
echo "   Repository → Settings → Secrets → Actions"
echo "   - EMAIL_PASSWORD"
echo "   - CSRF_SECRET"
echo ""
echo "5. Takım arkadaşlarına git pull --force yaptır:"
echo "   git fetch --all"
echo "   git reset --hard origin/main"
echo ""
echo "⚠️  DİKKAT: Force push yapıldı. Tüm collaborators'a haber verin!"
