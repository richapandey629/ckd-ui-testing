import { test, expect } from '@playwright/test';

test('Timeline Dropdown UI', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1024 });
  await page.goto('https://ckd-ultrasound-ai.vercel.app/');

  await page.getByRole('textbox', { name: 'Email address' }).fill('admin@ckdhealium.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Admin@CKD123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.getByRole('link', { name: 'Patients' }).click();
  await page.waitForLoadState('networkidle');

  const trigger = page.locator('button:has-text("Today"), button:has-text("All")').first();
  await trigger.waitFor({ state: 'visible' });
  await trigger.click({ force: true });

  const timelineMenu = page.locator('.z-50, [role="dialog"], [data-radix-popper-content-wrapper]').last();

  await expect(timelineMenu).toBeVisible({ timeout: 15000 });
  await expect(timelineMenu).toHaveScreenshot('timeline-dropdown-baseline.png', { maxDiffPixelRatio: 0.10 });
});