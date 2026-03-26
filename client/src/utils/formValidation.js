/**
 * Form validation rules and schemas with i18n support
 */
import i18n from '../i18n/config'

/**
 * Get validation rules with i18n support
 * @param {Function} t - Translation function from useTranslation hook
 * @returns {Object} Validation rules object
 */
export const getValidationRules = (t) => ({
  fullName: {
    required: t('formValidation.fullName.required'),
    minLength: {
      value: 2,
      message: t('formValidation.fullName.minLength')
    },
    maxLength: {
      value: 100,
      message: t('formValidation.fullName.maxLength')
    },
    pattern: {
      value: /^[a-zA-ZğüşıöçİĞÜŞIÖÇ\s''-]+$/u,
      message: t('formValidation.fullName.pattern')
    }
  },

  email: {
    required: t('formValidation.email.required'),
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: t('formValidation.email.pattern')
    },
    validate: {
      noFakeEmail: (value) => {
        // Block common fake/test emails
        const fakeDomains = ['test.com', 'example.com', 'fake.com', 'mail.com'];
        const domain = value.split('@')[1]?.toLowerCase();
        if (fakeDomains.includes(domain)) {
          return t('formValidation.email.pattern');
        }
        return true;
      }
    }
  },

  phone: {
    required: t('formValidation.phone.required'),
    minLength: {
      value: 10,
      message: t('formValidation.phone.minLength')
    },
    pattern: {
      value: /^[\d\s()+-]{10,20}$/,
      message: t('formValidation.phone.pattern')
    },
    validate: {
      validFormat: (value) => {
        // Remove all non-digit characters and check length
        const digitsOnly = value.replace(/\D/g, '');
        if (digitsOnly.length < 10) {
          return t('formValidation.phone.minLength');
        }
        // Check for obviously fake numbers (all same digit)
        if (/^(\d)\1+$/.test(digitsOnly)) {
          return t('formValidation.phone.pattern');
        }
        return true;
      }
    }
  },

  message: {
    required: t('formValidation.message.required'),
    minLength: {
      value: 10,
      message: t('formValidation.message.minLength')
    },
    maxLength: {
      value: 1000,
      message: t('formValidation.message.maxLength')
    }
  },

  checkIn: {
    required: t('formValidation.checkIn.required'),
    validate: {
      notPast: (value) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const selectedDate = new Date(value)
        return selectedDate >= today || t('formValidation.checkIn.minDate')
      }
    }
  },

  checkOut: {
    required: t('formValidation.checkOut.required'),
    validate: {
      afterCheckIn: (value, formValues) => {
        if (!formValues.checkIn) return true
        const checkIn = new Date(formValues.checkIn)
        const checkOut = new Date(value)
        return checkOut > checkIn || t('formValidation.checkOut.minDate')
      }
    }
  },

  roomType: {
    required: t('formValidation.roomType.required')
  },

  guests: {
    required: t('formValidation.guests.required'),
    min: {
      value: 1,
      message: t('formValidation.guests.min')
    },
    max: {
      value: 10,
      message: t('formValidation.guests.max')
    }
  },

  kvkkConsent: {
    required: t('contact.form.kvkkConsentRequired')
  }
});

// Legacy export for backward compatibility (uses current i18n language)
export const validationRules = {
  fullName: {
    required: i18n.t('formValidation.fullName.required'),
    minLength: {
      value: 2,
      message: i18n.t('formValidation.fullName.minLength')
    },
    maxLength: {
      value: 100,
      message: i18n.t('formValidation.fullName.maxLength')
    },
    pattern: {
      value: /^[a-zA-ZğüşıöçİĞÜŞIÖÇ\s''-]+$/u,
      message: i18n.t('formValidation.fullName.pattern')
    }
  },

  email: {
    required: i18n.t('formValidation.email.required'),
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: i18n.t('formValidation.email.pattern')
    }
  },

  phone: {
    required: i18n.t('formValidation.phone.required'),
    minLength: {
      value: 10,
      message: i18n.t('formValidation.phone.minLength')
    },
    pattern: {
      value: /^[\d\s()+-]{10,20}$/,
      message: i18n.t('formValidation.phone.pattern')
    }
  },

  message: {
    required: i18n.t('formValidation.message.required'),
    minLength: {
      value: 10,
      message: i18n.t('formValidation.message.minLength')
    },
    maxLength: {
      value: 1000,
      message: i18n.t('formValidation.message.maxLength')
    }
  },

  checkInDate: {
    required: i18n.t('formValidation.checkIn.required'),
    validate: {
      notPast: (value) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const selectedDate = new Date(value)
        return selectedDate >= today || i18n.t('formValidation.checkIn.minDate')
      }
    }
  },

  checkOutDate: {
    required: i18n.t('formValidation.checkOut.required'),
    validate: {
      afterCheckIn: (value, formValues) => {
        const checkInValue = formValues.checkIn || formValues.checkInDate
        if (!checkInValue) return true
        const checkIn = new Date(checkInValue)
        const checkOut = new Date(value)
        return checkOut > checkIn || i18n.t('formValidation.checkOut.minDate')
      }
    }
  },

  guests: {
    required: i18n.t('formValidation.guests.required'),
    min: {
      value: 1,
      message: i18n.t('formValidation.guests.min')
    },
    max: {
      value: 10,
      message: i18n.t('formValidation.guests.max')
    }
  },

  kvkkConsent: {
    required: i18n.t('contact.form.kvkkConsentRequired')
  }
}

export const getValidationRule = (fieldName, customRules = {}) => {
  return {
    ...validationRules[fieldName],
    ...customRules
  }
}
