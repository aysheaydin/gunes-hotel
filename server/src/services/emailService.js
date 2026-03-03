import transporter from '../config/email.js';
import { logger } from '../utils/logger.js';

/**
 * Email Service
 * Handles all email communications:
 * 1. Hotel notification emails (reservation details)
 * 2. Customer confirmation emails (auto-reply)
 */

// Email template for HOTEL - Detailed reservation info
const getHotelEmailTemplate = (data) => {
  const { fullName, email, phone, checkIn, checkOut, guests, roomType, message } = data;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
    .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #667eea; }
    .value { color: #333; }
    .footer { text-align: center; margin-top: 20px; color: #777; font-size: 12px; }
    .alert { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏨 Yeni Rezervasyon Talebi</h1>
    </div>
    <div class="content">
      <div class="alert">
        <strong>⚠️ Dikkat:</strong> Yeni bir rezervasyon talebi geldi. Lütfen müşteriyle iletişime geçin.
      </div>
      
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
        <span class="value">${phone}</span>
      </div>
      
      <h2>Rezervasyon Detayları</h2>
      <div class="field">
        <span class="label">Giriş Tarihi:</span>
        <span class="value">${new Date(checkIn).toLocaleDateString('tr-TR')}</span>
      </div>
      <div class="field">
        <span class="label">Çıkış Tarihi:</span>
        <span class="value">${new Date(checkOut).toLocaleDateString('tr-TR')}</span>
      </div>
      <div class="field">
        <span class="label">Misafir Sayısı:</span>
        <span class="value">${guests} kişi</span>
      </div>
      <div class="field">
        <span class="label">Oda Tipi:</span>
        <span class="value">${roomType || 'Belirtilmedi'}</span>
      </div>
      
      ${message ? `
      <h2>Özel İstekler / Notlar</h2>
      <div class="field">
        <p style="background: white; padding: 15px; border-left: 4px solid #667eea;">${message}</p>
      </div>
      ` : ''}
      
      <div style="margin-top: 30px; padding: 15px; background: #e3f2fd; border-radius: 4px;">
        <p><strong>📧 Yanıt vermek için:</strong> Bu emaile yanıt verdiğinizde otomatik olarak müşteriye gider (Reply-To: ${email})</p>
      </div>
    </div>
    <div class="footer">
      <p>Bu email otomatik olarak gunes-otel.com web sitesinden gönderilmiştir.</p>
      <p>Tarih: ${new Date().toLocaleString('tr-TR')}</p>
    </div>
  </div>
</body>
</html>
  `.trim();
};

// Email template for CUSTOMER - Confirmation message
const getCustomerEmailTemplate = (data) => {
  const { fullName, checkIn, checkOut, guests } = data;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
    .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
    .success-box { background: #d4edda; border: 1px solid #28a745; color: #155724; padding: 20px; margin: 20px 0; border-radius: 4px; text-align: center; }
    .info-box { background: white; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0; }
    .footer { text-align: center; margin-top: 20px; color: #777; font-size: 12px; }
    .btn { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 4px; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏨 Güneş Hotel</h1>
      <p>Nemrut Dağı Oteli</p>
    </div>
    <div class="content">
      <div class="success-box">
        <h2>✅ Rezervasyon Talebiniz Alındı!</h2>
      </div>
      
      <p>Sayın <strong>${fullName}</strong>,</p>
      
      <p>Rezervasyon talebinizi aldık. En kısa sürede sizinle iletişime geçeceğiz.</p>
      
      <div class="info-box">
        <h3>📋 Talep Özeti</h3>
        <p><strong>Giriş:</strong> ${new Date(checkIn).toLocaleDateString('tr-TR')}</p>
        <p><strong>Çıkış:</strong> ${new Date(checkOut).toLocaleDateString('tr-TR')}</p>
        <p><strong>Misafir:</strong> ${guests} kişi</p>
      </div>
      
      <p><strong>⏱️ Ne Zaman Dönüş Alabilirim?</strong></p>
      <p>Ekibimiz rezervasyon talebinizi en geç <strong>24 saat içinde</strong> değerlendirecek ve size geri dönüş yapacaktır.</p>
      
      <p><strong>📞 Acil Rezervasyon için:</strong></p>
      <p>Telefon: +90 XXX XXX XX XX<br>
      Email: gunesmotel@hotmail.com</p>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="https://gunes-otel.com" class="btn">Web Sitemizi Ziyaret Edin</a>
      </div>
    </div>
    <div class="footer">
      <p><strong>Güneş Hotel - Nemrut Dağı</strong></p>
      <p>Karadut Köyü, Kâhta/Adıyaman</p>
      <p>www.gunes-otel.com | gunesmotel@hotmail.com</p>
    </div>
  </div>
</body>
</html>
  `.trim();
};

/**
 * Send reservation notification to hotel (internal function)
 * @param {Object} reservationData - Reservation details
 * @returns {Promise<Object>}
 */
const sendHotelNotification = async (reservationData) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@guneshotel.com',
      to: process.env.RESERVATION_EMAIL || 'gunesmotel@hotmail.com',
      replyTo: reservationData.email, // ✅ Important: Reply goes to customer
      subject: `🏨 Yeni Rezervasyon Talebi - ${reservationData.fullName}`,
      html: getHotelEmailTemplate(reservationData),
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`✅ Hotel notification sent: ${info.messageId}`);
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error('❌ Failed to send hotel notification:', error);
    throw error;
  }
};

/**
 * Send confirmation email to customer (internal function)
 * @param {Object} reservationData - Reservation details
 * @returns {Promise<Object>}
 */
const sendCustomerConfirmation = async (reservationData) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@guneshotel.com',
      to: reservationData.email,
      replyTo: process.env.RESERVATION_EMAIL || 'gunesmotel@hotmail.com',
      subject: '✅ Rezervasyon Talebiniz Alındı - Güneş Hotel',
      html: getCustomerEmailTemplate(reservationData),
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`✅ Customer confirmation sent to: ${reservationData.email}`);
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error('❌ Failed to send customer confirmation:', error);
    throw error;
  }
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
  try {
    const { fullName, email, phone, subject, message } = contactData;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@guneshotel.com',
      to: process.env.CONTACT_EMAIL || 'gunesmotel@hotmail.com',
      replyTo: email,
      subject: `📧 İletişim Formu: ${subject || 'Yeni Mesaj'}`,
      html: `
        <h2>Yeni İletişim Formu Mesajı</h2>
        <p><strong>Ad Soyad:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || 'Belirtilmedi'}</p>
        <p><strong>Konu:</strong> ${subject || 'Genel'}</p>
        <hr>
        <p><strong>Mesaj:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Tarih: ${new Date().toLocaleString('tr-TR')}</small></p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`✅ Contact form email sent: ${info.messageId}`);
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error('❌ Failed to send contact email:', error);
    throw error;
  }
};


