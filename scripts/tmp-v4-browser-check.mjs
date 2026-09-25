import { chromium } from 'playwright'

const cases = [
  ['desktop', { width: 1366, height: 900 }, 3, 260],
  ['tablet', { width: 1024, height: 1000 }, 3, 260],
  ['mobile', { width: 390, height: 844 }, 1, 145]
]

for (const [name, viewport, expectedColumns, maxBannerHeight] of cases) {
  for (let index = 0; index < 8; index++) {
    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage({ viewport })
    const errors = []
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })

    await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
    const metrics = await page.evaluate(() => {
      const banner = document.querySelector('.mural-image')?.getBoundingClientRect()
      const grid = document.querySelector('.menu-image-grid')
      return {
        overflow: document.documentElement.scrollWidth > window.innerWidth,
        columns: (getComputedStyle(grid).gridTemplateColumns.match(/px/g) || [])
          .length,
        bannerHeight: banner?.height
      }
    })

    if (
      metrics.overflow ||
      metrics.columns !== expectedColumns ||
      !metrics.bannerHeight ||
      metrics.bannerHeight > maxBannerHeight
    ) {
      throw new Error(`${name} layout: ${JSON.stringify(metrics)}`)
    }

    const categoryButtons = page.locator('.category-filter button')
    if ((await categoryButtons.count()) !== 8) {
      throw new Error(`${name}: category count mismatch`)
    }

    await categoryButtons.nth(index).click()
    const card = page.locator('.menu-image-card').first()
    await card.waitFor()
    const cardSource = await card.locator('img').getAttribute('src')
    await card.click()
    const modalSource = await page.locator('.product-modal img').getAttribute('src')

    if (
      !cardSource ||
      !modalSource ||
      !cardSource.endsWith('.webp') ||
      cardSource !== modalSource
    ) {
      throw new Error(`${name}: card/modal WEBP mismatch`)
    }

    await page.keyboard.press('Escape')
    if (index === 0) {
      await page.getByRole('button', { name: 'WiFi' }).click()
      if (!(await page.getByRole('dialog', { name: 'WiFi Bilgileri' }).isVisible())) {
        throw new Error(`${name}: WiFi dialog unavailable`)
      }
    }

    if (errors.length) {
      throw new Error(`${name}: console errors: ${errors.join(' | ')}`)
    }

    await page.screenshot({
      path: `/tmp/v4-${name}-${index}.png`,
      fullPage: false
    })
    await browser.close()
  }

  console.log(`${name}: layout, categories, modal, footer, console passed`)
}
