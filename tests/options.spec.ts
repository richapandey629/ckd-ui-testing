import { test, expect } from '@playwright/test';

test('UI', async ({ page }) => {
  await page.goto('https://ckd-ultrasound-ai.vercel.app/');
  await page.getByRole('textbox', { name: 'Email address' }).fill('admin@ckdhealium.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Admin@CKD123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.getByRole('link', { name: 'Patients' }).click();
  await page.waitForLoadState('networkidle');
  
  // THE FIX: Use :visible to target the actual button on screen
  const trigger = page.locator('button:visible').filter({ hasText: /^Patients$/i }).first();
  await trigger.click();
  
  const optionText = page.getByText('Studies', { exact: true }).first();
  await expect(optionText).toBeVisible({ timeout: 10000 });

  const menu = page.locator('div, [data-state="open"]').filter({ has: optionText }).last();
  await expect(menu).toHaveScreenshot('options.png', { maxDiffPixelRatio: 0.1 });
});