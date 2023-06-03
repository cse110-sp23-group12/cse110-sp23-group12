describe('Basic user flow for Website', () => {
    // visit our website
    beforeAll(async () => {
      await page.goto(
        "https://cse110-sp23-group12.github.io/cse110-sp23-group12/"
      );
    });

    it('input questions', async () => {
        const input = await page.$('input');
        //type in the input box
        await input.type('What is the meaning of life?');
        //get input box value
        const value = await page.evaluate(input => input.value, input);
        //check if the input box value is correct
        expect(value).toBe('What is the meaning of life?');
    }, 10000)

    it('click submit button', async () => {
        //click submit button
        // const button = await page.$("#landing-submit-button");
        // await button.click();

        await Promise.all([
          page.waitForNavigation(),
          page.click("#landing-submit-button"),
        ]);
        // check if the page is redirected to display.html
        const pageURL = await page.url();
        expect(pageURL).toBe(
          "https://cse110-sp23-group12.github.io/cse110-sp23-group12/display.html"
        );
        // check localStorage is set
        const message = await page.evaluate(() => localStorage.getItem('userMessage'));
        expect(message).toBe('What is the meaning of life?');
    }, 10000);
});