import React from 'react'
import { getWhatsAppLink } from '@/config/hotel'
import './WhatsAppButton.scss'

const WhatsAppButton = () => {
  const message = 'Merhaba, Güneş Hotel hakkında bilgi almak istiyorum.'
  const whatsappUrl = getWhatsAppLink(message)

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="WhatsApp ile iletişime geç"
      title="WhatsApp ile iletişime geç"
    >
      <i className="fab fa-whatsapp" aria-hidden="true"></i>
    </a>
  )
}

export default WhatsAppButton
