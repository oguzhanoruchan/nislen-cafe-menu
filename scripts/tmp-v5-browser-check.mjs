import { chromium } from 'playwright'

const baseUrl = 'http://127.0.0.1:4174/'
const viewports = [
  ['desktop', { width: 1366, height: 900 }, 3],
  ['tablet', { width: 1024, height: 1000 }, 3],
  ['mobile', { width: 390, height: 844 }, 1]
]

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

const browser = await chromium.launch({ headless: true })

for (const [name, viewport, expectedColumns] of viewports) {
  const page = await browser.newPage({ viewport })
  const consoleErrors = []
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })

  await page.goto(baseUrl, { waitUntil: 'networkidle' })

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  const columnCount = await page.locator('.menu-image-grid').first().evaluate(
    (element) => (getComputedStyle(element).gridTemplateColumns.match(/px/g) ?? []).length
  )
  assert(!overflow, `${name}: horizontal overflow`)
  assert(columnCount === expectedColumns, `${name}: unexpected grid columns`)

  const card = page.locator('.menu-image-card').first()
  await card.click()
  const modalImage = page.locator('.product-modal-image')
  await modalImage.waitFor()

  const [cardSource, modalSource, modalHeight, decorationDisplay] = await Promise.all([
    card.locator('img').getAttribute('src'),
    modalImage.getAttribute('src'),
    modalImage.evaluate((element) => element.getBoundingClientRect().height),
    page.locator('.menu-image-modal-decoration.is-left').evaluate(
      (element) => getComputedStyle(element).display
    )
  ])

  assert(cardSource?.endsWith('.webp'), `${name}: card is not webp`)
  assert(cardSource === modalSource, `${name}: card/modal webp mismatch`)
  assert(modalHeight > viewport.height * 0.45, `${name}: modal image too small`)
  assert(decorationDisplay !== 'none', `${name}: modal decoration missing`)
  assert(consoleErrors.length === 0, `${name}: console errors`)

  await page.screenshot({ path: `/tmp/v5-${name}.png`, fullPage: false })
  console.log(`${name}: modal and card checks passed`)
  await page.close()
}

await browser.close()
