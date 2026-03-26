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
  const { handleSuccess, withErrorHandling, loading } = useErrorHandler()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  })

  const onSubmit = async (data) => {
    if (import.meta.env.MODE === 'development') {
      console.log('Contact - Form submitted with data:', data)
    }
    const { success } = await withErrorHandling(
      () => contactAPI.send(data),
      t('contact.form.error')
    )

    if (import.meta.env.MODE === 'development') {
      console.log('Contact - withErrorHandling result:', success)
    }
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

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="contact-subject" className="visually-hidden">
                    {t('contact.quickContact.subjectPlaceholder')}
                  </Form.Label>
                  <Form.Control
                    id="contact-subject"
                    type="text"
                    {...register('subject')}
                    placeholder={t('contact.quickContact.subjectPlaceholder')}
                    aria-describedby="subject-optional"
                  />
                  <Form.Text id="subject-optional" className="text-muted">
                    {t('contact.quickContact.optional')}
                  </Form.Text>
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
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        {t('contact.quickContact.sending')}
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane me-2"></i>
                        {t('contact.quickContact.send')}
                      </>
                    )}
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
