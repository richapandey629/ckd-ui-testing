import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    
  await page.setViewportSize({ width: 1440, height: 1024 });

  await page.goto('https://ckd-ultrasound-ai.vercel.app/');
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('admin@ckdhealium.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Password' }).fill('A');
  await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Password' }).fill('Admin@');
  await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Password' }).fill('Admin@CKD123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Reports' }).click();
  await page.waitForLoadState('networkidle');

    // 2. Visual Comparison
    await expect(page).toHaveScreenshot('reports-baseline.png', {
        maxDiffPixelRatio: 0.15, // High margin because patient data changes
        mask: [page.locator('.study-row-id')], // Mask specific dynamic IDs if known
    });
});