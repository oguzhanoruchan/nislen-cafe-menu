import { useMemo, useState } from 'react'

type Campaign = {
  title: string
  detail: string
}

const campaigns: Campaign[] = [
  {
    title: 'Kahve Keyfi',
    detail: 'Sabah saatlerinde kahve keyfini Nislen lezzetleriyle yaşayın.'
  },
  {
    title: 'Magnolya Günleri',
    detail: 'Taptaze magnolyalarımızı deneyin.'
  },
  {
    title: 'Nargile Saati',
    detail: 'Akşam buluşmalarınızı premium nargile seçenekleriyle tamamlayın.'
  }
]

export function CampaignSlider() {
  const [index, setIndex] = useState(0)
  const current = useMemo(() => campaigns[index], [index])

  const showPrev = () => {
    setIndex((value) => (value - 1 + campaigns.length) % campaigns.length)
  }

  const showNext = () => {
    setIndex((value) => (value + 1) % campaigns.length)
  }

  return (
    <section className="campaign-slider" aria-label="Kampanyalar">
      <div className="campaign-content">
        <p className="campaign-tag">KAMPANYA</p>
        <h2>{current.title}</h2>
        <p>{current.detail}</p>
      </div>
      <div className="campaign-controls">
        <button onClick={showPrev} aria-label="Önceki kampanya">
          Geri
        </button>
        <span>
          {index + 1} / {campaigns.length}
        </span>
        <button onClick={showNext} aria-label="Sonraki kampanya">
          İleri
        </button>
      </div>
    </section>
  )
}
