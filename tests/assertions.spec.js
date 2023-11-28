import { test, expect } from '@playwright/test';

test('Assertions demo ', async ({ page }) => {

    // await page.goto('https://www.saucedemo.com/')
    await page.pause()
    // await expect(page.locator('#user-name')).toBeEmpty()

    await page.goto('http://localhost:5173/');
    await page.getByRole('navigation').getByRole('button', { name: 'Sign In' }).click();
    await expect((page)).toHaveURL('http://localhost:5173/#/app/login')
    await expect((page)).toHaveTitle('TaskSlicr')


})