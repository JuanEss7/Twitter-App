// import { test, expect } from '@playwright/test'
// const URL = 'http://localhost:5173/login'
// test('Deberia existir los campos para buscar usuario y al menos un usuario para seguir', async ({ page }) => {
//     await page.goto(URL, { waitUntil: 'load' });
//     await page.waitForTimeout(1000);
//     const inputEmail = page.locator('input[type=email]');
//     const inputPassword = page.locator('input[type=password]');
//     const buttonSubmit = page.locator('button[type=submit]');

//     await inputEmail.fill('user@gmail.com')
//     await inputPassword.fill('111111')

//     await page.waitForTimeout(1500)

//     buttonSubmit.click()

//     await page.waitForTimeout(3000);

//     const inputSerchName = page.getByPlaceholder('Buscar @user...');
//     const value = await inputSerchName.textContent();
//     const liUserCard = await page.locator('.user_card').count();

//     expect(inputSerchName).toBeDefined();
//     expect(value).toBe('');
//     expect(liUserCard).toBeGreaterThan(1)
// })

// test("Al buscar un usuario que no existe deberia aparecer un texto con 'No hay usuarios', de lo contrario, aparecera el usuario para seguir", async ({ page }) => {
//     await page.goto(URL, { waitUntil: 'load' });
//     await page.waitForTimeout(1000);
//     const inputEmail = page.locator('input[type=email]');
//     const inputPassword = page.locator('input[type=password]');
//     const buttonSubmit = page.locator('button[type=submit]');

//     await inputEmail.fill('user@gmail.com')
//     await inputPassword.fill('111111')

//     await page.waitForTimeout(1500)

//     buttonSubmit.click()

//     await page.waitForTimeout(3000);

//     const inputSerchName = page.getByPlaceholder('Buscar @user...');


//     //Usurio inexistente
//     // await inputSerchName.fill('wsdasdasd')

//     // await page.waitForTimeout(1500);
//     // const text = await page.locator('.content_search_user > ul > p').textContent();
//     // expect(text).toBe('No hay usuarios')

//     //Usurio existente
//     await inputSerchName.fill('nike')

//     await page.waitForTimeout(1500);

//     const liUserCard = await page.locator('.user_card').count();

//     expect(liUserCard).toBe(1)
// })

// test('Al momento de darle click al boton de seguir la clase deberia cambiar de follow a following', async ({ page }) => {
//     await page.goto(URL, { waitUntil: 'load' });
//     await page.waitForTimeout(1000);
//     const inputEmail = page.locator('input[type=email]');
//     const inputPassword = page.locator('input[type=password]');
//     const buttonSubmit = page.locator('button[type=submit]');

//     await inputEmail.fill('user@gmail.com')
//     await inputPassword.fill('111111')

//     await page.waitForTimeout(1500)

//     buttonSubmit.click()

//     await page.waitForTimeout(3000);


//     const firstUserButton = page.locator('.user_card > button[type=button]').first();
//     const classFirstButton = await firstUserButton.getAttribute('class');

//     firstUserButton.click();

//     await page.waitForTimeout(2000);
//     expect(firstUserButton).toHaveClass(classFirstButton === 'follow' ? 'following' : 'follow');

// })