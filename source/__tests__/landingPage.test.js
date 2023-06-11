describe("check all the components works on landing page", () => {
  // visit our website
  beforeAll(async () => {
    await page.goto(
      "https://cse110-sp23-group12.github.io/cse110-sp23-group12/index.html"
    );
  });

  it("insert question for fortune for T1", async () => {
    //inputs the question in input box
    const input = await page.$("input");
    await input.type("How will my day go?");
    //get input value
    const value = await page.evaluate((input) => input.value, input);
    //check if input was correct
    expect(value).toBe("How will my day go?");
  }, 10000);

  it("check initial value of music should be off", async () => {
    const soundOn = await page.evaluate(() => localStorage.getItem("soundOn"));
    expect(soundOn).toBe(null);
  }, 10000);

  it("Turn on the music and image should be fa-volume-up", async () => {
    try {
        //click the button
      const button = await page.$("#sound-toggle");
      await button.click();
      await page.waitForTimeout(1000); 

      const isSoundOn = await page.evaluate(() => {
        return document
          .querySelector("#sound-toggle")
          .children[0].classList.contains("fa-volume-up");
      });

      console.log("Is sound on?", isSoundOn);
      expect(isSoundOn).toBe(true);
    } catch (error) {
      console.error("Error occurred during 'Turn on the music' test:", error);
      throw error;
    }
  },10000);

  it("check if local storage is set to on for the music", async () => {
    const localVersion = await page.evaluate(() => {
      return window.localStorage.getItem("soundOn");
    });
    expect(localVersion).toBe("true");
  }, 10000);

  it("Turn off the music and image should be fa-volum-off ", async () => {
    try {
        //click the button
      const button = await page.$("#sound-toggle");
      await button.click();
      await page.waitForTimeout(1000); 

      const isSoundOff = await page.evaluate(() => {
        return document
          .querySelector("#sound-toggle")
          .children[0].classList.contains("fa-volume-off");
      });

      console.log("Is sound off?", isSoundOff);
      expect(isSoundOff).toBe(true);
    } catch (error) {
      console.error("Error occurred during 'Turn off the music' test:", error);
      throw error;
    }
  },10000);

  it("check if local storage is set to off for the music", async () => {
    const localVersion = await page.evaluate(() => {
      return window.localStorage.getItem("soundOn");
    });
    expect(localVersion).toBe("false");
  }, 10000);

  it("Change to local version", async () => {
        await page.evaluate(() => {
            const ulElement = document.querySelector("#img_category_options");
            const liElements = Array.from(ulElement.querySelectorAll("li"));
            const secondLiElement = liElements[1];
            secondLiElement.click();
        })
        const localVersion = await page.evaluate(() =>{
            return window.localStorage.getItem("method")
        })
    expect(localVersion).toBe("local");
  }, 10000);

  it("Change to chatPGT version", async () => {
    await page.evaluate(() => {
      const ulElement = document.querySelector("#img_category_options");
      const liElements = Array.from(ulElement.querySelectorAll("li"));
      const secondLiElement = liElements[0];
      secondLiElement.click();
    });
    const chatGPTVersion = await page.evaluate(() =>{
        return window.localStorage.getItem("method")
    });
    expect(chatGPTVersion).toBe("gpt");
  }, 10000);

  it("Click submit button to next page", async () => {
    await page.evaluate(() => localStorage.clear());
    await Promise.all([
      page.waitForNavigation(),
      page.click("#landing-submit-button"),
    ]);
    // check if the page is redirected to display.html
    const pageURL = await page.url();
    expect(pageURL).toBe(
      "https://cse110-sp23-group12.github.io/cse110-sp23-group12/display.html"
    );
  }, 10000);
});
