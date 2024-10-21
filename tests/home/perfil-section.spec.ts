// import { test, expect } from '@playwright/test'
// const URL = 'http://localhost:5173/login'
// const USER_NAME = 'user'
// const USER_NICK_NAME = 'user'
// test("Al ingresar la seccion perfil deberia tener los siguientes campos: nick, imagen,name, boton de salir", async ({ page }) => {
//     await page.goto(URL, { waitUntil: 'load' });
//     await page.waitForTimeout(1000);
//     const inputEmail = page.locator('input[type=email]');
//     const inputPassword = page.locator('input[type=password]');
//     const buttonSubmit = page.locator('button[type=submit]');

//     await inputEmail.fill('user@gmail.com')
//     await inputPassword.fill('111111')

//     await page.waitForTimeout(1500)

//     buttonSubmit.click()

//     await page.waitForTimeout(4000);

//     const userImage = page.getByAltText(`Imagen de perfil de ${USER_NAME}`);
//     const userName = await page.locator('.section_perfil > .content_user > h3').textContent();
//     const userNickName = await page.locator('.section_perfil > .content_user > span').textContent();
//     const buttonLogOut = await page.locator('.section_perfil > .content_user > button[type=button]').textContent();

//     expect(userImage).toBeDefined();
//     expect(userName).toBe(USER_NAME)
//     expect(userNickName).toBe(`@${USER_NICK_NAME}`);
//     expect(buttonLogOut).toBe('Salir');
// });

// test('Al darle click al boton salir se deberia redirigir a la pagina login', async ({ page }) => {
//     await page.goto(URL, { waitUntil: 'load' });
//     await page.waitForTimeout(1000);
//     const inputEmail = page.locator('input[type=email]');
//     const inputPassword = page.locator('input[type=password]');
//     const buttonSubmit = page.locator('button[type=submit]');

//     await inputEmail.fill('user@gmail.com')
//     await inputPassword.fill('111111')

//     await page.waitForTimeout(1500)

//     buttonSubmit.click()

//     await page.waitForTimeout(4000);

//     const buttonLogOut = await page.locator('.section_perfil > .content_user > button[type=button]');


//     await buttonLogOut.click();

//     await page.waitForTimeout(2000);


//     expect(page.url()).toBe(`${URL}`)

// })