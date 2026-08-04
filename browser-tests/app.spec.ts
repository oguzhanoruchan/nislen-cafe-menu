import { expect, test } from '@playwright/test'

test('renders the public menu and key restaurant pages', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /good food/i })).toBeVisible()
  await page.goto('/contact')
  await expect(page.getByRole('heading', { name: /contact & visit/i })).toBeVisible()
  await page.goto('/reservations')
  await expect(page.getByRole('heading', { name: /reservations/i })).toBeVisible()
})
