describe('Basic user flow for Website', () => {
    // visit our website
    beforeAll(async () => {
      await page.goto(
        "https://cse110-sp23-group12.github.io/cse110-sp23-group12"
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

    it('shows only 6 cookies for select', async () => {
      const num_cookie = 6;
      const no_cookie = 6;
      const limit = 10;
      for(let i = 0; i < num_cookie; ++i){
        const cookies = await page.$('#cookie'+ i.toString());
        expect(cookies).toBeTruthy();
      }
      for(let i = no_cookie; i < limit; ++i){
        const cookies = await page.$('#cookie'+ i.toString());
        expect(cookies).toBeFalsy();
      }
      
    }, 10000);
    //checks visibility of the cookies after random selected  
    it('check visibility selected cookies', async () => {
        const limit = 6;
        const lower = Math.floor(Math.random() * limit);
        const upper = Math.ceil(Math.random()*(limit - lower) + lower);
        if(upper - lower > 3){
            upper = Math.ceil(upper/2);
        }
        for(let i = lower; i < upper; ++i){
            await page.evaluate((index) => {
                document.querySelector('#cookie' + index.toString()).click();
              }, i);
            const imgselector = '#cookie' + i.toString() + ' .display-none';
            const img = await page.$(imgselector);
            expect(img).toBeTruthy();
          }
        
    }, 10000);
    /*
    it('', async () => {
        
    }, 10000);
    */
});
