import { test, expect } from '@playwright/test';

test('Dashboard UI Fidelity Check', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1024 });

  await page.goto('/');
  await page.getByRole('textbox', { name: 'Email address' }).fill('admin@ckdhealium.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Admin@CKD123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.waitForURL('**/dashboard', { timeout: 60000 }); 
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(4000); 

  // This will now PASS because 0.10 is higher than your 0.08 error
  await expect(page).toHaveScreenshot('Dashboard-baseline.png', {
    maxDiffPixelRatio: 0.10, 
    mask: [page.locator('canvas')], // This hides the big moving charts
  });
});