import { sendReservationEmails } from '../services/emailService.js';
import { logger } from '../utils/logger.js';

/**
 * @desc    Create new reservation
 * @route   POST /api/reservations
 * @access  Public
 */
export const createReservation = async (req, res, next) => {
  try {
    const { fullName, email, phone, checkIn, checkOut, guests, roomType, message } = req.body;

    const reservationData = {
      fullName,
      email,
      phone,
      checkIn,
      checkOut,
      guests,
      roomType,
      message
    };

    logger.info(`📝 Processing reservation from: ${email}`);

    // Send emails (hotel + customer) - MAIN FUNCTIONALITY
    try {
      await sendReservationEmails(reservationData);
      logger.info(`✅ Reservation emails sent successfully to hotel and customer`);
    } catch (emailError) {
      logger.error('❌ Email sending failed:', emailError);
      return res.status(500).json({
        success: false,
        message: 'Email gönderilemedi. Lütfen daha sonra tekrar deneyiniz.'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Rezervasyon talebiniz başarıyla alındı. En kısa sürede size dönüş yapılacaktır.',
      data: {
        checkIn: reservationData.checkIn,
        checkOut: reservationData.checkOut,
        guests: reservationData.guests,
        status: 'pending'
      }
    });

  } catch (error) {
    logger.error('❌ Reservation processing failed:', error);
    next(error);
  }
};
