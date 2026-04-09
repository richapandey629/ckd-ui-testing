import { test, expect } from '@playwright/test';

test('Notification Panel UI Check', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1024 });
  await page.goto('https://ckd-ultrasound-ai.vercel.app/');

  // Simplified Login logic for speed
  await page.getByRole('textbox', { name: 'Email address' }).fill('admin@ckdhealium.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Admin@CKD123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Open the Notification Panel
  await page.getByRole('button', { name: '9' }).click();
  await page.waitForLoadState('networkidle');

  // Target the dialog specifically to match the component dimensions
  const notificationBox = page.getByRole('dialog');

  // Perform Visual Comparison
  await expect(notificationBox).toHaveScreenshot('notification-baseline.png', {
    maxDiffPixelRatio: 0.15,
    mask: [
      page.locator('button:has-text("Mark all read")'),
      page.locator('.text-muted-foreground'), 
      page.locator('span:has-text("ago")')      
    ],
  });
});