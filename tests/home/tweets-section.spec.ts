import { test, expect } from '@playwright/test'
const URL = 'http://localhost:5173/login'
const USER_NAME = 'user';
const USER_NICK_NAME = 'user';
// test("Deberia existir la seccion de crear tweet y al menos un tweet", async ({ page }) => {
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

//     const formMakeTweet = page.locator('.section_tweets > form');
//     const textArea = formMakeTweet.getByPlaceholder('Escribe algo...')
//     const tweets = await page.locator('.tweet').count();

//     expect(formMakeTweet).toHaveClass('container_make_tweet');
//     expect(textArea).toBeDefined()
//     expect(tweets).toBeGreaterThan(1);
// })

// test('Al crear un tweet se deberia agregar a la seccion', async ({ page }) => {
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

//     const textArea = page.getByPlaceholder('Escribe algo...');
//     const buttonCreateTweet = page.locator('.container_buttons_tweet > button[type=submit]');
//     const text = 'hola'
//     textArea.fill(text);
//     buttonCreateTweet.click();


//     await page.waitForTimeout(3000);
//     //Al crear un tweet se agrega al inicio de la lista no al final por eso obtengo el primer elemento
//     const newTweet = page.locator('.tweet').first()

//     const imagenUser = newTweet.getByAltText(`Imagen del usuario ${USER_NAME}`);
//     const userName = await newTweet.locator('h3').textContent();
//     const userNickName = await newTweet.locator('.nick').textContent();
//     const textTweet = await newTweet.getByRole('paragraph').textContent()

//     expect(imagenUser).toBeDefined()
//     expect(userName).toBe(USER_NAME)
//     expect(userNickName?.includes(USER_NICK_NAME)).toBeTruthy()
//     expect(textTweet).toBe(text)
// })

test("Al darle al boton de borrar el tweet deberia de eliminarse", async ({ page }) => {
    await page.goto(URL, { waitUntil: 'load' });
    await page.waitForTimeout(1000);
    const inputEmail = page.locator('input[type=email]');
    const inputPassword = page.locator('input[type=password]');
    const buttonSubmit = page.locator('button[type=submit]');
    await inputEmail.fill('user@gmail.com')
    await inputPassword.fill('111111')

    await page.waitForTimeout(1500)

    buttonSubmit.click()

    await page.waitForTimeout(4000);

    const textArea = page.getByPlaceholder('Escribe algo...');
    const buttonCreateTweet = page.locator('.container_buttons_tweet > button[type=submit]');
    const text = 'hola'
    textArea.fill(text);
    buttonCreateTweet.click();


    await page.waitForTimeout(3000);
    const newTweet = page.locator('.tweet').first();
    //El nick contiene la fecha en la que se creo el tweet: @user - 07 Oct 2024 
    const dateMakeNewTweet = await newTweet.locator('.nick').textContent();
    const buttonDeleteTweet = newTweet.locator('.delete');

    buttonDeleteTweet.click();


    await page.waitForTimeout(2000);
    const firstTweet = page.locator('.tweet').first();
    const dateMakeFirstTweet = await firstTweet.locator('.nick').textContent();


    expect(dateMakeFirstTweet).not.toBe(dateMakeNewTweet)

})