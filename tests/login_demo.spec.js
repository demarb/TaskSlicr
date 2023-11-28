import { test, expect } from '@playwright/test';

test('Demo login test 1', async ({ page }) => {

    await page.goto('http://localhost:5173/');
    await page.pause()
    await page.getByRole('navigation').getByRole('button', { name: 'Sign In' }).click();
    // await expect((page)).toHaveURL('http://localhost:5173/#/app/login')
    // await page.locator("getByPlaceholder('Email...')").fill(process.env.SAMPLE_USER_EMAIL)
    // // await page.locator("getByPlaceholder('Password...')").fill(process.env.SAMPLE_USER_PASSWORD)
    // console.log(process.env)
    // console.log()
    // console.log(process.env.SAMPLE_USER_EMAIL)

    await page.getByPlaceholder('Email...').fill(process.env.SAMPLE_USER_EMAIL);
    await page.getByPlaceholder('Password...').fill(process.env.SAMPLE_USER_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();

    // await page.getByRole('button', { name: 'Login' }).click();
    await expect((page)).toHaveURL('http://localhost:5173/#/app')
    await page.pause()

})