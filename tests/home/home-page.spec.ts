// import { test, expect } from '@playwright/test'
// const URL = 'http://localhost:5173/login'

// test('Al ingresar deberian estar las 3 secciones de la pagina: perfil,tweets, usuarios', async ({ page }) => {
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

//     const sectionPerfil = page.locator('section_perfil');
//     const sectionTweets = page.locator('section_tweets');
//     const sectionUsers = page.locator('section_users');
//     const asides = await page.getByRole('complementary').count();
//     const main = await page.getByRole('main').count();
//     expect(sectionPerfil).toBeDefined()
//     expect(sectionTweets).toBeDefined()
//     expect(sectionUsers).toBeDefined()
//     expect(asides).toBe(2)//sectionPerfil y sectionUsers
//     expect(main).toBe(1)//sectionTweets
// })