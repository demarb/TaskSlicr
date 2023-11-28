import { test, expect } from '@playwright/test';

test('record demo test 1', async ({ page }) => {
    await page.locator('body').click();
    await page.goto('http://localhost:5173/');
    await page.getByRole('navigation').getByRole('button', { name: 'Sign In' }).click();
    await page.getByPlaceholder('Email...').click();
    await page.getByPlaceholder('Email...').fill('tester@mail.com');
    await page.getByPlaceholder('Password...').click();
    await page.getByPlaceholder('Password...').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('img').nth(2).click();
    await page.locator('section').filter({ hasText: /^Profile tester@mail\.com Sign Out$/ }).getByRole('button').click();
});