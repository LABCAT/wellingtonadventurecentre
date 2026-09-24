import { test, expect, Page } from '@playwright/test'

test.describe('Frontend', () => {
  let page: Page

  test.beforeAll(async ({ browser }, testInfo) => {
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test('homepage smoke test', async ({ page }) => {
    const response = await page.goto('/')

    expect(response?.status()).toBe(200)
    await expect(page).toHaveTitle('Wellington Rafting')

    const heading = page.locator('h1').first()
    await expect(heading).toContainText('Wellington Rafting')

    await expect(page.locator('.site-header')).toBeVisible()
    await expect(page.locator('.main-menu')).toBeVisible()
    await expect(page.locator('footer.site-footer')).toBeVisible()
  })
})
