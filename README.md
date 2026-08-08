# Nislen Café QR Menü

Bu proje, Nislen Café'nin müşteri odaklı QR menüsünü React + Vite + TypeScript ile sade bir yapıda sunar.

## Proje Yapısı

- `public/images/nislen-logo.png` logo
- `src/data/menu.ts` tek menü veri kaynağı
- `src/components/` arayüz bileşenleri
- `src/App.tsx` merkezi ekran akışı
- `src/styles.css` tekil stil dosyası

## Komutlar

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Notlar

- Vite `base` değeri `/` olarak ayarlanmıştır.
- Ürün, kategori ve fiyat güncellemeleri için sadece `src/data/menu.ts` düzenlenir.
- Logo yolu `/images/nislen-logo.png` şeklindedir.
