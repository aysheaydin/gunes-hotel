import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'
import { isDev } from '@utils/env'
import './ErrorBoundary.scss'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })

    // You can also log the error to an error reporting service here
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
    
    if (this.props.onReset) {
      this.props.onReset()
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="error-boundary">
          <Container>
            <div className="error-boundary-content">
              <div className="error-icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <h2>Bir şeyler yanlış gitti</h2>
              <p>Üzgünüz, bir hata oluştu. Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.</p>
              
              {isDev && this.state.error && (
                <details className="error-details">
                  <summary>Hata Detayları (Sadece geliştirme ortamında görünür)</summary>
                  <pre>
                    {this.state.error.toString()}
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}

              <div className="error-actions">
                <button 
                  className="btn btn-primary" 
                  onClick={this.handleReset}
                >
                  Tekrar Dene
                </button>
                <button 
                  className="btn btn-outline" 
                  onClick={() => window.location.href = '/'}
                >
                  Ana Sayfaya Dön
                </button>
              </div>
            </div>
          </Container>
        </div>
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
  onError: PropTypes.func,
  onReset: PropTypes.func
}

export default ErrorBoundary
