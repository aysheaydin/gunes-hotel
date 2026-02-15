/**
 * Form validation rules and schemas
 */

export const validationRules = {
  fullName: {
    required: 'Ad Soyad alanı zorunludur',
    minLength: {
      value: 2,
      message: 'Ad Soyad en az 2 karakter olmalıdır'
    },
    maxLength: {
      value: 100,
      message: 'Ad Soyad en fazla 100 karakter olmalıdır'
    },
    pattern: {
      value: /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
      message: 'Ad Soyad sadece harf içermelidir'
    }
  },

  email: {
    required: 'E-posta adresi zorunludur',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Geçerli bir e-posta adresi giriniz'
    }
  },

  phone: {
    required: 'Telefon numarası zorunludur',
    pattern: {
      value: /^[\d\s()+-]{10,20}$/,
      message: 'Geçerli bir telefon numarası giriniz'
    }
  },

  message: {
    required: 'Mesaj alanı zorunludur',
    minLength: {
      value: 10,
      message: 'Mesaj en az 10 karakter olmalıdır'
    },
    maxLength: {
      value: 1000,
      message: 'Mesaj en fazla 1000 karakter olmalıdır'
    }
  },

  checkInDate: {
    required: 'Giriş tarihi zorunludur',
    validate: {
      notPast: (value) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const selectedDate = new Date(value)
        return selectedDate >= today || 'Giriş tarihi geçmiş bir tarih olamaz'
      }
    }
  },

  checkOutDate: {
    required: 'Çıkış tarihi zorunludur',
    validate: {
      afterCheckIn: (value, formValues) => {
        if (!formValues.checkInDate) return true
        const checkIn = new Date(formValues.checkInDate)
        const checkOut = new Date(value)
        return checkOut > checkIn || 'Çıkış tarihi, giriş tarihinden sonra olmalıdır'
      }
    }
  },

  guests: {
    required: 'Misafir sayısı zorunludur',
    min: {
      value: 1,
      message: 'En az 1 misafir seçilmelidir'
    },
    max: {
      value: 10,
      message: 'En fazla 10 misafir seçilebilir'
    }
  }
}

export const getValidationRule = (fieldName, customRules = {}) => {
  return {
    ...validationRules[fieldName],
    ...customRules
  }
}
