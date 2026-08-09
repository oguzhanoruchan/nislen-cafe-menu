import { useEffect, useState } from 'react'

function WifiIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M17.5 12h-5.5v0" />
      <path d="M17.06 9.5A5.5 5.5 0 1 0 17.5 12" />
    </svg>
  )
}

export function FooterLinks() {
  const [wifiOpen, setWifiOpen] = useState(false)

  useEffect(() => {
    if (!wifiOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setWifiOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [wifiOpen])

  return (
    <>
      <footer className="footer-links">
        <div className="footer-links-inner">
          <button
            className="footer-link-btn"
            onClick={() => setWifiOpen(true)}
            type="button"
          >
            <WifiIcon />
            <span>WiFi</span>
          </button>
          <a
            className="footer-link-btn"
            href="https://www.instagram.com/nislenbistro/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
            <span>Instagram</span>
          </a>
          <a
            className="footer-link-btn"
            href="https://share.google/mNcReoSTCWPmwRgz3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GoogleIcon />
            <span>Google</span>
          </a>
        </div>
      </footer>

      {wifiOpen && (
        <div
          className="wifi-modal"
          onClick={() => setWifiOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="WiFi Bilgileri"
        >
          <div className="wifi-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="wifi-modal-head">
              <h2 className="wifi-modal-title">WiFi Bilgileri</h2>
              <button
                className="wifi-modal-close"
                onClick={() => setWifiOpen(false)}
                aria-label="Kapat"
                type="button"
              >
                ×
              </button>
            </div>
            <div className="wifi-modal-row">
              <span className="wifi-modal-label">Ağ Adı</span>
              <span className="wifi-modal-value">NISLEN-MUSTERİ</span>
            </div>
            <div className="wifi-modal-row">
              <span className="wifi-modal-label">Şifre</span>
              <span className="wifi-modal-value">nislen38</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
