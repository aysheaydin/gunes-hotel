import transporter from '../config/email.js';
import { logger } from '../utils/logger.js';
import { sanitizeForEmail, sanitizeEmail } from '../utils/sanitizer.js';

/**
 * Email Service
 * Handles all email communications with comprehensive sanitization
 * Protects against:
 * - Email Header Injection
 * - XSS in email templates
 * - HTML injection
 * 
 * 1. Hotel notification emails (reservation details)
 * 2. Customer confirmation emails (auto-reply)
 */

// Email template for HOTEL - Detailed reservation info
const getHotelEmailTemplate = (data) => {
  // Sanitize all inputs to prevent XSS in email
  const fullName = sanitizeForEmail(data.fullName);
  const email = data.email; // Already sanitized by validator
  const phone = sanitizeForEmail(data.phone);
  const roomType = data.roomType ? sanitizeForEmail(data.roomType) : 'Belirtilmedi';
  const message = data.message ? sanitizeForEmail(data.message) : '';
  
  // Dates are already validated, safe to use
  const checkInDate = new Date(data.checkIn).toLocaleDateString('tr-TR');
  const checkOutDate = new Date(data.checkOut).toLocaleDateString('tr-TR');
  const guests = parseInt(data.guests, 10);
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { 
      font-family: Arial, sans-serif; 
      line-height: 1.6; 
      color: #333;
      background: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .container { 
      max-width: 600px; 
      margin: 20px auto; 
      background: #ffffff;
      border: 1px solid #e0e0e0;
    }
    .header { 
      background: #c18c30; 
      color: white; 
      padding: 30px 20px; 
      text-align: center;
      border-bottom: 4px solid #9a6d1f;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content { 
      padding: 30px 20px;
    }
    .alert { 
      background: #fff3cd; 
      border-left: 4px solid #ffc107; 
      padding: 15px; 
      margin: 0 0 20px 0;
    }
    .section {
      margin-bottom: 25px;
    }
    .section h2 {
      color: #c18c30;
      font-size: 18px;
      margin: 0 0 15px 0;
      padding-bottom: 8px;
      border-bottom: 2px solid #f0f0f0;
    }
    .field { 
      margin-bottom: 12px;
      padding: 8px 0;
    }
    .label { 
      font-weight: 600; 
      color: #555;
      display: inline-block;
      min-width: 140px;
    }
    .value { 
      color: #333;
    }
    .value a {
      color: #c18c30;
      text-decoration: none;
    }
    .value a:hover {
      text-decoration: underline;
    }
    .message-box {
      background: #f9f9f9;
      border-left: 4px solid #c18c30;
      padding: 15px;
      margin: 10px 0;
      font-style: italic;
    }
    .info-box {
      background: #e3f2fd;
      border: 1px solid #90caf9;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .footer { 
      background: #f5f5f5;
      text-align: center; 
      padding: 20px; 
      color: #777; 
      font-size: 12px;
      border-top: 1px solid #e0e0e0;
    }
    .footer p {
      margin: 5px 0;
    }
    .footer strong {
      color: #c18c30;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Yeni Rezervasyon Talebi</h1>
      <p style="margin: 10px 0 0 0; font-size: 14px;">Güneş Motel - Nemrut Dağı</p>
    </div>
    <div class="content">
      <div class="alert">
        <strong>Dikkat:</strong> Yeni bir rezervasyon talebi geldi. Lütfen müşteriyle iletişime geçin.
      </div>
      
      <div class="section">
        <h2>Müşteri Bilgileri</h2>
        <div class="field">
          <span class="label">Ad Soyad:</span>
          <span class="value">${fullName}</span>
        </div>
        <div class="field">
          <span class="label">Email:</span>
          <span class="value"><a href="mailto:${email}">${email}</a></span>
        </div>
        <div class="field">
          <span class="label">Telefon:</span>
          <span class="value"><a href="tel:${phone}">${phone}</a></span>
        </div>
      </div>
      
      <div class="section">
        <h2>Rezervasyon Detayları</h2>
        <div class="field">
          <span class="label">Giriş Tarihi:</span>
          <span class="value">${checkInDate}</span>
        </div>
        <div class="field">
          <span class="label">Çıkış Tarihi:</span>
          <span class="value">${checkOutDate}</span>
        </div>
        <div class="field">
          <span class="label">Misafir Sayısı:</span>
          <span class="value">${guests} kişi</span>
        </div>
        <div class="field">
          <span class="label">Oda Tipi:</span>
          <span class="value">${roomType}</span>
        </div>
      </div>
      
      ${message ? `
      <div class="section">
        <h2>Özel İstekler / Notlar</h2>
        <div class="message-box">${message}</div>
      </div>
      ` : ''}
      
      <div class="info-box">
        <strong>Yanıt vermek için:</strong> Bu emaile yanıt verdiğinizde otomatik olarak müşteriye gider (Reply-To: ${email})
      </div>
    </div>
    <div class="footer">
      <p>Bu email otomatik olarak www.nemrutgunesmotel.com web sitesinden gönderilmiştir.</p>
      <p><strong>Güneş Motel - Nemrut Dağı Oteli</strong></p>
      <p>Büyüköz, Nemrut Dağı Yolu, 44850 Pütürge/Malatya</p>
      <p>Tel: +90 543 876 7271 / +90 536 287 0639 | Email: gunesmotel@hotmail.com</p>
      <p style="margin-top: 10px; color: #999;">Tarih: ${new Date().toLocaleString('tr-TR')}</p>
    </div>
  </div>
</body>
</html>
  `.trim();
};

/**
 * Send both emails (hotel + customer)
 * @param {Object} reservationData - Reservation details
 * @returns {Promise<Object>}
 */
export const sendReservationEmails = async (reservationData) => {
  try {
    // Send both emails in parallel
    const [hotelResult, customerResult] = await Promise.all([
      sendHotelNotification(reservationData),
      sendCustomerConfirmation(reservationData)
    ]);

    logger.info(`✅ Both emails sent successfully for: ${reservationData.email}`);
    
    return {
      success: true,
      hotel: hotelResult,
      customer: customerResult
    };
  } catch (error) {
    logger.error('❌ Failed to send reservation emails:', error);
    throw error;
  }
};

/**
 * Send contact form email (simpler version)
 * @param {Object} contactData - Contact form data
 * @returns {Promise<Object>}
 */
export const sendContactEmail = async (contactData) => {
  const sendEmail = async () => {
    // Sanitize all inputs
    const fullName = sanitizeForEmail(contactData.fullName);
    const email = contactData.email; // Already sanitized by validator
    const phone = contactData.phone ? sanitizeForEmail(contactData.phone) : 'Belirtilmedi';
    const subject = contactData.subject ? sanitizeForEmail(contactData.subject) : 'Genel';
    const message = sanitizeForEmail(contactData.message);
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@guneshotel.com',
      to: process.env.CONTACT_EMAIL || 'gunesmotel@hotmail.com',
      replyTo: email,
      subject: `Web Sitesi İletişim Formu: ${subject}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { 
      font-family: Arial, sans-serif; 
      line-height: 1.6; 
      color: #333;
      background: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .container { 
      max-width: 600px; 
      margin: 20px auto; 
      background: #ffffff;
      border: 1px solid #e0e0e0;
    }
    .header { 
      background: #c18c30; 
      color: white; 
      padding: 25px 20px; 
      text-align: center;
      border-bottom: 4px solid #9a6d1f;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
    }
    .content { 
      padding: 30px 20px;
    }
    .section {
      margin-bottom: 20px;
    }
    .section h2 {
      color: #c18c30;
      font-size: 17px;
      margin: 0 0 12px 0;
      padding-bottom: 8px;
      border-bottom: 2px solid #f0f0f0;
    }
    .field { 
      margin: 10px 0;
      padding: 6px 0;
    }
    .label { 
      font-weight: 600; 
      color: #555;
      display: inline-block;
      min-width: 110px;
    }
    .value { 
      color: #333;
    }
    .value a {
      color: #c18c30;
      text-decoration: none;
    }
    .value a:hover {
      text-decoration: underline;
    }
    .message-box {
      background: #f9f9f9;
      border-left: 4px solid #c18c30;
      padding: 15px;
      margin: 15px 0;
      line-height: 1.7;
    }
    .info-box {
      background: #e3f2fd;
      border: 1px solid #90caf9;
      padding: 12px 15px;
      margin: 20px 0;
      font-size: 14px;
    }
    .footer { 
      background: #f5f5f5;
      text-align: center; 
      padding: 18px; 
      color: #777; 
      font-size: 12px;
      border-top: 1px solid #e0e0e0;
    }
    .footer p {
      margin: 4px 0;
    }
    .footer strong {
      color: #c18c30;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Yeni İletişim Formu Mesajı</h1>
      <p style="margin: 8px 0 0 0; font-size: 13px;">Güneş Motel - Web Sitesi</p>
    </div>
    <div class="content">
      <div class="section">
        <h2>Gönderen Bilgileri</h2>
        <div class="field">
          <span class="label">Ad Soyad:</span>
          <span class="value">${fullName}</span>
        </div>
        <div class="field">
          <span class="label">Email:</span>
          <span class="value"><a href="mailto:${email}">${email}</a></span>
        </div>
        <div class="field">
          <span class="label">Telefon:</span>
          <span class="value">${phone !== 'Belirtilmedi' ? `<a href="tel:${phone}">${phone}</a>` : phone}</span>
        </div>
        <div class="field">
          <span class="label">Konu:</span>
          <span class="value">${subject}</span>
        </div>
      </div>
      
      <div class="section">
        <h2>Mesaj İçeriği</h2>
        <div class="message-box">${message}</div>
      </div>
      
      <div class="info-box">
        <strong>Yanıt vermek için:</strong> Bu emaile yanıt verdiğinizde otomatik olarak gönderene gider (Reply-To: ${email})
      </div>
    </div>
    <div class="footer">
      <p>Bu email otomatik olarak www.nemrutgunesmotel.com web sitesinden gönderilmiştir.</p>
      <p><strong>Güneş Motel - Nemrut Dağı Oteli</strong></p>
      <p style="margin-top: 8px; color: #999;">Tarih: ${new Date().toLocaleString('tr-TR')}</p>
    </div>
  </div>
</body>
</html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`✅ Contact form email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  };

  try {
    return await retryWithBackoff(sendEmail, 3, 1000);
  } catch (error) {
    logger.error('❌ Failed to send contact email after retries:', error);
    throw error;
  }
};


