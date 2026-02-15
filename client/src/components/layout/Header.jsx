import React, { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import LanguageSelector from '@components/common/LanguageSelector'
import './Header.scss'

const Header = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    // Throttle scroll event for performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [])

  const handleNavClick = useCallback(() => {
    setExpanded(false)
  }, [])

  const isActive = useCallback((path) => {
    return location.pathname === path ? 'active' : ''
  }, [location.pathname])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`} role="banner">
      <Navbar 
        expand="lg" 
        expanded={expanded} 
        onToggle={setExpanded}
        aria-label="Ana navigasyon"
      >
        <Container>
          <Navbar.Brand 
            as={Link} 
            to="/" 
            className="logo"
            aria-label="Güneş Hotel ana sayfa"
          >
            <img 
              src="/img/logo.webp" 
              alt="" 
              className="logo-img"
              width="50"
              height="50"
              loading="eager"
              fetchPriority="high"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
              aria-hidden="true"
            />
            <div className="logo-text">
              <span className="logo-main" aria-label="Güneş">GÜNEŞ</span>
              <span className="logo-sub" aria-label="Hotel">HOTEL</span>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle 
            aria-controls="navbar-nav"
            aria-label="Navigasyon menüsünü aç/kapat"
          />

          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-lg-center" as="ul" role="menubar">
              <Nav.Item as="li" role="none">
                <Nav.Link 
                  as={Link} 
                  to="/" 
                  className={isActive('/')}
                  onClick={handleNavClick}
                  role="menuitem"
                  aria-current={location.pathname === '/' ? 'page' : undefined}
                >
                  {t('nav.home')}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" role="none">
                <Nav.Link 
                  as={Link} 
                  to="/about" 
                  className={isActive('/about')}
                  onClick={handleNavClick}
                  role="menuitem"
                  aria-current={location.pathname === '/about' ? 'page' : undefined}
                >
                  {t('nav.about')}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" role="none">
                <Nav.Link 
                  as={Link} 
                  to="/rooms" 
                  className={isActive('/rooms')}
                  onClick={handleNavClick}
                  role="menuitem"
                  aria-current={location.pathname === '/rooms' ? 'page' : undefined}
                >
                  {t('nav.rooms')}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" role="none">
                <Nav.Link 
                  as={Link} 
                  to="/gallery" 
                  className={isActive('/gallery')}
                  onClick={handleNavClick}
                  role="menuitem"
                  aria-current={location.pathname === '/gallery' ? 'page' : undefined}
                >
                  {t('nav.gallery')}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" role="none">
                <Nav.Link 
                  as={Link} 
                  to="/contact" 
                  className={isActive('/contact')}
                  onClick={handleNavClick}
                  role="menuitem"
                  aria-current={location.pathname === '/contact' ? 'page' : undefined}
                >
                  {t('nav.contact')}
                </Nav.Link>
              </Nav.Item>
              
              <div className="nav-divider d-none d-lg-block" aria-hidden="true"></div>
              
              <Nav.Item as="li" role="none" className="d-flex align-items-center">
                <LanguageSelector />
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
