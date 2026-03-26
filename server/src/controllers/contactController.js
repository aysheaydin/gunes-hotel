import { sendContactEmail } from '../services/emailService.js';
import { logger } from '../utils/logger.js';

/**
 * @desc    Send contact form message
 * @route   POST /api/contact
 * @access  Public
 */
export const sendContactMessage = async (req, res, next) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    // Validation is already handled by validateContact middleware
    // No need for duplicate validation here

    // Send email to hotel
    await sendContactEmail({
      fullName,
      email,
      phone,
      subject,
      message
    });

    logger.info(`✅ Contact form submitted by: ${email}`);

    res.status(200).json({
      success: true,
      message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapılacaktır.'
    });

  } catch (error) {
    logger.error('❌ Contact form submission failed:', error);
    
    res.status(500).json({
      success: false,
      message: 'Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyiniz.'
    });
  }
};
