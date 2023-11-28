import { test, expect } from '@playwright/test';

test('Selectors demo ', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/')
    await page.pause()

    //Using any object property
    await page.click('id=user-name')

    //Using css selector
    await page.locator('#user-name').fill("eddison")

    //Using xpath
    await page.locator('xpath=//input[@id="user-name"]').fill("Philip")

    // Using text 
    await page.locator('text=LOGIN').click()
    await page.locator('div:has-text("wag")').click()
})