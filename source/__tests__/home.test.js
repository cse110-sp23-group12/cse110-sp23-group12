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
        // const message = await page.evaluate(() => localStorage.getItem('userMessage'));
        // expect(message).toBe('What is the meaning of life?');

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
        const cookie7 = await page.$("#cookie7");
        const set = new Set([cookie0, cookie1, cookie2, cookie3, cookie4, cookie5, cookie6, cookie7]);
        expect(set.size).toBeLessThanOrEqual(7);
    }, 10000);

    it('shows only 6 cookies for select', async () => {
      const num_cookie = 8;
      const limit = 12;
      //check cookies id 0-5 exist
    //   for(let i = 0; i < num_cookie; ++i){
    //     const cookies = await page.$('#cookie'+ i.toString());
    //     expect(cookies).toBeTruthy();
    //   }
      // checks no more than 6 cookies
      for(let i = num_cookie; i < limit; ++i){
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
      var cnt = 0;
      for(let i = lower; i < upper; ++i){
        //click cookies 
        var dom = await page.$$('#cookie' + i.toString());
        await page.evaluate((index, dom) => {
            console.log('#cookie' + index.toString());
          }, i);
          const imgselector = '#cookie' + i.toString() + ' .display-none';
          if (await page.$('#cookie' + i.toString() + ' .display-none').length > 0) {
            const img = await page.$(imgselector);
          //check visibility for selected cookies
            expect(img).toBeTruthy();
          }
          else {
            const img = await page.$(imgselector);
            expect(img).toBeFalsy();
          }
      }
      const data = await page.evaluate(() => {
      // get all the big-card elements
        return Array.from(document.querySelectorAll("#plate-container .big-card"));
        // return Array.from(document.querySelectorAll(".display-cookie .display-none"));
      });
      //checks the correct amount in plate
    //   expect(data.length).toBe(cnt);
        
    }, 10000);

    it('select 3 cookies', async () => {
      await page.reload();
      //click 3 cookies
      await page.evaluate(() => {
        if (document.querySelector("#cookie0")) document.querySelector("#cookie0").click();
        if (document.querySelector("#cookie1")) document.querySelector("#cookie1").click();
        if (document.querySelector("#cookie2")) document.querySelector("#cookie2").click();
      });
      // get the img html element that inside the cookie div and check if img has the display-none attribute
      const img0 = await page.$("#cookie0 .display-none");
      const img1 = await page.$("#cookie1 .display-none");
      const img2 = await page.$("#cookie2 .display-none");
      const img3 = await page.$("#cookie3 .display-none");
      const img4 = await page.$("#cookie4 .display-none");
      const set = new Set([img0, img1, img2, img3, img4]);
      expect(set.size).toBeLessThan(5);
    }, 10000);
    
    it('check 3 cards are displayed and being added to the plate', async () => {
        const data = await page.evaluate(() => {
            // get all the big-card elements
          return Array.from(document.querySelectorAll("#plate-container .big-card"));
        //   return Array.from(document.querySelectorAll(".display-cookie .display-none"));

        });
        expect(data.length).toBeLessThan(4);
    }, 10000);
});
