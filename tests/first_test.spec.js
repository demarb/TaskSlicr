import { test, expect } from '@playwright/test';

test("My first test", async ({ page }) => {
    await page.goto('http://localhost:5173/')

    await expect(page).toHaveTitle("TaskSlicr")

    await page.goto('http://google.com/')
    await page.goto('http://facebook.com/')

})