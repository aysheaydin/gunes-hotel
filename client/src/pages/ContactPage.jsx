import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { reservationAPI } from '@services/api'
import { useErrorHandler } from '@hooks'
import { validationRules } from '@utils/formValidation'
import StructuredData from '@components/common/StructuredData'
import './ContactPage.scss'

const ContactPage = () => {
  const { t } = useTranslation()
  const { handleSuccess, withErrorHandling } = useErrorHandler()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      roomType: '',
      guests: '',
      specialRequests: ''
    }
  })

  const checkInDate = watch('checkIn')

  const onSubmit = async (data) => {
    const { success } = await withErrorHandling(
      () => reservationAPI.create(data),
      t('contact.form.error')
    )

    if (success) {
      handleSuccess(t('contact.form.success'))
      reset()
    }
  }

  return (
    <>
      <Helmet>
        <title>İletişim & Rezervasyon - Güneş Hotel | Nemrut Dağı</title>
        <meta 
          name="description" 
          content="Güneş Hotel ile iletişime geçin ve rezervasyon yapın. Telefon, email ve adres bilgilerimiz." 
        />
        <link rel="canonical" href="https://www.nemrutgunesmotel.com/contact" />
      </Helmet>
      <StructuredData type="hotel" page="contact" />

      <div className="contact-page">
        {/* Page Header */}
        <section className="page-header">
          <div className="page-header-overlay"></div>
          <Container>
            <div className="page-header-content">
              <h1>{t('contact.title')}</h1>
              <p className="lead">{t('contact.subtitle')}</p>
            </div>
          </Container>
        </section>

        {/* Contact Section */}
        <section className="section contact-section">
          <Container>
            <Row>
              {/* Contact Info */}
              <Col lg={4} className="mb-4 mb-lg-0">
                <div className="contact-info">
                  <div className="info-card">
                    <div className="info-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <h4>{t('contact.address')}</h4>
                    <p>{t('contact.addressText')}</p>
                  </div>

                  <div className="info-card">
                    <div className="info-icon">
                      <i className="fas fa-phone"></i>
                    </div>
                    <h4>{t('contact.phone')}</h4>
                    <p>
                      <a href="tel:+905438767271">+90 543 876 7271</a><br/>
                      <a href="tel:+905362870639">+90 536 287 0639</a>
                    </p>
                  </div>

                  <div className="info-card">
                    <div className="info-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <h4>{t('contact.email')}</h4>
                    <p>
                      <a href="mailto:gunesmotel@hotmail.com">gunesmotel@hotmail.com</a>
                    </p>
                  </div>

                  <div className="info-card">
                    <div className="info-icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <h4>{t('contact.workingHours')}</h4>
                    <p>{t('contact.open247')}</p>
                  </div>

                  {/* Social Links */}
                  <div className="social-links">
                    <a href="https://www.instagram.com/mount_nemrut_tour?igsh=MTBsZDJmN3Zva24xZA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </Col>

              {/* Reservation Form */}
              <Col lg={8}>
                <div className="reservation-form">
                  <h3 className="form-title">{t('contact.form.title')}</h3>

                  {/* Temporary Unavailable Alert */}
                  <div className="alert alert-warning d-flex align-items-center mb-4" role="alert">
                    <i className="fas fa-exclamation-triangle me-3" style={{ fontSize: '1.5rem' }}></i>
                    <div>
                      <strong>{t('contact.form.tempUnavailable')}</strong>{' '}
                      <a href="mailto:gunesmotel@hotmail.com" className="alert-link">
                        {t('contact.form.email')}
                      </a>{' '}
                      {t('contact.form.contactVia')}{' '}
                      <a href="https://wa.me/905438767271" target="_blank" rel="noopener noreferrer" className="alert-link">
                        {t('contact.form.whatsapp')}
                      </a>{' '}
                      {t('contact.form.viaText')}
                    </div>
                  </div>

                  <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="reservation-fullName">{t('contact.form.fullName')} *</Form.Label>
                          <Form.Control
                            id="reservation-fullName"
                            type="text"
                            {...register('fullName', validationRules.fullName)}
                            placeholder={t('contact.form.fullNamePlaceholder')}
                            isInvalid={!!errors.fullName}
                            aria-invalid={!!errors.fullName}
                            aria-describedby={errors.fullName ? 'reservation-fullName-error' : undefined}
                            aria-required="true"
                          />
                          <Form.Control.Feedback type="invalid" id="reservation-fullName-error">
                            {errors.fullName?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="reservation-email">{t('contact.email')} *</Form.Label>
                          <Form.Control
                            id="reservation-email"
                            type="email"
                            {...register('email', validationRules.email)}
                            placeholder={t('contact.form.emailPlaceholder')}
                            isInvalid={!!errors.email}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'reservation-email-error' : undefined}
                            aria-required="true"
                            autoComplete="email"
                          />
                          <Form.Control.Feedback type="invalid" id="reservation-email-error">
                            {errors.email?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="reservation-phone">{t('contact.phone')} *</Form.Label>
                          <Form.Control
                            id="reservation-phone"
                            type="tel"
                            {...register('phone', validationRules.phone)}
                            placeholder={t('contact.form.phonePlaceholder')}
                            isInvalid={!!errors.phone}
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? 'reservation-phone-error' : undefined}
                            aria-required="true"
                            autoComplete="tel"
                          />
                          <Form.Control.Feedback type="invalid" id="reservation-phone-error">
                            {errors.phone?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="reservation-guests">{t('contact.form.guests')} *</Form.Label>
                          <Form.Select
                            id="reservation-guests"
                            {...register('guests', validationRules.guests)}
                            isInvalid={!!errors.guests}
                            aria-invalid={!!errors.guests}
                            aria-describedby={errors.guests ? 'reservation-guests-error' : undefined}
                            aria-required="true"
                          >
                            <option value="">{t('contact.form.selectGuests')}</option>
                            <option value="1">{t('contact.form.guestOptions.1')}</option>
                            <option value="2">{t('contact.form.guestOptions.2')}</option>
                            <option value="3">{t('contact.form.guestOptions.3')}</option>
                            <option value="4">{t('contact.form.guestOptions.4')}</option>
                            <option value="5">{t('contact.form.guestOptions.5')}</option>
                            <option value="6+">{t('contact.form.guestOptions.6plus')}</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid" id="reservation-guests-error">
                            {errors.guests?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="reservation-checkIn">{t('contact.form.checkIn')} *</Form.Label>
                          <Form.Control
                            id="reservation-checkIn"
                            type="date"
                            {...register('checkIn', validationRules.checkInDate)}
                            min={new Date().toISOString().split('T')[0]}
                            isInvalid={!!errors.checkIn}
                            aria-invalid={!!errors.checkIn}
                            aria-describedby={errors.checkIn ? 'reservation-checkIn-error' : undefined}
                            aria-required="true"
                          />
                          <Form.Control.Feedback type="invalid" id="reservation-checkIn-error">
                            {errors.checkIn?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="reservation-checkOut">{t('contact.form.checkOut')} *</Form.Label>
                          <Form.Control
                            id="reservation-checkOut"
                            type="date"
                            {...register('checkOut', validationRules.checkOutDate)}
                            min={checkInDate || new Date().toISOString().split('T')[0]}
                            isInvalid={!!errors.checkOut}
                            aria-invalid={!!errors.checkOut}
                            aria-describedby={errors.checkOut ? 'reservation-checkOut-error' : undefined}
                            aria-required="true"
                          />
                          <Form.Control.Feedback type="invalid" id="reservation-checkOut-error">
                            {errors.checkOut?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="reservation-roomType">{t('contact.form.roomType')} *</Form.Label>
                      <Form.Select
                        id="reservation-roomType"
                        {...register('roomType', { required: 'Oda tipi seçilmelidir' })}
                        isInvalid={!!errors.roomType}
                        aria-invalid={!!errors.roomType}
                        aria-describedby={errors.roomType ? 'reservation-roomType-error' : undefined}
                        aria-required="true"
                      >
                        <option value="">{t('contact.form.selectRoom')}</option>
                        <option value="single">Standart Tek Kişilik Oda</option>
                        <option value="double">Standart 2 Kişilik Oda</option>
                        <option value="twin">Çift Kişilik Oda</option>
                        <option value="triple">3 Kişilik Oda</option>
                        <option value="family">5 Kişilik Aile Odası</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid" id="reservation-roomType-error">
                        {errors.roomType?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label htmlFor="reservation-specialRequests">{t('contact.form.specialRequests')}</Form.Label>
                      <Form.Control
                        id="reservation-specialRequests"
                        as="textarea"
                        rows={4}
                        {...register('specialRequests', {
                          maxLength: { value: 500, message: 'Özel istekler en fazla 500 karakter olabilir' }
                        })}
                        placeholder="Özel isteklerinizi buraya yazabilirsiniz..."
                        isInvalid={!!errors.specialRequests}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.specialRequests?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button 
                      type="submit" 
                      className="btn-submit"
                      disabled={true}
                      title={t('contact.form.tempUnavailable')}
                    >
                      <i className="fas fa-ban me-2"></i>
                      {t('contact.form.submit')}
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Map Section */}
        <section className="map-section">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23107.224466176427!2d38.74809860815096!3d37.991781659336155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4075fee789c631c5%3A0xc60c5c6d8b427183!2zR8O8bmXFnyBNb3RlbA!5e0!3m2!1str!2str!4v1767785234481!5m2!1str!2str"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Güneş Hotel Konum"
          ></iframe>
        </section>
      </div>
    </>
  )
}

export default ContactPage
