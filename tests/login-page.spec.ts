import { test, expect } from '@playwright/test'
const URL = 'http://localhost:5173/login'

// test('Al ingresar a la pagina deberia existir el formulario login con sus respecitivos campos', async ({ page }) => {
//     await page.goto(URL, { waitUntil: 'load' });
//     await page.waitForTimeout(1000);
//     const form = page.getByRole('form');
//     const h2Form = await page.locator('.login-form > h2').textContent();
//     const inputEmail = await page.locator('input[type=email]').textContent();
//     const inputPassword = await page.locator('input[type=password]').textContent();
//     const buttonSubmit = page.locator('button[type=submit]');
//     const registerLink = await page.getByRole('link').textContent()
//     await page.waitForTimeout(1000);
//     expect(form).toBeDefined();
//     expect(h2Form).toBe('Ingresar');
//     expect(registerLink).toBe('Registrarse');
//     expect(inputEmail).toBe('');
//     expect(inputPassword).toBe('');
//     expect(buttonSubmit).toBeDefined();
// })

// test('Al ingresar alguna credencial incorrecta deberia salir modal de error', async ({ page }) => {
//     await page.goto(URL, { waitUntil: 'load' });
//     await page.waitForTimeout(1000);
//     const inputEmail = await page.locator('input[type=email]');
//     const inputPassword = await page.locator('input[type=password]');
//     const buttonSubmit = page.locator('button[type=submit]');

//     await inputEmail.fill('user@gmail.com')
//     await inputPassword.fill('121212121212')

//     await page.waitForTimeout(1500)

//     buttonSubmit.click()

//     await page.waitForTimeout(2000);
//     const toasitfyDiv = page.locator('.toastify')
//     const toasitfyDivText = await toasitfyDiv.textContent();
//     expect(toasitfyDiv).toBeDefined();
//     expect(toasitfyDivText).toBe('Credenciales incorrectas.✖')
// })
// test(`Al ingrear sesion correctamente la url deberia ser: ${URL}home/nickdelusuario`, async ({ page }) => {
//     await page.goto(URL, { waitUntil: 'load' });
//     await page.waitForTimeout(1000);
//     const inputEmail = await page.locator('input[type=email]');
//     const inputPassword = await page.locator('input[type=password]');
//     const buttonSubmit = page.locator('button[type=submit]');

//     await inputEmail.fill('user@gmail.com')
//     await inputPassword.fill('111111')

//     await page.waitForTimeout(1500)

//     buttonSubmit.click()

//     await page.waitForTimeout(3000);


//     expect(page.url()).toBe('http://localhost:5173/home/user')
// })