import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useErrorHandler } from '@hooks'
import { contactAPI } from '@services/api'
import { validationRules } from '@utils/formValidation'
import './Contact.scss'

const Contact = () => {
  const { t } = useTranslation()
  const { handleSuccess, withErrorHandling } = useErrorHandler()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      message: ''
    }
  })

  const onSubmit = async (data) => {
    const { success } = await withErrorHandling(
      () => contactAPI.send(data),
      t('contact.quickContact.error')
    )

    if (success) {
      handleSuccess(t('contact.quickContact.success'))
      reset()
    }
  }

  return (
    <section id="contact" className="section contact-section">
      <Container>
        <div className="section-title">
          <h2>{t('contact.title')}</h2>
          <p>{t('contact.subtitle')}</p>
        </div>

        <Row>
          {/* Contact Info Cards */}
          <Col lg={4} className="mb-4">
            <div className="contact-info-card">
              <div className="info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h4>{t('contact.address')}</h4>
              <p>{t('contact.addressText')}</p>
            </div>
          </Col>

          <Col lg={4} className="mb-4">
            <div className="contact-info-card">
              <div className="info-icon">
                <i className="fas fa-phone"></i>
              </div>
              <h4>{t('contact.phone')}</h4>
              <p>
                <a href="tel:+905438767271">+90 543 876 7271</a><br/>
                <a href="tel:+905362870639">+90 536 287 0639</a>
              </p>
            </div>
          </Col>

          <Col lg={4} className="mb-4">
            <div className="contact-info-card">
              <div className="info-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h4>{t('contact.email')}</h4>
              <p>
                <a href="mailto:gunesmotel@hotmail.com">gunesmotel@hotmail.com</a>
              </p>
            </div>
          </Col>
        </Row>

        {/* Quick Contact Form */}
        <Row className="mt-5">
          <Col lg={8} className="mx-auto">
            <div className="quick-contact-form">
              <h3>{t('contact.quickContact.title')}</h3>
              <p className="text-muted mb-4">
                {t('contact.quickContact.description')}
              </p>

              {/* Temporary Unavailable Alert */}
              <div className="alert alert-warning d-flex align-items-center mb-4" role="alert">
                <i className="fas fa-exclamation-triangle me-3" style={{ fontSize: '1.5rem' }}></i>
                <div>
                  <strong>{t('contact.quickContact.tempUnavailable')}</strong>{' '}
                  <a href="mailto:gunesmotel@hotmail.com" className="alert-link">
                    {t('contact.quickContact.email')}
                  </a>{' '}
                  {t('contact.quickContact.contactVia')}{' '}
                  <a href="https://wa.me/905362870639" target="_blank" rel="noopener noreferrer" className="alert-link">
                    {t('contact.quickContact.whatsapp')}
                  </a>{' '}
                  {t('contact.quickContact.viaText')}
                </div>
              </div>

              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="contact-fullName" className="visually-hidden">
                        {t('contact.quickContact.fullNamePlaceholder')}
                      </Form.Label>
                      <Form.Control
                        id="contact-fullName"
                        type="text"
                        {...register('fullName', validationRules.fullName)}
                        placeholder={t('contact.quickContact.fullNamePlaceholder')}
                        isInvalid={!!errors.fullName}
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      />
                      <Form.Control.Feedback type="invalid" id="fullName-error">
                        {errors.fullName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="contact-email" className="visually-hidden">
                        {t('contact.quickContact.emailPlaceholder')}
                      </Form.Label>
                      <Form.Control
                        id="contact-email"
                        type="email"
                        {...register('email', validationRules.email)}
                        placeholder={t('contact.quickContact.emailPlaceholder')}
                        isInvalid={!!errors.email}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        autoComplete="email"
                      />
                      <Form.Control.Feedback type="invalid" id="email-error">
                        {errors.email?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="contact-phone" className="visually-hidden">
                    {t('contact.quickContact.phonePlaceholder')}
                  </Form.Label>
                  <Form.Control
                    id="contact-phone"
                    type="tel"
                    {...register('phone', validationRules.phone)}
                    placeholder={t('contact.quickContact.phonePlaceholder')}
                    isInvalid={!!errors.phone}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    autoComplete="tel"
                  />
                  <Form.Control.Feedback type="invalid" id="phone-error">
                    {errors.phone?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label htmlFor="contact-message" className="visually-hidden">
                    {t('contact.quickContact.messagePlaceholder')}
                  </Form.Label>
                  <Form.Control
                    id="contact-message"
                    as="textarea"
                    rows={4}
                    {...register('message', validationRules.message)}
                    placeholder={t('contact.quickContact.messagePlaceholder')}
                    isInvalid={!!errors.message}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  <Form.Control.Feedback type="invalid" id="message-error">
                    {errors.message?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="form-actions">
                  <Button 
                    type="submit" 
                    className="btn-submit"
                    disabled={true}
                    title={t('contact.quickContact.tempUnavailable')}
                  >
                    <i className="fas fa-ban me-2"></i>
                    {t('contact.quickContact.send')}
                  </Button>

                  <Link to="/contact" className="btn btn-outline ms-3">
                    <i className="fas fa-calendar-alt me-2"></i>
                    {t('contact.quickContact.makeReservation')}
                  </Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Contact
