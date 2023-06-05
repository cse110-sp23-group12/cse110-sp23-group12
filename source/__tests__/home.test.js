describe('Basic user flow for Website', () => {
    // visit our website
    beforeAll(async () => {
      await page.goto(
        "https://cse110-sp23-group12.github.io/cse110-sp23-group12/index.html"
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

    it('check if there are 6 cookies for user to select', async () => {
        // check if id: cookie0~5 exists
        const cookie0 = await page.$('#cookie0');
        const cookie1 = await page.$('#cookie1');
        const cookie2 = await page.$("#cookie2");
        const cookie3 = await page.$("#cookie3");
        const cookie4 = await page.$("#cookie4");
        const cookie5 = await page.$("#cookie5");
        const cookie6 = await page.$("#cookie6");
        expect(cookie0).toBeTruthy();
        expect(cookie1).toBeTruthy();
        expect(cookie2).toBeTruthy();
        expect(cookie3).toBeTruthy();
        expect(cookie4).toBeTruthy();
        expect(cookie5).toBeTruthy();
        // cookie6 should not exist so it should be falsy
        expect(cookie6).toBeFalsy();
    }, 10000);

    it('shows only 6 cookies for select', async () => {
      const num_cookie = 6;
      const no_cookie = 6;
      const limit = 10;
      //check cookies id 0-5 exist
      for(let i = 0; i < num_cookie; ++i){
        const cookies = await page.$('#cookie'+ i.toString());
        expect(cookies).toBeTruthy();
      }
      // checks no more than 6 cookies
      for(let i = no_cookie; i < limit; ++i){
        const cookies = await page.$('#cookie'+ i.toString());
        expect(cookies).toBeFalsy();
      }
      
    }, 10000);

    it('checks visibility after selected cookies and correct amount of card in plate', async () => {
      await page.reload();
      const limit = 6;
      //choose upper and lower bound randomly
      let lower = Math.floor(Math.random() * limit);
      let upper = Math.ceil(Math.random()*(limit - lower) + lower);
      //make sure no more than 3 to be selected
      if(upper - lower > 3){
          upper = Math.ceil(upper/2);
      }
      
      for(let i = lower; i < upper; ++i){
        //click cookies 
        await page.evaluate((index) => {
            document.querySelector('#cookie' + index.toString()).click(); 
          }, i);
          const imgselector = '#cookie' + i.toString() + ' .display-none';
          const img = await page.$(imgselector);
          //check visibility for selected cookies
          expect(img).toBeTruthy();
      }
      const data = await page.evaluate(() => {
      // get all the big-card elements
      return Array.from(document.querySelectorAll("#plate-container .big-card"));
      });
      //checks the correct amount in plate
      expect(data.length).toBe(upper - lower);
        
    }, 10000);

    it('select 3 cookies', async () => {
      await page.reload();
      //click 3 cookies
      await page.evaluate(() => {
        document.querySelector("#cookie0").click();
        document.querySelector("#cookie1").click();
        document.querySelector("#cookie2").click();
      });
      // get the img html element that inside the cookie div and check if img has the display-none attribute
      const img0 = await page.$("#cookie0 .display-none");
      const img1 = await page.$("#cookie1 .display-none");
      const img2 = await page.$("#cookie2 .display-none");
      const img3 = await page.$("#cookie3 .display-none");
      expect(img0).toBeTruthy();
      expect(img1).toBeTruthy();
      expect(img2).toBeTruthy();
      expect(img3).toBeFalsy();
    }, 10000);
    
    it('check 3 cards are displayed and being added to the plate', async () => {
        const data = await page.evaluate(() => {
            // get all the big-card elements
          return Array.from(document.querySelectorAll("#plate-container .big-card"));

        });
        expect(data.length).toBe(3);
    }, 10000);

    it('click button to go to home page', async () => {
        //click button
        await Promise.all([
          page.waitForNavigation(),
          page.click("#display-retry-button"),
        ]);
        // check if the page is redirected to index.html
        const pageURL = await page.url();
        expect(pageURL).toBe(
          "https://cse110-sp23-group12.github.io/cse110-sp23-group12/index.html"
        );
    },10000);
});
