import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://ckd-ultrasound-ai.vercel.app/');
  
  await page.setViewportSize({ width: 1440, height: 1024 });

  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('admin@ckdhealium.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Password' }).fill('A');
  await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Password' }).fill('Admin@');
  await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Password' }).fill('Admin@CKD');
  await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Password' }).fill('Admin@CKD123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Settings' }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000); // Wait for the form transition animation

  // 4. Visual Comparison
  await expect(page).toHaveScreenshot('settings-baseline.png', {
    maxDiffPixelRatio: 0.05, 
    // Mask the inputs if they contain dynamic user data
    mask: [page.locator('input')], 
  });
});