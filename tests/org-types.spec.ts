import { test, expect } from '@playwright/test';

test('Organisation Types UI', async ({ page }) => {
  await page.goto('https://ckd-ultrasound-ai.vercel.app/');
  await page.getByRole('textbox', { name: 'Email address' }).fill('admin@ckdhealium.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Admin@CKD123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Settings' }).click();
  await page.waitForLoadState('networkidle');

  await page.locator('button[role="combobox"]').last().click();

  const orgMenu = page.locator('[role="listbox"]').last();
  await expect(orgMenu).toBeVisible();
  await expect(orgMenu.getByText(/Private Practice/i).first()).toBeVisible({ timeout: 5000 });
  
  await expect(orgMenu).toHaveScreenshot('org-types-baseline.png', { maxDiffPixelRatio: 0.1 });
});