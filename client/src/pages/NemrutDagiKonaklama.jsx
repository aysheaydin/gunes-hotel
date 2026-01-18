import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import EnhancedStructuredData from '@components/common/EnhancedStructuredData'
import './NemrutDagiOteli.scss'

const NemrutDagiKonaklama = () => {
  return (
    <>
      <Helmet>
        <title>Nemrut Dağı Konaklama - Pansiyon ve Otel Seçenekleri | Güneş Hotel</title>
        <meta
          name="description"
          content="Nemrut Dağı konaklama rehberi. En yakın oteller, pansiyonlar, fiyatlar, gün doğumu turları hakkında kapsamlı bilgi. 2 km mesafede konforlu konaklama."
        />
        <meta
          name="keywords"
          content="nemrut dağı konaklama, nemrut pansiyon, nemrut otel fiyatları, nemrut nerede kalınır, nemrut konaklama yerleri"
        />
        <link rel="canonical" href="https://www.nemrutgunesmotel.com/nemrut-dagi-konaklama" />
        <meta property="og:title" content="Nemrut Dağı Konaklama Rehberi - Güneş Hotel" />
        <meta property="og:description" content="Nemrut Dağı'nda nerede kalınır? En yakın oteller, fiyatlar ve ipuçları." />
        <meta property="og:url" content="https://www.nemrutgunesmotel.com/nemrut-dagi-konaklama" />
        <meta property="og:type" content="article" />
      </Helmet>
      <EnhancedStructuredData page="home" />

      <article className="nemrut-guide-page">
        {/* Hero */}
        <section className="page-header">
          <div className="page-header-overlay"></div>
          <Container>
            <Row className="align-items-center min-vh-50">
              <Col lg={8}>
                <h1 className="display-4 text-white fw-bold mb-3">
                  Nemrut Dağı Konaklama Rehberi
                </h1>
                <p className="lead text-white-50 mb-4">
                  UNESCO Dünya Mirası Nemrut Dağı'nı ziyaret ederken nerede kalmalı? 
                  En iyi konaklama seçenekleri, fiyatlar ve pratik bilgiler.
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        {/* İçindekiler */}
        <section className="section bg-light">
          <Container>
            <Card className="shadow-sm">
              <Card.Body>
                <h2 className="h4 mb-4">📋 İçindekiler</h2>
                <Row>
                  <Col md={6}>
                    <ul className="content-list">
                      <li><a href="#nerede-kalinir">Nemrut Dağı'nda Nerede Kalınır?</a></li>
                      <li><a href="#gunes-hotel">Güneş Hotel - En Yakın Seçenek</a></li>
                      <li><a href="#konaklama-secenekleri">Diğer Konaklama Seçenekleri</a></li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <ul className="content-list">
                      <li><a href="#fiyatlar">Konaklama Fiyatları</a></li>
                      <li><a href="#ipuclari">Rezervasyon İpuçları</a></li>
                      <li><a href="#sss">Sıkça Sorulan Sorular</a></li>
                    </ul>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Container>
        </section>

        {/* Ana İçerik */}
        <section className="section" id="nerede-kalinir">
          <Container>
            <Row>
              <Col lg={8} className="mx-auto">
                <article className="content-article">
                  <h2>Nemrut Dağı'nda Nerede Kalınır?</h2>
                  <p className="lead">
                    Nemrut Dağı, Türkiye'nin Güneydoğu Anadolu Bölgesi'nde, Malatya ve Adıyaman 
                    illeri arasında yer alan 2.134 metre yüksekliğinde bir dağdır. UNESCO Dünya 
                    Mirası Listesi'nde yer alan Nemrut Dağı, özellikle gün doğumu ve gün batımı 
                    manzaralarıyla ünlüdür.
                  </p>

                  <p>
                    Nemrut Dağı'nı ziyaret edecek turistler için konaklama genellikle <strong>üç 
                    farklı bölgede</strong> mümkündür:
                  </p>

                  <div className="info-cards mt-4 mb-5">
                    <Card className="mb-3 border-primary">
                      <Card.Body>
                        <h4 className="text-primary">
                          <i className="fas fa-star me-2"></i>1. Karadut Köyü / Büyüköz (Malatya tarafı) - ÖNERİLEN
                        </h4>
                        <p className="mb-2">
                          <strong>Mesafe:</strong> Nemrut zirvesine 2-7 km<br />
                          <strong>Avantajlar:</strong> En yakın konaklama, gün doğumu için ideal, sessiz ve otantik<br />
                          <strong>Dezavantajlar:</strong> Sınırlı seçenek, küçük köy
                        </p>
                        <p className="mb-0 text-success fw-bold">
                          ✅ Güneş Hotel bu bölgede ve zirveye en yakın oteldir (2 km)
                        </p>
                      </Card.Body>
                    </Card>

                    <Card className="mb-3">
                      <Card.Body>
                        <h4>2. Kahta (Adıyaman)</h4>
                        <p className="mb-0">
                          <strong>Mesafe:</strong> Nemrut'a 85 km<br />
                          <strong>Avantajlar:</strong> Daha fazla otel seçeneği, restoran ve market<br />
                          <strong>Dezavantajlar:</strong> Uzak mesafe, erken kalkış gerektiriyor (03:00-04:00)
                        </p>
                      </Card.Body>
                    </Card>

                    <Card className="mb-3">
                      <Card.Body>
                        <h4>3. Malatya Merkez</h4>
                        <p className="mb-0">
                          <strong>Mesafe:</strong> Nemrut'a 145 km<br />
                          <strong>Avantajlar:</strong> Büyük şehir konforu, çok sayıda otel<br />
                          <strong>Dezavantajlar:</strong> Çok uzak, gün doğumu turu için pratik değil
                        </p>
                      </Card.Body>
                    </Card>
                  </div>

                  <div className="alert alert-warning" role="alert">
                    <i className="fas fa-lightbulb me-2"></i>
                    <strong>Tavsiye:</strong> Nemrut Dağı gün doğumunu kaçırmamak için <strong>dağa 
                    en yakın otellerde</strong> konaklama yapılması şiddetle tavsiye edilir. Kahta veya 
                    Malatya'dan sabah 03:00-04:00'te yola çıkmak oldukça yorucudur.
                  </div>

                  <h2 id="gunes-hotel" className="mt-5">Güneş Hotel - Nemrut Dağı'na En Yakın Otel</h2>
                  
                  <Row className="align-items-center my-4">
                    <Col md={6}>
                      <img 
                        src="/img/motel.webp" 
                        alt="Güneş Hotel - Nemrut Dağı" 
                        className="img-fluid rounded shadow"
                        loading="lazy"
                      />
                    </Col>
                    <Col md={6}>
                      <h3 className="h5 mb-3">Neden Güneş Hotel?</h3>
                      <ul className="fa-ul">
                        <li><span className="fa-li"><i className="fas fa-check text-success"></i></span>
                          <strong>Nemrut zirvesine 2 km</strong> - En yakın otel
                        </li>
                        <li><span className="fa-li"><i className="fas fa-check text-success"></i></span>
                          Gün doğumu için <strong>sadece 10 dakika</strong> mesafe
                        </li>
                        <li><span className="fa-li"><i className="fas fa-check text-success"></i></span>
                          <strong>30+ yıl</strong> deneyimli aile işletmesi
                        </li>
                        <li><span className="fa-li"><i className="fas fa-check text-success"></i></span>
                          24 saat sıcak su, ücretsiz WiFi
                        </li>
                        <li><span className="fa-li"><i className="fas fa-check text-success"></i></span>
                          Kahvaltı dahil, restorant hizmeti
                        </li>
                        <li><span className="fa-li"><i className="fas fa-check text-success"></i></span>
                          Ücretsiz otopark, transfer hizmeti
                        </li>
                      </ul>
                      <Link to="/contact" className="btn btn-primary mt-3">
                        <i className="fas fa-calendar-check me-2"></i>
                        Hemen Rezervasyon Yap
                      </Link>
                    </Col>
                  </Row>

                  <h2 id="konaklama-secenekleri" className="mt-5">Diğer Konaklama Seçenekleri</h2>
                  
                  <h3 className="h5 mt-4">Karadut Bölgesi Otelleri</h3>
                  <p>
                    Karadut ve çevresinde birkaç küçük otel ve pansiyon bulunmaktadır. Güneş Hotel 
                    bu bölgedeki en köklü ve tecrübeli işletmedir. Diğer seçenekler genellikle 
                    daha küçük kapasiteli ve temel hizmet sunan tesislerdir.
                  </p>

                  <h3 className="h5 mt-4">Kahta Otelleri</h3>
                  <p>
                    Kahta ilçe merkezinde 3-4 yıldızlı oteller, butik oteller ve pansiyonlar mevcuttur. 
                    Ancak Nemrut'a 85 km uzaklıkta olması nedeniyle gün doğumu turları için erken 
                    kalkış (03:00-04:00) gerektirmektedir.
                  </p>

                  <h2 id="fiyatlar" className="mt-5">Nemrut Dağı Konaklama Fiyatları (2026)</h2>
                  
                  <div className="price-table mt-4">
                    <Card className="mb-3">
                      <Card.Header className="bg-primary text-white">
                        <strong>Güneş Hotel (Karadut - Nemrut'a 2 km)</strong>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col sm={6}>
                            <p className="mb-2">🛏️ Standart/Çift Kişilik Oda: <strong>€85 / gece</strong></p>
                            <p className="mb-2">🛏️ Üçlü Oda: <strong>€115 / gece</strong></p>
                          </Col>
                          <Col sm={6}>
                            <p className="mb-2">🛏️ Aile Odası (5 kişi): <strong>€145 / gece</strong></p>
                            <p className="mb-0">✅ <small>Kahvaltı & akşam yemeği dahil, 24 saat sıcak su</small></p>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>

                    <Card className="mb-3">
                      <Card.Header>
                        <strong>Kahta Otelleri (Nemrut'a 85 km)</strong>
                      </Card.Header>
                      <Card.Body>
                        <p className="mb-0">Fiyatlar: <strong>€50 - €150 / gece</strong> arası değişmektedir.</p>
                        <p className="text-muted small mb-0">Not: Mesafe uzak olduğu için transfer veya tur ücreti ekstra</p>
                      </Card.Body>
                    </Card>
                  </div>

                  <div className="alert alert-info mt-4">
                    <i className="fas fa-info-circle me-2"></i>
                    <strong>Önemli Not:</strong> Yaz sezonu (Haziran-Eylül) ve bayram dönemlerinde 
                    fiyatlar %20-40 artabilir. Erken rezervasyon yapmanız önerilir.
                  </div>

                  <h2 id="ipuclari" className="mt-5">Nemrut Konaklama İpuçları</h2>
                  
                  <div className="tips-list">
                    <Card className="mb-3 border-success">
                      <Card.Body>
                        <h5 className="text-success">
                          <i className="fas fa-calendar-alt me-2"></i>Erken Rezervasyon Yapın
                        </h5>
                        <p className="mb-0">
                          Özellikle yaz sezonunda (Haziran-Eylül) Nemrut'a en yakın otellerin 
                          kapasitesi sınırlıdır. En az 1-2 hafta önceden rezervasyon yapmanız tavsiye edilir.
                        </p>
                      </Card.Body>
                    </Card>

                    <Card className="mb-3 border-warning">
                      <Card.Body>
                        <h5 className="text-warning">
                          <i className="fas fa-sun me-2"></i>Gün Doğumu İçin Yakın Kalın
                        </h5>
                        <p className="mb-0">
                          Nemrut Dağı'nın en büyük cazibesi gün doğumudur. Kahta veya Malatya'dan 
                          sabah erken saatlerde yola çıkmak yerine, dağa 2-7 km mesafedeki otellerde 
                          konaklamayı tercih edin.
                        </p>
                      </Card.Body>
                    </Card>

                    <Card className="mb-3 border-info">
                      <Card.Body>
                        <h5 className="text-info">
                          <i className="fas fa-snowflake me-2"></i>Mevsim Şartlarını Göz Önünde Bulundurun
                        </h5>
                        <p className="mb-0">
                          Kış aylarında (Kasım-Nisan) Nemrut Dağı'nda kar ve soğuk hava yaşanır. 
                          Sıcak kıyafet getirin ve otel rezervasyonunuzda ısıtma olup olmadığını teyit edin.
                        </p>
                      </Card.Body>
                    </Card>

                    <Card className="mb-3 border-primary">
                      <Card.Body>
                        <h5 className="text-primary">
                          <i className="fas fa-shuttle-van me-2"></i>Transfer Hizmetini Kontrol Edin
                        </h5>
                        <p className="mb-0">
                          Havalimanından (Malatya veya Adıyaman) otele transfer hizmeti sunan 
                          otelleri tercih edin. Güneş Hotel misafirlerine transfer hizmeti sunmaktadır.
                        </p>
                      </Card.Body>
                    </Card>
                  </div>

                  <h2 id="sss" className="mt-5">Sıkça Sorulan Sorular</h2>
                  
                  <div className="faq-section">
                    <Card className="mb-3">
                      <Card.Body>
                        <h5 className="mb-3">❓ Nemrut Dağı'na en yakın otel hangisi?</h5>
                        <p className="mb-0">
                          Güneş Hotel, Nemrut Dağı zirvesine sadece <strong>2 km mesafede</strong> 
                          bulunan en yakın oteldir. Gün doğumu turu için otelden zirveye araçla 
                          yaklaşık 10 dakikada ulaşılır.
                        </p>
                      </Card.Body>
                    </Card>

                    <Card className="mb-3">
                      <Card.Body>
                        <h5 className="mb-3">❓ Nemrut'ta çadırla konaklama yapılabilir mi?</h5>
                        <p className="mb-0">
                          Resmi olarak Nemrut Dağı Milli Parkı içinde çadırla konaklama yasaktır. 
                          Ancak bazı turistler park dışındaki alanlarda kamp yapmaktadır. Güvenlik 
                          ve konfor açısından otel konaklaması önerilir.
                        </p>
                      </Card.Body>
                    </Card>

                    <Card className="mb-3">
                      <Card.Body>
                        <h5 className="mb-3">❓ Nemrut Dağı gün doğumu saati kaçta?</h5>
                        <p className="mb-0">
                          Gün doğumu saati mevsime göre değişir:
                          <br />• <strong>Yaz (Haziran-Ağustos):</strong> 05:00-05:30
                          <br />• <strong>İlkbahar/Sonbahar:</strong> 05:30-06:00
                          <br />• <strong>Kış (Aralık-Şubat):</strong> 06:30-07:00
                          <br />Otelden en geç gün doğumundan 30-40 dakika önce çıkılmalıdır.
                        </p>
                      </Card.Body>
                    </Card>

                    <Card className="mb-3">
                      <Card.Body>
                        <h5 className="mb-3">❓ Nemrut için kaç gün ayırmalıyım?</h5>
                        <p className="mb-0">
                          Minimum <strong>1 gece konaklama</strong> önerilir. İdeal plan:
                          <br />• <strong>1. Gün:</strong> Öğleden sonra otele varış, gün batımı turu
                          <br />• <strong>2. Gün:</strong> Gün doğumu turu, kahvaltı sonrası ayrılış
                          <br />Hem gün doğumu hem gün batımını görmek için 2 gece konaklama idealdir.
                        </p>
                      </Card.Body>
                    </Card>
                  </div>

                  {/* CTA */}
                  <div className="cta-box mt-5 p-4 bg-primary text-white rounded text-center">
                    <h3 className="mb-3">Nemrut Dağı Maceranız İçin Rezervasyon Yapın</h3>
                    <p className="mb-4">
                      Güneş Hotel'de konforlu konaklama, unutulmaz gün doğumu deneyimi ve 
                      30 yılı aşkın tecrübe sizi bekliyor.
                    </p>
                    <Link to="/contact" className="btn btn-warning btn-lg me-3">
                      <i className="fas fa-phone-alt me-2"></i>
                      Hemen Ara: +90 543 876 7271
                    </Link>
                    <Link to="/rooms" className="btn btn-light btn-lg">
                      <i className="fas fa-bed me-2"></i>
                      Odalarımızı İncele
                    </Link>
                  </div>
                </article>
              </Col>
            </Row>
          </Container>
        </section>
      </article>
    </>
  )
}

export default NemrutDagiKonaklama
