import { test, expect } from '@playwright/test';

test('Sidebar Fidelity Check', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1024 });
  await page.goto('https://ckd-ultrasound-ai.vercel.app/');

  await page.getByRole('textbox', { name: 'Email address' }).fill('admin@ckdhealium.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Admin@CKD123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  const sidebar = page.locator('nav').first().locator('..');
  await expect(sidebar).toBeVisible({ timeout: 10000 });
  
  await expect(sidebar).toHaveScreenshot('sidebar-expanded.png', { maxDiffPixelRatio: 0.15 });

  await page.getByRole('button', { name: /sidebar/i }).click();
  await page.waitForTimeout(1000);

  await expect(sidebar).toHaveScreenshot('sidebar-collapsed.png', { maxDiffPixelRatio: 0.15 });
});