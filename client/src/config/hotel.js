/**
 * Hotel Contact Configuration
 * Centralized configuration for hotel contact information
 * All contact details are loaded from environment variables
 * 
 * Usage:
 * import { HOTEL_CONFIG } from '@/config/hotel'
 * <a href={`tel:${HOTEL_CONFIG.phone1}`}>{HOTEL_CONFIG.phone1Display}</a>
 */

export const HOTEL_CONFIG = {
  // Phone Numbers
  phone1: import.meta.env.VITE_PHONE_1 || '+905438767271',
  phone2: import.meta.env.VITE_PHONE_2 || '+905362870639',
  
  // Display formats (with spacing for better readability)
  phone1Display: '+90 543 876 7271',
  phone2Display: '+90 536 287 0639',
  
  // Email
  email: import.meta.env.VITE_EMAIL || 'gunesmotel@hotmail.com',
  
  // WhatsApp (without + prefix for wa.me links)
  whatsapp: import.meta.env.VITE_WHATSAPP || '905438767271',
  whatsappDisplay: '+90 543 876 7271',
  
  // Social Media
  instagram: import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/mount_nemrut_tour?igsh=MTBsZDJmN3Zva24xZA==',
  
  // Address
  address: 'Karadut Köyü, Pötürge/Malatya',
  addressShort: 'Büyüköz, Mount Nemrut Road, 44850 Pütürge/Malatya',
  
  // Business Info
  name: import.meta.env.VITE_APP_NAME || 'Güneş Hotel',
  website: import.meta.env.VITE_APP_URL || 'https://www.nemrutgunesmotel.com',
  
  // Coordinates (for maps, structured data)
  coordinates: {
    latitude: 37.991782,
    longitude: 38.755654
  }
}

// Helper functions for common use cases
export const getPhoneLink = (phoneNumber = HOTEL_CONFIG.phone1) => `tel:${phoneNumber}`
export const getEmailLink = (email = HOTEL_CONFIG.email) => `mailto:${email}`
export const getWhatsAppLink = (message = '') => {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${HOTEL_CONFIG.whatsapp}${message ? `?text=${encodedMessage}` : ''}`
}
export const getMapLink = () => {
  const { latitude, longitude } = HOTEL_CONFIG.coordinates
  return `https://www.google.com/maps?q=${latitude},${longitude}`
}
