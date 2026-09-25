import { test, expect, Page } from '@playwright/test'

test.describe('Frontend', () => {
  let page: Page

  test.beforeAll(async ({ browser }, testInfo) => {
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test('renders the trimmed homepage template', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle('Wellington Adventure Centre')

    const heading = page.locator('h1').first()
    await expect(heading).toContainText('Wellington Adventure Centre')

    // Hero banner + CMS-editable tagline from the Header component
    await expect(page.locator('.hero-banner')).toBeVisible()
    const tagline = page.locator('.site-header__tagline')
    await expect(tagline).toContainText('Wellington Adventure Centre')
    await expect(tagline).toContainText('[tagline copy placeholder]')

    // No menu, no gift-voucher promo, no group promo, no feature blocks
    await expect(page.locator('.main-menu')).toHaveCount(0)
    await expect(page.locator('.product-promo')).toHaveCount(0)
    await expect(page.locator('.groups-promo')).toHaveCount(0)
    await expect(page.locator('.page-intro__cta')).toHaveCount(0)
    await expect(page.locator('.feature-block')).toHaveCount(0)

    // Exact footer component
    await expect(page.locator('footer.site-footer')).toBeVisible()
  })
})
