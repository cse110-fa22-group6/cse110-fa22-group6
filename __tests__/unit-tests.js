const { expect } = require("@jest/globals");

describe("Basic user flow for Website", () => {
  beforeAll(async () => {
    const LIVESERVER_URL = "http://127.0.0.1:5500/source/index.html";
    // add the correct URL according to your LiveServer
    await page.goto(LIVESERVER_URL);
  });

  it("Check page status when first opened (clear local storage)", async () => {
    console.log("Clearing local storage and checking status of page...");
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.reload();
    var jobs = await page.$$("job-card");
    expect(jobs.length).toBe(0);
  });

  it("Check add confirmation popup", async () => {
    console.log("Testing add confirmation popup...");
    var addBtn = await page.$('[id="add_application_btn"]');
    await addBtn.click(0, 1, 1);
    var popup = await page.$('[id="add-application"]');
    expect(await popup.isIntersectingViewport()).toBe(true);
    var cancelBtn = await popup.$('[id="add_cancel"]');
    await cancelBtn.click(0, 1, 1);
    expect(await popup.isIntersectingViewport()).toBe(false);
  });

  it("Check adding application", async () => {
    console.log("Testing adding application...");
    var addBtn = await page.$('[id="add_application_btn"]');
    await addBtn.click(0, 1, 1);
    var popup = await page.$('[id="add-application"]');
    expect(await popup.isIntersectingViewport()).toBe(true);

    var textBox = await popup.$('[id="company"]');
    await textBox.type("Ronald's Emporium");
    textBox = await popup.$('[id="position"]');
    await textBox.type("Professional Burger Flipper");
    textBox = await popup.$('[id="location"]');
    await textBox.type("Jackson, CA");
    textBox = await popup.$('[id="date"]');
    await textBox.type("06212023");

    var submitBtn = await popup.$('[id="add_submit"]');
    await submitBtn.click(0, 1, 1);
    await page.reload();
    popup = await page.$('[id="add-application"]');
    expect(await popup.isIntersectingViewport()).toBe(false);
    var jobs = await page.$$("job-card");
    expect(jobs.length).toBe(1);
  });

    it("Check new job card", async () => {
        console.log("Checking the new job card...");
        var jobs = await page.$$('job-card');
        expect(jobs.length).toBe(1);
        var app = jobs[0];
        var root = await app.getProperty('shadowRoot');

        var position = await root.$('.position');
        var positionText = await position.getProperty('innerText');
        var positionVal = await positionText.jsonValue();
        expect(positionVal).toBe('Professional Burger Flipper');

        var company = await root.$('.company');
        var companyText = await company.getProperty('innerText');
        var companyVal = await companyText.jsonValue();
        expect(companyVal).toBe('Ronald\'s Emporium');

        var location = await root.$('.location');
        var locationText = await location.getProperty('innerText');
        var locationVal = await locationText.jsonValue();
        expect(locationVal).toBe('Jackson, CA');

        var activeStatus = await root.$('.active');
        var statusBlock = await activeStatus.$('p');
        var statusText = await statusBlock.getProperty('innerText');
        var statusVal = await statusText.jsonValue();
        expect(statusVal).toBe('Unapplied');
    });

});
