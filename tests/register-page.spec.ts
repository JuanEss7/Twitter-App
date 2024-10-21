// import { test, expect } from '@playwright/test';
// const URL = 'http://localhost:5173/'
// test('Verificar que exista el formulario de registro', async ({ page }) => {
//     await page.goto(URL);
//     await page.waitForTimeout(1000);
//     const formRegister = page.frameLocator('.register-form');
//     const h2Form = await page.locator('.login-form > h2').textContent();
//     const inputEmail = await page.evaluate(() => document.querySelector('input[name=email]')?.textContent)
//     const inputPassword = await page.evaluate(() => document.querySelector('input[name=password]')?.textContent)
// const buttonRegister = await page.getByRole('button').textContent();
// const linkLogin = await page.getByRole('link').textContent();
// expect(formRegister).toBeDefined();
// expect(h2Form).toBe('Registrarse');
// expect(inputEmail).toBe('');
// expect(inputPassword).toBe('')
// expect(buttonRegister).toBe('Registrarse');
// expect(linkLogin).toBe('Login');
// })
// test('Ingresar datos en el formulario de registro con un usuario ya creado', async ({ page }) => {
//     await page.goto(URL);
//     await page.waitForTimeout(1000);
//     const inputEmail = await page.locator('input[name=email]').fill('nike@gmail.com');
//     const inputPassword = await page.locator('input[name=password]').fill('111111');
//     await page.waitForTimeout(1000);

//     await page.getByRole('button').click();
//     await page.waitForTimeout(1200);

//     const toasitfyDiv = page.locator('.toastify')
//     const toasitfyDivText = await toasitfyDiv.textContent();
//     expect(toasitfyDiv).toBeDefined();
//     expect(toasitfyDivText).toBe('El usuario que estas intentando registrar ya existe.✖')
// })
// test('Ingresar datos en el formulario de registro con un usuario y verificar que exita el formulario de creacion de Nick e imagen de usuario', async ({ page }) => {
//     await page.goto(URL, { waitUntil: 'load' });
//     await page.waitForTimeout(1000);
//     const inputEmail = await page.locator('input[name=email]').fill('user@gmail.com');
//     const inputPassword = await page.locator('input[name=password]').fill('111111');
//     await page.waitForTimeout(1000);

//     await page.getByRole('button').click();
//     await page.waitForTimeout(3000);


//     // Verificar que la nueva URL es la esperada
//     expect(page.url()).toBe('http://localhost:5173/nickname');
// })