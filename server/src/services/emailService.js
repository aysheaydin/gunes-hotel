import transporter from '../config/email.js';
import { logger } from '../utils/logger.js';
import { sanitizeForEmail } from '../utils/sanitizer.js';

const retryWithBackoff = async (fn, maxRetries = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }

      const waitTime = delay * Math.pow(2, attempt - 1);
      logger.warn(`Retry attempt ${attempt}/${maxRetries} after ${waitTime}ms`);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }

  return null;
};

const formatReservationData = (data) => {
  const {
    fullName: rawFullName,
    email,
    phone: rawPhone,
    roomType: rawRoomType,
    message: rawMessage,
    checkIn,
    checkOut,
    guests: rawGuests,
  } = data;

  const fullName = sanitizeForEmail(rawFullName);
  const phone = sanitizeForEmail(rawPhone);
  const roomType = rawRoomType ? sanitizeForEmail(rawRoomType) : 'Belirtilmedi';
  const message = rawMessage ? sanitizeForEmail(rawMessage) : '';
  const checkInDate = new Date(checkIn).toLocaleDateString('tr-TR');
  const checkOutDate = new Date(checkOut).toLocaleDateString('tr-TR');
  const guests = Number.parseInt(rawGuests, 10);

  return {
    fullName,
    email,
    phone,
    roomType,
    message,
    checkInDate,
    checkOutDate,
    guests,
  };
};

const getHotelEmailTemplate = (data) => {
  const {
    fullName,
    email,
    phone,
    roomType,
    message,
    checkInDate,
    checkOutDate,
    guests,
  } = formatReservationData(data);

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <h2>Yeni Rezervasyon Talebi</h2>
  <p><strong>Ad Soyad:</strong> ${fullName}</p>
  <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
  <p><strong>Telefon:</strong> <a href="tel:${phone}">${phone}</a></p>
  <p><strong>Giriş:</strong> ${checkInDate}</p>
  <p><strong>Çıkış:</strong> ${checkOutDate}</p>
  <p><strong>Misafir Sayısı:</strong> ${guests}</p>
  <p><strong>Oda Tipi:</strong> ${roomType}</p>
  ${message ? `<p><strong>Özel İstek:</strong> ${message}</p>` : ''}
  <hr />
  <p>Bu email otomatik olarak web sitesinden gönderilmiştir.</p>
</body>
</html>
`.trim();
};

const getCustomerEmailTemplate = (data) => {
  const {
    fullName,
    checkInDate,
    checkOutDate,
    guests,
    roomType,
  } = formatReservationData(data);

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <h2>Rezervasyon Talebiniz Alındı</h2>
  <p>Merhaba ${fullName},</p>
  <p>Rezervasyon talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.</p>
  <p><strong>Giriş:</strong> ${checkInDate}</p>
  <p><strong>Çıkış:</strong> ${checkOutDate}</p>
  <p><strong>Misafir Sayısı:</strong> ${guests}</p>
  <p><strong>Oda Tipi:</strong> ${roomType}</p>
  <hr />
  <p>Güneş Motel - Nemrut Dağı</p>
</body>
</html>
`.trim();
};

const sendHotelNotification = async (reservationData) => {
  const sendEmail = async () => {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@guneshotel.com',
      to: process.env.CONTACT_EMAIL || 'gunesmotel@hotmail.com',
      replyTo: reservationData.email,
      subject: `Yeni Rezervasyon Talebi - ${sanitizeForEmail(reservationData.fullName)}`,
      html: getHotelEmailTemplate(reservationData),
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Hotel reservation email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  };

  return retryWithBackoff(sendEmail, 3, 1000);
};

const sendCustomerConfirmation = async (reservationData) => {
  const sendEmail = async () => {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@guneshotel.com',
      to: reservationData.email,
      subject: 'Rezervasyon Talebiniz Alındı - Güneş Motel',
      html: getCustomerEmailTemplate(reservationData),
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Customer confirmation email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  };

  return retryWithBackoff(sendEmail, 3, 1000);
};

export const sendReservationEmails = async (reservationData) => {
  try {
    const [hotelResult, customerResult] = await Promise.all([
      sendHotelNotification(reservationData),
      sendCustomerConfirmation(reservationData),
    ]);

    logger.info(`Both reservation emails sent for: ${reservationData.email}`);
    return { success: true, hotel: hotelResult, customer: customerResult };
  } catch (error) {
    logger.error('Failed to send reservation emails:', error);
    throw error;
  }
};

export const sendContactEmail = async (contactData) => {
  const sendEmail = async () => {
    const {
      fullName: rawFullName,
      email,
      phone: rawPhone,
      subject: rawSubject,
      message: rawMessage,
    } = contactData;

    const fullName = sanitizeForEmail(rawFullName);
    const phone = rawPhone ? sanitizeForEmail(rawPhone) : 'Belirtilmedi';
    const subject = rawSubject ? sanitizeForEmail(rawSubject) : 'Genel';
    const message = sanitizeForEmail(rawMessage);

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@guneshotel.com',
      to: process.env.CONTACT_EMAIL || 'gunesmotel@hotmail.com',
      replyTo: email,
      subject: `Web Sitesi İletişim Formu: ${subject}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <h2>Yeni İletişim Formu Mesajı</h2>
  <p><strong>Ad Soyad:</strong> ${fullName}</p>
  <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
  <p><strong>Telefon:</strong> ${phone !== 'Belirtilmedi' ? `<a href="tel:${phone}">${phone}</a>` : phone}</p>
  <p><strong>Konu:</strong> ${subject}</p>
  <p><strong>Mesaj:</strong> ${message}</p>
  <hr />
  <p>Bu email otomatik olarak web sitesinden gönderilmiştir.</p>
</body>
</html>
      `.trim(),
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Contact form email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  };

  try {
    return await retryWithBackoff(sendEmail, 3, 1000);
  } catch (error) {
    logger.error('Failed to send contact email after retries:', error);
    throw error;
  }
};
