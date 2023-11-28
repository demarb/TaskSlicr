import { test, expect } from '@playwright/test';
import { nanoid } from 'nanoid'

// This E2E test checks if the main expected flow of a signed in user works as expected.E2E
//     The Path tested is:
//     1. Navigate to our site.
//     2. Navigate to login
//     3. Attempt to login with an incorrect password.Expect that the user is prompted correctly
//     4. Attempt to login with an correct password
//     5. Create a new task
//     6. Navigate to settings and Change task algorithm to [LIFO - Last-In-First-Out] 
//     7. Navigate to app and Update the title of a task. Assert that the change has occurred.
//     8. Change the status of a task.
//     9. Verify that the change has occurred.
//     10. Delete the task.
//     11. Sign out

test('Main path user might take', async ({ page }) => {

    //Random id to give tests so we dont have duplicate tasks accidentally in test
    const random_id = nanoid()

    // Navigate to our site.
    await page.goto('http://localhost:5173/#/');

    // Navigate to login
    await page.getByRole('navigation').getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL('http://localhost:5173/#/app/login')

    // Attempt to login with an incorrect password. Expect that the user is prompted correctly
    await page.getByPlaceholder('Email...').click();
    await page.getByPlaceholder('Email...').fill(process.env.SAMPLE_USER_EMAIL);
    await page.getByPlaceholder('Password...').fill('wrongpassword');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Incorrect email/password.')).toBeVisible()


    // Attempt to login with an correct password
    await page.getByPlaceholder('Password...').click();
    await page.getByText('Login/SignupLoginSign Up').click();
    await page.getByPlaceholder('Password...').click();
    await page.getByPlaceholder('Password...').press('Control+a');
    await page.getByPlaceholder('Password...').fill('');
    await page.getByPlaceholder('Password...').click();
    await page.getByPlaceholder('Password...').fill(process.env.SAMPLE_USER_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('http://localhost:5173/#/app')


    // Create a new task
    await page.getByAltText('Add a new task button').click()
    await page.getByPlaceholder('Enter Task Title').click();
    await page.getByPlaceholder('Enter Task Title').fill(`TEST: A New Task - ${random_id}`);
    await page.getByPlaceholder('Enter Task Description').click();
    await page.getByPlaceholder('Enter Task Description').fill('This is a description');
    await page.getByLabel('Priority:HighMediumLow').selectOption('Medium');
    await page.getByLabel('Hours:01234567891011121314151617181920212223').selectOption('2');
    await page.getByPlaceholder('dueDate...').fill('2028-11-26T02:01');
    await page.getByRole('button', { name: 'Add' }).click();

    // Navigate to settings and Change task algorithm to [LIFO - Last-In-First-Out] 
    await page.getByAltText('Navigate to profile button').click()
    await expect(page).toHaveURL('http://localhost:5173/#/app/profile')
    await page.getByLabel('Change Task Algorithm').selectOption('LIFO');


    // Navigate to app and Update the title of a task. Assert that the change has occurred.
    await page.getByAltText('Navagite to Scheduler button').click()
    await page.getByText(`TEST: A New Task - ${random_id}`).click();
    await page.getByPlaceholder('Enter Task Title').click();
    await page.getByPlaceholder('Enter Task Title').fill(`TEST: A New Task - ${random_id} UPDATED`);
    await page.getByRole('button', { name: 'Update' }).click();
    await expect(page.getByText(`TEST: A New Task - ${random_id} UPDATED`)).toBeVisible()

    // Change the status of a task.
    await page.getByText(`TEST: A New Task - ${random_id} UPDATED`).click();
    await page.getByLabel('Status:').check();
    await page.getByRole('button', { name: 'Update' }).click();
    await expect(page.getByText(`TEST: A New Task - ${random_id} UPDATED`)).toHaveCSS('background-color', 'rgb(134, 239, 172)')

    // Delete the task.
    await page.getByText(`TEST: A New Task - ${random_id} UPDATED`).click();
    await page.getByAltText('Delete a task  button').click()
    await expect(page.getByText(`TEST: A New Task - ${random_id} UPDATED`)).not.toBeVisible()

    // Sign out
    await page.getByRole('navigation').getByRole('button', { name: 'Sign Out' }).click()
    await expect(page).toHaveURL('http://localhost:5173/#/')
});