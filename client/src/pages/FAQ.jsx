import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Row, Col, Accordion } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import './FAQ.scss'

const FAQ = () => {
  const { t } = useTranslation()
  const [activeKey, setActiveKey] = useState('0')

  const faqData = [
    {
      category: "🏨 Konaklama ve Rezervasyon",
      questions: [
        {
          question: "Nemrut Dağı'na mesafeniz kaç km?",
          answer: "Güneş Hotel, Nemrut Dağı zirvesine sadece 2 km mesafededir. Gün doğumu turu için otelimizden araçla yaklaşık 10 dakikada zirveye ulaşabilirsiniz. Bölgedeki en yakın otel olarak misafirlerimize büyük kolaylık sağlıyoruz."
        },
        {
          question: "Otel rezervasyonu nasıl yapabilirim?",
          answer: "Online rezervasyon için web sitemizden iletişim formunu doldurabilir, telefonla +90 543 876 7271 numaramızı arayabilir veya WhatsApp hattımızdan bizimle iletişime geçebilirsiniz. Erken rezervasyonda özel indirim fırsatlarımız mevcuttur."
        },
        {
          question: "Check-in ve check-out saatleri nedir?",
          answer: "Check-in saatimiz 14:00, check-out saatimiz 12:00'dir. Erken giriş veya geç çıkış için müsaitlik durumuna göre ek ücret karşılığında ayarlama yapılabilir. Lütfen önceden bildiriniz."
        },
        {
          question: "İptal politikanız nedir?",
          answer: "Giriş tarihinden 7 gün öncesine kadar ücretsiz iptal yapabilirsiniz. 7 günden daha kısa sürede yapılan iptallerde 1 gecelik ücret tahsil edilir. Özel günlerde (bayram, yılbaşı) farklı iptal koşulları uygulanabilir."
        },
        {
          question: "Kaç otel odası var? Kapasiteniz nedir?",
          answer: "Otelimizde toplam 10 oda bulunmaktadır. 25 yatak kapasitemiz ile çift kişilik, üçlü ve aile odaları (5 kişilik) seçeneklerimiz mevcuttur. Tüm odalarımız dağ manzaralıdır."
        },
        {
          question: "Oda fiyatları ne kadar?",
          answer: "2026 sezon fiyatlarımız: Standart/Çift kişilik oda €85/gece, Üçlü oda €115/gece, Aile odası (5 kişi) €145/gece. Fiyatlarımıza kahvaltı ve akşam yemeği dahildir. Yaz sezonu ve bayramlarda fiyatlar değişkenlik gösterebilir."
        }
      ]
    },
    {
      category: "🌄 Nemrut Dağı ve Turlar",
      questions: [
        {
          question: "Gün doğumu turu için hangi saatte kalkılmalı?",
          answer: "Gün doğumu turları için yaz aylarında (Mayıs-Eylül) saat 04:00-04:30, kış aylarında (Ekim-Nisan) 05:00-05:30 arası hareket edilir. Mevsime göre güneş doğuş saatleri değiştiği için güncel bilgi için resepsiyonumuzu arayabilirsiniz. Güneş Hotel'den zirveye sadece 10 dakika mesafe!"
        },
        {
          question: "Nemrut Dağı giriş ücreti ne kadar?",
          answer: "2026 yılı için Nemrut Dağı Milli Parkı giriş ücreti yetişkinler için 200 TL, öğrenciler için 100 TL'dir. Müze kart geçerlidir. 12 yaş altı çocuklar ücretsizdir. Ücretler mevsimsel olarak değişebilir."
        },
        {
          question: "Nemrut Dağı'na ne zaman gidilir? En iyi mevsim hangisi?",
          answer: "Nemrut Dağı'nı yıl boyunca ziyaret edebilirsiniz. En popüler dönem Mayıs-Ekim arasıdır. Haziran-Eylül arası en sıcak dönemdir (açık hava, net görüş). Kış aylarında kar manzarası eşsiz güzellikte ancak yollar zorlu olabilir. Bahar (Nisan-Mayıs) ve sonbahar (Eylül-Ekim) ideal dönemlerdir."
        },
        {
          question: "Gün batımı turu da var mı?",
          answer: "Evet, gün batımı turları da düzenliyoruz. Genellikle günbatımından 1.5-2 saat önce hareket edilir. Gün batımı turları daha az kalabalık olur ve fotoğraf için harika fırsatlar sunar. İdeal plan: Akşam gün batımı + ertesi sabah gün doğumu."
        },
        {
          question: "Nemrut'a çıkış yolu nasıl? Zorlu mu?",
          answer: "Otelimizden Nemrut zirvesine kadar asfalt yol bulunmaktadır. Otopark alanından zirveye 400 metre taş merdivenle (15-20 dakika) çıkılır. Orta zorlukta bir yürüyüştür. Rahat ayakkabı, su ve yaz aylarında güneş kremi şarttır."
        },
        {
          question: "Nemrut'ta çadırla konaklama yapılabilir mi?",
          answer: "Resmi olarak Nemrut Dağı Milli Parkı içinde çadırla konaklama yasaktır. Güvenlik ve konfor açısından otel konaklaması önerilir. Güneş Hotel zirveye en yakın otel olarak 2 km mesafededir."
        }
      ]
    },
    {
      category: "🏡 Otel Olanakları",
      questions: [
        {
          question: "Odalarda WiFi var mı?",
          answer: "Evet, tüm odalarımızda ve ortak alanlarda ücretsiz WiFi hizmeti mevcuttur. Giriş şifresini resepsiyondan alabilirsiniz. İnternet hızı genellikle iyidir ancak dağlık bölgede olduğumuz için arada yavaşlama olabilir."
        },
        {
          question: "Otelde kahvaltı dahil mi?",
          answer: "Evet, tüm odalarımızda kahvaltı fiyata dahildir. Geleneksel Türk kahvaltısı (zeytin, peynir, yumurta, reçel, bal, tereyağı, sebzeler) ile güne başlayabilirsiniz. Özel diyet ihtiyaçlarınız varsa önceden bildirebilirsiniz."
        },
        {
          question: "Restoran var mı? Akşam yemeği servisi var mı?",
          answer: "Evet, 30 kişilik restoranımızda Türk mutfağından yemekler sunuyoruz. Akşam yemeği servisi mevcuttur (yarım pansiyon opsiyonu). Yöresel lezzetler ve ev yemekleri deneyebilirsiniz. Önceden haber vermeniz tavsiye edilir."
        },
        {
          question: "Otopark var mı?",
          answer: "Evet, otelimizin özel ve ücretsiz otopark alanı bulunmaktadır. Aracınızı güvenle park edebilirsiniz. Kapalı otopark değildir ancak güvenli bir alan içerisindedir."
        },
        {
          question: "Odalarda klima var mı?",
          answer: "Odalarımızda merkezi ısıtma sistemi bulunmaktadır. Yaz aylarında bölge iklimi serin olduğu için klima genellikle gerekli olmamaktadır. Gece sıcaklığı 15-20°C civarındadır. Kış aylarında ısıtma sistemi aktif olarak çalışır."
        },
        {
          question: "24 saat sıcak su var mı?",
          answer: "Evet, tüm odalarımızda 24 saat kesintisiz sıcak su hizmeti bulunmaktadır. Konfor ve temizlik önceliğimizdir."
        },
        {
          question: "Evcil hayvan kabul ediyor musunuz?",
          answer: "Evet, küçük ve orta boy evcil hayvanlarınızı (köpek, kedi) kabul ediyoruz. Önceden bildirim yapmanız ve evcil hayvanınızın tasmalı olması gerekmektedir."
        }
      ]
    },
    {
      category: "🚗 Ulaşım",
      questions: [
        {
          question: "Havalimanından transfer hizmeti var mı?",
          answer: "Evet, Malatya Havalimanı (145 km - 2 saat) ve Adıyaman Havalimanı (85 km - 1.5 saat)'ndan otelimize transfer hizmeti sunuyoruz. Transfer hizmetimiz ücretsizdir ve rezervasyon sırasında talebinizi bildirmeniz gerekmektedir."
        },
        {
          question: "Nemrut Dağı'na nasıl ulaşılır?",
          answer: "Nemrut'a ulaşım için üç ana rota vardır: 1) Malatya üzerinden (Pütürge - Güneş Hotel) - ÖNERİLEN, 2) Adıyaman üzerinden (Kahta - 85 km), 3) Şanlıurfa üzerinden. Otelimiz Malatya rotasında, zirveye en yakın noktadadır (2 km)."
        },
        {
          question: "Malatya'dan otele nasıl gidilir?",
          answer: "Malatya merkez'den D300 karayolu ile Pütürge istikametine gidilir (yaklaşık 120 km). Pütürge'den sonra Nemrut Dağı tabelalarını takip ederek otelimize ulaşabilirsiniz (25 km). Toplam süre yaklaşık 2-2.5 saattir."
        },
        {
          question: "Toplu taşıma ile gelinebilir mi?",
          answer: "Malatya'dan Pütürge'ye otobüs bulunmaktadır. Ancak Pütürge'den otelimize direkt toplu taşıma yoktur. Transfer hizmetimizden yararlanabilir veya taksi kiralayabilirsiniz."
        }
      ]
    },
    {
      category: "Genel Bilgiler",
      questions: [
        {
          question: "Evcil hayvan kabul ediyor musunuz?",
          answer: "Evet, küçük ve orta boy evcil hayvanları kabul ediyoruz. Ancak önceden bildirilmesi gerekmektedir. Evcil hayvanınız için ek ücret uygulanmaktadır (gecelik 100 TL)."
        },
        {
          question: "Çocuklar için indirim var mı?",
          answer: "6 yaş altı çocuklar (anne-baba ile aynı odada, ekstra yatak olmadan) ücretsizdir. 6-12 yaş arası çocuklar için %50 indirim uygulanır. 12 yaş üzeri yetişkin fiyatlandırması geçerlidir."
        },
        {
          question: "Çevrede gezilecek başka yerler var mı?",
          answer: "Evet! Nemrut'un yanı sıra çevrede Karakuş Tümülüsü (15 km), Cendere Köprüsü (20 km), Arsemia Ören Yeri (25 km), Kahta Kalesi (30 km), Perre Antik Kenti (50 km) gibi tarihi yerler bulunmaktadır. Tur paketleri hakkında bilgi alabiliriz."
        },
        {
          question: "Kredi kartı kabul ediyor musunuz?",
          answer: "Evet, tüm kredi kartlarını (Visa, MasterCard, Troy) kabul ediyoruz. Nakit ödeme de mümkündür."
        },
        {
          question: "Otel kaç yıldızlı?",
          answer: "Otelimiz butik aile oteli olarak 4 yıldız konfor seviyesinde hizmet vermektedir. Resmi yıldız sınıflandırması yerine misafir memnuniyetini ön planda tutuyoruz."
        },
        {
          question: "Ne kadar süreliğine kalmak gerekir?",
          answer: "Sadece Nemrut gün doğumunu görmek için 1 gece yeterlidir. Ancak çevredeki diğer tarihi yerleri de gezmek isterseniz 2-3 gece kalmanızı öneririz. Böylece hem gün doğumu hem gün batımını izleyebilir, Kommagene kalıntılarını gezebilirsiniz."
        }
      ]
    }
  ]

  // FAQPage Schema için
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.flatMap(category => 
      category.questions.map(q => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.answer
        }
      }))
    )
  }

  return (
    <>
      <Helmet>
        <title>Nemrut Dağı Oteli SSS | Sık Sorulan Sorular - Güneş Hotel</title>
        <meta
          name="description"
          content="Nemrut Dağı oteli hakkında merak ettikleriniz. Rezervasyon, gün doğumu turu, ulaşım, fiyatlar ve daha fazlası. 30+ soru-cevap."
        />
        <meta
          name="keywords"
          content="nemrut dağı sss, nemrut otel sorular, nemrut gün doğumu saati, nemrut giriş ücreti, nemrut ulaşım, güneş hotel sss"
        />
        <link rel="canonical" href="https://www.nemrutgunesmotel.com/sss" />
        
        {/* FAQPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Page Header */}
      <section className="faq-header">
        <div className="faq-header-overlay"></div>
        <Container>
          <div className="faq-header-content text-center text-white">
            <h1 className="display-4 fw-bold mb-3">Sık Sorulan Sorular</h1>
            <p className="lead">
              Nemrut Dağı ve Güneş Hotel hakkında merak ettikleriniz
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ Content */}
      <section className="section bg-light">
        <Container>
          <Row>
            <Col lg={10} xl={9} className="mx-auto">
              {faqData.map((category, catIndex) => (
                <div key={catIndex} className="faq-category mb-5">
                  <h2 className="category-title mb-4">
                    <i className="fas fa-folder-open text-primary me-2"></i>
                    {category.category}
                  </h2>
                  <Accordion defaultActiveKey="0" flush>
                    {category.questions.map((item, qIndex) => {
                      const itemKey = `${catIndex}-${qIndex}`
                      return (
                        <Accordion.Item 
                          key={itemKey} 
                          eventKey={itemKey}
                          className="mb-3 faq-accordion-item"
                        >
                          <Accordion.Header>
                            <i className="fas fa-question-circle text-warning me-3"></i>
                            {item.question}
                          </Accordion.Header>
                          <Accordion.Body>
                            <p className="mb-0">{item.answer}</p>
                          </Accordion.Body>
                        </Accordion.Item>
                      )
                    })}
                  </Accordion>
                </div>
              ))}
            </Col>
          </Row>

          {/* Contact CTA */}
          <Row className="mt-5">
            <Col lg={8} className="mx-auto">
              <div className="contact-cta text-center p-5 bg-white rounded shadow-sm">
                <h3 className="mb-3">Başka sorunuz mu var?</h3>
                <p className="text-muted mb-4">
                  Size yardımcı olmaktan mutluluk duyarız. Bizimle iletişime geçin!
                </p>
                <div className="cta-buttons">
                  <a 
                    href="tel:+905438767271" 
                    className="btn btn-primary btn-lg me-3 mb-2"
                  >
                    <i className="fas fa-phone me-2"></i>
                    +90 543 876 7271
                  </a>
                  <a 
                    href="https://wa.me/905438767271" 
                    className="btn btn-success btn-lg mb-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-whatsapp me-2"></i>
                    WhatsApp
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default FAQ
