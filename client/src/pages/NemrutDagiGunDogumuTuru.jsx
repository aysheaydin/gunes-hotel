import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Row, Col, Card, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import EnhancedStructuredData from '@components/common/EnhancedStructuredData'
import './NemrutDagiOteli.scss'

const NemrutDagiGunDogumuTuru = () => {
  const { t } = useTranslation()
  
  return (
    <>
      <Helmet>
        <title>{t('seoPages.nemrutGunDogumuTuru.title')}</title>
        <meta
          name="description"
          content={t('seoPages.nemrutGunDogumuTuru.description')}
        />
        <meta
          name="keywords"
          content={t('seoPages.nemrutGunDogumuTuru.keywords')}
        />
        <link rel="canonical" href="https://www.nemrutgunesmotel.com/nemrut-dagi-gun-dogumu-turu" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Nemrut Dağı Gün Doğumu Turu - Kapsamlı Rehber 2026" />
        <meta property="og:description" content="UNESCO Dünya Mirası Nemrut Dağı'nda gün doğumu izlemek için bilmeniz gereken her şey." />
        <meta property="og:url" content="https://www.nemrutgunesmotel.com/nemrut-dagi-gun-dogumu-turu" />
        <meta property="og:image" content="https://www.nemrutgunesmotel.com/img/slide-3.webp" />
      </Helmet>
      <EnhancedStructuredData page="nemrut-gundogumu" />

      <article className="nemrut-guide-page">
        <section className="page-header">
          <div className="page-header-overlay"></div>
          <Container>
            <h1 className="display-4 text-white fw-bold mb-3">
              {t('seoPages.nemrutGunDogumuTuru.hero.title')}
            </h1>
            <p className="lead text-white-50">
              {t('seoPages.nemrutGunDogumuTuru.hero.subtitle')}
            </p>
          </Container>
        </section>

        <section className="section">
          <Container>
            <Row>
              <Col lg={8} className="mx-auto">
                <article className="content-article">
                  
                  <div className="alert alert-primary" role="alert">
                    <i className="fas fa-info-circle me-2"></i>
                    {t('seoPages.nemrutGunDogumuTuru.quickInfo')}
                  </div>

                  <h2>{t('seoPages.nemrutGunDogumuTuru.headings.whatIs')}</h2>
                  <p className="lead">
                    Nemrut Dağı gün doğumu turu, UNESCO Dünya Mirası Listesi'ndeki bu eşsiz antik 
                    yapıda, 2.134 metre yükseklikte, Kommagene Kralı I. Antiochos'un yaptırdığı 
                    <strong> dev heykeller arasında güneşin doğuşunu</strong> izlemek için yapılan 
                    erken sabah turlarıdır.
                  </p>

                  <Row className="my-5">
                    <Col md={6}>
                      <img 
                        src="/img/slide-3.webp" 
                        alt="Nemrut Dağı Gün Doğumu" 
                        className="img-fluid rounded shadow mb-3"
                        loading="lazy"
                      />
                    </Col>
                    <Col md={6}>
                      <h3 className="h5">{t('seoPages.nemrutGunDogumuTuru.headings.whySpecial')}</h3>
                      <ul className="fa-ul">
                        <li><span className="fa-li"><i className="fas fa-star text-warning"></i></span>
                          MÖ 62'den kalma <strong>9 metre yüksekliğinde</strong> dev heykeller
                        </li>
                        <li><span className="fa-li"><i className="fas fa-star text-warning"></i></span>
                          Güneş ışınlarının heykelleri aydınlatma anı
                        </li>
                        <li><span className="fa-li"><i className="fas fa-star text-warning"></i></span>
                          360 derece panoramik dağ manzarası
                        </li>
                        <li><span className="fa-li"><i className="fas fa-star text-warning"></i></span>
                          UNESCO Dünya Mirası statüsü
                        </li>
                        <li><span className="fa-li"><i className="fas fa-star text-warning"></i></span>
                          National Geographic'in önce ölmeden görülmesi gereken yerler listesinde
                        </li>
                      </ul>
                    </Col>
                  </Row>

                  <h2>{t('seoPages.nemrutGunDogumuTuru.headings.tourTimes')}</h2>
                  
                  <p>
                    Gün doğumu saati mevsime göre değişir. Aşağıdaki tablo size planlama yapmada yardımcı olacaktır:
                  </p>

                  <Table striped bordered hover responsive className="mt-3">
                    <thead className="table-primary">
                      <tr>
                        <th>{t('seoPages.nemrutGunDogumuTuru.tableHeaders.period')}</th>
                        <th>{t('seoPages.nemrutGunDogumuTuru.tableHeaders.sunriseTime')}</th>
                        <th>{t('seoPages.nemrutGunDogumuTuru.tableHeaders.departureTime')}</th>
                        <th>{t('seoPages.nemrutGunDogumuTuru.tableHeaders.arrivalTime')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Nisan-Mayıs</strong></td>
                        <td>05:30 - 06:00</td>
                        <td>04:30</td>
                        <td>04:40</td>
                      </tr>
                      <tr>
                        <td><strong>Haziran-Ağustos</strong></td>
                        <td>05:00 - 05:30</td>
                        <td>04:00</td>
                        <td>04:10</td>
                      </tr>
                      <tr>
                        <td><strong>Eylül-Ekim</strong></td>
                        <td>06:00 - 06:30</td>
                        <td>05:00</td>
                        <td>05:10</td>
                      </tr>
                      <tr>
                        <td><strong>Kasım-Mart</strong> (Kış)</td>
                        <td>06:30 - 07:30</td>
                        <td>05:30 - 06:30</td>
                        <td>05:40 - 06:40</td>
                      </tr>
                    </tbody>
                  </Table>

                  <div className="alert alert-success mt-3">
                    <i className="fas fa-check-circle me-2"></i>
                    {t('seoPages.nemrutGunDogumuTuru.alert.gunesHotel')}
                  </div>

                  <h2>{t('seoPages.nemrutGunDogumuTuru.headings.bestMonths')}</h2>
                  
                  <Row className="my-4">
                    <Col md={4}>
                      <Card className="text-center mb-3 border-success">
                        <Card.Body>
                          <i className="fas fa-check-circle fa-3x text-success mb-3"></i>
                          <h4 className="h5">Haziran - Eylül</h4>
                          <p className="small mb-0">
                            <strong>{t('seoPages.nemrutGunDogumuTuru.seasons.best')}</strong><br />
                            Açık hava, ılık sıcaklık, temiz görüş
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card className="text-center mb-3 border-warning">
                        <Card.Body>
                          <i className="fas fa-sun fa-3x text-warning mb-3"></i>
                          <h4 className="h5">Nisan - Mayıs</h4>
                          <p className="small mb-0">
                            <strong>{t('seoPages.nemrutGunDogumuTuru.seasons.good')}</strong><br />
                            Yağmur ihtimali, serin hava, yeşil doğa
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card className="text-center mb-3 border-info">
                        <Card.Body>
                          <i className="fas fa-snowflake fa-3x text-info mb-3"></i>
                          <h4 className="h5">Kasım - Mart</h4>
                          <p className="small mb-0">
                            <strong>{t('seoPages.nemrutGunDogumuTuru.seasons.winter')}</strong><br />
                            Karlı manzara, soğuk, yol kapanma riski
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  <h2>{t('seoPages.nemrutGunDogumuTuru.headings.whatToWear')}</h2>
                  
                  <Card className="mb-4 border-warning">
                    <Card.Header className="bg-warning text-dark fw-bold">
                      <i className="fas fa-tshirt me-2"></i>Giyim Önerileri
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={6}>
                          <h5 className="h6 text-success">{t('seoPages.nemrutGunDogumuTuru.clothing.summer')}</h5>
                          <ul className="small">
                            <li>Hafif mont veya sweatshirt (sabah serin olur)</li>
                            <li>Rahat pantolon veya şort</li>
                            <li>Spor ayakkabı veya trekking ayakkabısı</li>
                            <li>Şapka (güneş için)</li>
                            <li>Güneş gözlüğü</li>
                          </ul>
                        </Col>
                        <Col md={6}>
                          <h5 className="h6 text-info">{t('seoPages.nemrutGunDogumuTuru.clothing.winter')}</h5>
                          <ul className="small">
                            <li>Kalın mont (2.100m'de -10°C olabilir)</li>
                            <li>Termal iç çamaşır</li>
                            <li>Eldiven, bere, atkı</li>
                            <li>Kar botları</li>
                            <li>Çok katlı giyim (layering)</li>
                          </ul>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>

                  <div className="alert alert-danger">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {t('seoPages.nemrutGunDogumuTuru.alert.important')}
                  </div>

                  <h2>{t('seoPages.nemrutGunDogumuTuru.headings.photoTips')}</h2>
                  
                  <Card className="mb-4">
                    <Card.Body>
                      <h5><i className="fas fa-camera me-2 text-primary"></i>Profesyonel Fotoğraf Çekimi İçin</h5>
                      <Row>
                        <Col md={6}>
                          <h6 className="text-primary">Teknik Ayarlar</h6>
                          <ul className="small">
                            <li><strong>Tripod:</strong> Mutlaka tripod kullanın (uzun pozlama için)</li>
                            <li><strong>ISO:</strong> 100-400 arası</li>
                            <li><strong>Diyafram:</strong> f/8 - f/11</li>
                            <li><strong>Enstantane:</strong> 1/125 - 1/500</li>
                            <li><strong>Kompozisyon:</strong> Heykelleri ön planda, güneşi arka planda</li>
                          </ul>
                        </Col>
                        <Col md={6}>
                          <h6 className="text-success">Zamanlama</h6>
                          <ul className="small">
                            <li>Gün doğumundan <strong>30 dakika önce</strong> yerinizi alın</li>
                            <li><strong>Blue Hour:</strong> Gün doğumundan 20 dk önce (en iyi ışık)</li>
                            <li><strong>Golden Hour:</strong> Güneş doğduktan sonraki 30 dk</li>
                            <li>Heykellerin gölgeleriyle oynamayı deneyin</li>
                            <li>Panoramik çekim için geniş açı lens idealdir</li>
                          </ul>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>

                  <h2>{t('seoPages.nemrutGunDogumuTuru.headings.pricing')}</h2>
                  
                  <Row className="my-4">
                    <Col md={6}>
                      <Card className="mb-3 border-primary h-100">
                        <Card.Header className="bg-primary text-white">
                          <strong><i className="fas fa-hotel me-2"></i>Güneş Hotel Misafirleri</strong>
                        </Card.Header>
                        <Card.Body>
                          <h4 className="text-primary mb-3">ÜCRETSİZ Transfer</h4>
                          <p className="small mb-2">Otel konaklaması yapan misafirlerimize:</p>
                          <ul className="fa-ul small">
                            <li><span className="fa-li"><i className="fas fa-check text-success"></i></span>
                              Otelden zirveye ücretsiz transfer
                            </li>
                            <li><span className="fa-li"><i className="fas fa-check text-success"></i></span>
                              Yerel rehber bilgilendirmesi
                            </li>
                            <li><span className="fa-li"><i className="fas fa-check text-success"></i></span>
                              Sabah çayı/kahve servisi
                            </li>
                            <li><span className="fa-li"><i className="fas fa-check text-success"></i></span>
                              Geri dönüşte kahvaltı hazır
                            </li>
                          </ul>
                          <p className="text-muted small mb-0">
                            + Nemrut Milli Parkı giriş ücreti: €10 (kişi başı)
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card className="mb-3 border-secondary h-100">
                        <Card.Header className="bg-secondary text-white">
                          <strong><i className="fas fa-bus me-2"></i>Günübirlik Turlar (Kahta'dan)</strong>
                        </Card.Header>
                        <Card.Body>
                          <h4 className="text-secondary mb-3">€85 - €145</h4>
                          <p className="small mb-2">Kahta veya Adıyaman çıkışlı turlar:</p>
                          <ul className="fa-ul small">
                            <li><span className="fa-li"><i className="fas fa-minus text-danger"></i></span>
                              Otellerden 03:00-04:00'te kalkış
                            </li>
                            <li><span className="fa-li"><i className="fas fa-minus text-danger"></i></span>
                              1.5-2 saat yol süresi
                            </li>
                            <li><span className="fa-li"><i className="fas fa-check text-success"></i></span>
                              Profesyonel rehber
                            </li>
                            <li><span className="fa-li"><i className="fas fa-check text-success"></i></span>
                              Grup turları
                            </li>
                          </ul>
                          <p className="text-muted small mb-0">
                            + Nemrut giriş ücreti genellikle dahil değildir
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  <h2>{t('seoPages.nemrutGunDogumuTuru.headings.faq')}</h2>
                  
                  <Card className="mb-3">
                    <Card.Body>
                      <h5 className="mb-3">❓ Nemrut'a gece çıkılabilir mi? Yıldızlı gökyüzü için?</h5>
                      <p className="mb-0">
                        Evet! Nemrut Dağı aynı zamanda <strong>yıldız gözlemi</strong> için de harikadır. 
                        Işık kirliliği minimum seviyededir. Güneş Hotel'den gece turları organize edilebilir. 
                        Gece turu + gün doğumu paketi misafirlerimizin favorisidir.
                      </p>
                    </Card.Body>
                  </Card>

                  <Card className="mb-3">
                    <Card.Body>
                      <h5 className="mb-3">❓ Gün doğumu ve gün batımı hangisi daha güzel?</h5>
                      <p className="mb-0">
                        Her ikisi de eşsizdir! <strong>Gün doğumu</strong> daha popülerdir çünkü güneş 
                        doğu terasındaki heykelleri tam karşıdan aydınlatır. <strong>Gün batımı</strong> 
                        ise batı terasında daha sakin bir deneyim sunar. İdeal plan: Akşam gün batımı, 
                        ertesi sabah gün doğumu.
                      </p>
                    </Card.Body>
                  </Card>

                  <Card className="mb-3">
                    <Card.Body>
                      <h5 className="mb-3">❓ Nemrut'a yürüyerek çıkılır mı?</h5>
                      <p className="mb-0">
                        Otopark alanından zirveye <strong>400 metre taş merdivenle çıkış</strong> vardır 
                        (yaklaşık 15-20 dakika). Orta zorlukta bir tırmanıştır. Yaşlılar ve çocuklar 
                        yavaş çıkabilir. Tekerlekli sandalye erişimi yoktur.
                      </p>
                    </Card.Body>
                  </Card>

                  <Card className="mb-3">
                    <Card.Body>
                      <h5 className="mb-3">❓ Nemrut'ta WC var mı?</h5>
                      <p className="mb-0">
                        Evet, park girişinde (otopark alanında) tuvaletler mevcuttur. Zirve terasında 
                        tuvalet yoktur. Gün doğumu turu öncesi otelde hazırlanmanız önerilir.
                      </p>
                    </Card.Body>
                  </Card>

                  <Card className="mb-3">
                    <Card.Body>
                      <h5 className="mb-3">❓ Engelli erişimi var mı?</h5>
                      <p className="mb-0">
                        Maalesef zirvede <strong>tekerlekli sandalye erişimi yoktur</strong>. Otopark 
                        alanından 400 metre taş merdiven çıkılması gerekir. Hareket kısıtlılığı olanlar 
                        için gün batımı terasına araçla daha yakın ulaşılabilir (ancak yine kısa bir 
                        yürüyüş gereklidir).
                      </p>
                    </Card.Body>
                  </Card>

                  {/* CTA */}
                  <div className="cta-box mt-5 p-5 bg-gradient text-white rounded text-center"
                       style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                    <i className="fas fa-mountain fa-3x mb-3"></i>
                    <h3 className="mb-3">{t('seoPages.nemrutGunDogumuTuru.cta.bookExperience')}</h3>
                    <p className="mb-4">
                      {t('seoPages.nemrutGunDogumuTuru.cta.stayWithUs')}
                    </p>
                    <Link to="/contact" className="btn btn-warning btn-lg me-3">
                      <i className="fas fa-phone-alt me-2"></i>
                      {t('seoPages.nemrutGunDogumuTuru.cta.reservation')}
                    </Link>
                    <Link to="/rooms" className="btn btn-light btn-lg">
                      <i className="fas fa-bed me-2"></i>
                      {t('seoPages.nemrutGunDogumuTuru.cta.viewRooms')}
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

export default NemrutDagiGunDogumuTuru
