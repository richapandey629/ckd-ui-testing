import { test, expect } from '@playwright/test';

test('Status Dropdown Check', async ({ page }) => {
  // Add deviceScaleFactor: 2 to simulate a Retina display if Figma uses high-res exports
  await page.setViewportSize({ width: 1440, height: 1024 });


  await page.goto('https://ckd-ultrasound-ai.vercel.app/');
  
  await page.getByRole('textbox', { name: 'Email address' }).fill('admin@ckdhealium.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Admin@CKD123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.getByRole('button', { name: 'Patients' }).first().click();
  await page.locator('button').filter({ hasText: 'Critical' }).click();
  
  const statusMenu = page.getByRole('listbox');
  await expect(statusMenu).toBeVisible();
  
  await expect(statusMenu).toHaveScreenshot('status-dropdown-baseline.png', { maxDiffPixelRatio: 0.07 });
});