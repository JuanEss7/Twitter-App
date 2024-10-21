import { test, expect } from '@playwright/test'
const URL = 'http://localhost:5173/'
// test('Al ingresar a la pagina deberia existir el formulario con sus respectivos campos', async ({ page }) => {
//     await page.goto(URL, { waitUntil: 'load' });
//     await page.waitForTimeout(1000);
//     const inputEmail = await page.locator('input[name=email]').fill('user@gmail.com');
//     const inputPassword = await page.locator('input[name=password]').fill('111111');
//     await page.waitForTimeout(1000);

//     await page.getByRole('button').click();

//     await page.waitForTimeout(1000)

//     await page.waitForURL('http://localhost:5173/nickname')
//     await page.waitForTimeout(2000);

//     const formNickNameElements = await page.evaluate(() => {
//         const form = document.querySelector('.form_nickname')
//         const image = document.getElementById('nick_image');
//         const buttonSelectImage = document.querySelector("button[type=button]");
//         const inputName = document.querySelector('input[name=name]')
//         const inputNickName = document.querySelector('input[name=nickname]')
//         const buttonSubmit = document.querySelector('button[type=submit]')

//         return [form, image, buttonSelectImage, inputName, inputNickName, buttonSubmit]
//     })
//     for (const node of formNickNameElements) {
//         expect(node).not.toBeNull();
//     }
// })

// test('Al ingresar un nombre o un nickname existente deberia salir modal de error', async ({ page }) => {
//     await page.goto(URL, { waitUntil: 'load' });
//     await page.waitForTimeout(1000);
//     const inputEmail = await page.locator('input[name=email]').fill('user@gmail.com');
//     const inputPassword = await page.locator('input[name=password]').fill('111111');
//     await page.waitForTimeout(1000);

//     await page.getByRole('button').click();

//     await page.waitForTimeout(1000)

//     await page.waitForURL('http://localhost:5173/nickname')
//     await page.waitForTimeout(2000);
//     const inputName = page.getByPlaceholder("Nombre");
//     const inputNickName = page.getByPlaceholder("@Nickname");
//     const buttonSubmit = page.locator("button[type=submit]");

//     await inputName.fill('Nike');
//     await inputNickName.fill('Nike');


//     await page.waitForTimeout(1500);
//     buttonSubmit.click();
//     await page.waitForTimeout(2000);

//     const toasitfyDiv = page.locator('.toastify')
//     const toasitfyDivText = await toasitfyDiv.textContent();
//     expect(toasitfyDiv).toBeDefined();
//     expect(toasitfyDivText).toBe('El nick que estas intentando usar ya existe.✖')
// })

// test(`Al completar el registro de nick y name la url deberia ser: ${URL}home/nickdelusuario`, async ({ page }) => {
//     await page.goto(URL, { waitUntil: 'load' });
//     await page.waitForTimeout(1000);
//     const inputEmail = await page.locator('input[name=email]').fill('user@gmail.com');
//     const inputPassword = await page.locator('input[name=password]').fill('111111');
//     await page.waitForTimeout(1000);

//     await page.getByRole('button').click();

//     await page.waitForTimeout(1000)

//     await page.waitForURL('http://localhost:5173/nickname')
//     await page.waitForTimeout(2000);
//     const inputName = page.getByPlaceholder("Nombre");
//     const inputNickName = page.getByPlaceholder("@Nickname");
//     const buttonSubmit = page.locator("button[type=submit]");

//     await inputName.fill('user');
//     await inputNickName.fill('user');


//     await page.waitForTimeout(1500);
//     buttonSubmit.click();
//     await page.waitForTimeout(3000);
//     // Verificar que la nueva URL es la esperada
//     expect(page.url()).toBe('http://localhost:5173/home/user');

// })