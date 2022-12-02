/* eslint-disable quotes */
/* eslint-disable snakecasejs/snakecasejs */
/* eslint-disable no-undef */
const { expect } = require("@jest/globals");
const jestPuppeteerConfig = require("../jest-puppeteer.config");
const URL = "https://cse110-fa22-group6.github.io/cse110-fa22-group6/source/index.html";
describe("Basic user flow for Website", () => {
  beforeAll(async () => {
    // add the correct URL according to your LiveServer
    await page.goto(URL);
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
    var addBtn = await page.$('[id="add-application-btn"]');
    await addBtn.click(0, 1, 1);
    var popup = await page.$('[id="add-application"]');
    expect(await popup.isIntersectingViewport()).toBe(true);
    var cancelBtn = await popup.$('[id="add-cancel"]');
    await cancelBtn.click(0, 1, 1);
    expect(await popup.isIntersectingViewport()).toBe(false);
  });

  it("Check adding application", async () => {
    console.log("Testing adding application...");
    var addBtn = await page.$('[id="add-application-btn"]');
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

    var submitBtn = await popup.$('[id="add-submit"]');
    await submitBtn.click(0, 1, 1);
    await page.reload();
    await Promise.all([
      page.goto(URL),
      page.waitForSelector('#add-application'),
    ]);
    popup = await page.$('[id="add-application"]');
    expect(await popup.isIntersectingViewport()).toBe(false);
    var jobs = await page.$$("job-card");
    expect(jobs.length).toBe(1);
  }, 10000);

  it("Check new job card", async () => {
    console.log("Checking the new job card...");
    var jobs = await page.$$("job-card");
    expect(jobs.length).toBe(1);
    var app = jobs[0];
    var root = await app.getProperty("shadowRoot");

    var position = await root.$(".position");
    var positionText = await position.getProperty("innerText");
    var positionVal = await positionText.jsonValue();
    expect(positionVal).toBe("Professional Burger Flipper");

    var company = await root.$(".company");
    var companyText = await company.getProperty("innerText");
    var companyVal = await companyText.jsonValue();
    expect(companyVal).toBe("Ronald's Emporium");

    var location = await root.$(".location");
    var locationText = await location.getProperty("innerText");
    var locationVal = await locationText.jsonValue();
    expect(locationVal).toBe("Jackson, CA");
    var activeStatus = await root.$(".active");
    var statusBlock = await activeStatus.$("p");
    var statusText = await statusBlock.getProperty("innerText");
    var statusVal = await statusText.jsonValue();
    expect(statusVal).toBe("Unapplied");
  });

  it("Check adding application without company", async () => {
    console.log("Testing adding application without company...");
    var addBtn = await page.$('[id="add-application-btn"]');
    await addBtn.click(0, 1, 1);
    var popup = await page.$('[id="add-application"]');
    expect(await popup.isIntersectingViewport()).toBe(true);

    textBox = await popup.$('[id="company"]');
    await textBox.type("");
    textBox = await popup.$('[id="position"]');
    await textBox.type("Professional Burger Flipper");
    textBox = await popup.$('[id="location"]');
    await textBox.type("Jackson, CA");
    textBox = await popup.$('[id="date"]');
    await textBox.type("06212023");

    var submitBtn = await popup.$('[id="add-submit"]');
    await submitBtn.click(0, 1, 1);
    expect(await popup.isIntersectingViewport()).toBe(true);
    var jobs = await page.$$("job-card");
    expect(jobs.length).toBe(1);

    await page.reload();
  }, 10000);

  it("Check adding application without position", async () => {
    console.log("Testing adding application without company...");
    var addBtn = await page.$('[id="add-application-btn"]');
    await addBtn.click(0, 1, 1);
    var popup = await page.$('[id="add-application"]');
    expect(await popup.isIntersectingViewport()).toBe(true);

    textBox = await popup.$('[id="company"]');
    await textBox.type("Ronald's Emporium");
    textBox = await popup.$('[id="position"]');
    await textBox.type("");
    textBox = await popup.$('[id="location"]');
    await textBox.type("Jackson, CA");
    textBox = await popup.$('[id="date"]');
    await textBox.type("06212023");

    var submitBtn = await popup.$('[id="add-submit"]');
    await submitBtn.click(0, 1, 1);
    expect(await popup.isIntersectingViewport()).toBe(true);
    var jobs = await page.$$("job-card");
    expect(jobs.length).toBe(1);

    await page.reload();
  }, 10000);

  it("Check adding application without date", async () => {
    console.log("Testing adding application without company...");
    var addBtn = await page.$('[id="add-application-btn"]');
    await addBtn.click(0, 1, 1);
    var popup = await page.$('[id="add-application"]');
    expect(await popup.isIntersectingViewport()).toBe(true);

    textBox = await popup.$('[id="company"]');
    await textBox.type("Ronald's Emporium");
    textBox = await popup.$('[id="position"]');
    await textBox.type("Professional Burger Flipper");
    textBox = await popup.$('[id="location"]');
    await textBox.type("Jackson, CA");
    textBox = await popup.$('[id="date"]');
    await textBox.type("");

    var submitBtn = await popup.$('[id="add-submit"]');
    await submitBtn.click(0, 1, 1);
    expect(await popup.isIntersectingViewport()).toBe(true);
    var jobs = await page.$$("job-card");
    expect(jobs.length).toBe(1);

    await page.reload();
  }, 10000);

  it("Check edit confirmation popup", async () => {
    console.log("Testing edit confirmation popup...");
    var app = await page.$("job-card");
    var root = await app.getProperty("shadowRoot");
    var editBtn = await root.$(".edit-icon");
    await editBtn.click(0, 1, 1);
    var popup = await page.$('[id="edit-application"]');
    expect(await popup.isIntersectingViewport()).toBe(true);
    var cancelBtn = await popup.$('[id="edit-cancel"]');
    await cancelBtn.click(0, 1, 1);
    expect(await popup.isIntersectingViewport()).toBe(false);
  });

  it("Check editing application", async () => {
    console.log("Testing editing application...");
    var app = await page.$("job-card");
    var root = await app.getProperty("shadowRoot");
    var editBtn = await root.$(".edit-icon");
    await editBtn.click(0, 1, 1);
    var popup = await page.$('[id="edit-application"]');
    expect(await popup.isIntersectingViewport()).toBe(true);

    var textBox = await popup.$('[id="company-edit"]');
    await textBox.type("Amazon");
    textBox = await popup.$('[id="position-edit"]');
    await textBox.type("Software Engineering Intern");
    textBox = await popup.$('[id="location-edit"]');
    await textBox.type("San Francisco, CA");
    textBox = await popup.$('[id="date-edit"]');
    await textBox.type("06222023");

    var submitBtn = await popup.$('[id="edit-submit"]');
    await submitBtn.click(0, 1, 1);
    await page.reload();
    await Promise.all([
      page.goto(URL),
      page.waitForSelector('#edit-application'),
    ]);
    popup = await page.$('[id="edit-application"]');
    expect(await popup.isIntersectingViewport()).toBe(false);
    var jobs = await page.$$("job-card");
    expect(jobs.length).toBe(1);
  }, 10000);

  it("Check edited job card", async () => {
    console.log("Checking the edited job card...");
    var jobs = await page.$$("job-card");
    expect(jobs.length).toBe(1);
    var app = jobs[0];
    var root = await app.getProperty("shadowRoot");

    var position = await root.$(".position");
    var positionText = await position.getProperty("innerText");
    var positionVal = await positionText.jsonValue();
    expect(positionVal).toBe("Software Engineering Intern");

    var company = await root.$(".company");
    var companyText = await company.getProperty("innerText");
    var companyVal = await companyText.jsonValue();
    expect(companyVal).toBe("Amazon");

    var location = await root.$(".location");
    var locationText = await location.getProperty("innerText");
    var locationVal = await locationText.jsonValue();
    expect(locationVal).toBe("San Francisco, CA");

    var activeStatus = await root.$(".active");
    var statusBlock = await activeStatus.$("p");
    var statusText = await statusBlock.getProperty("innerText");
    var statusVal = await statusText.jsonValue();
    expect(statusVal).toBe("Unapplied");
  });

  it("Check editing application without company", async () => {
    console.log("Testing editing application without company...");
    var app = await page.$("job-card");
    var root = await app.getProperty("shadowRoot");
    var editBtn = await root.$(".edit-icon");
    await editBtn.click(0, 1, 1);
    var popup = await page.$('[id="edit-application"]');
    expect(await popup.isIntersectingViewport()).toBe(true);

    textBox = await popup.$('[id="company-edit"]');
    await textBox.type("");
    textBox = await popup.$('[id="position-edit"]');
    await textBox.type("BAD");
    textBox = await popup.$('[id="location-edit"]');
    await textBox.type("BAD");
    textBox = await popup.$('[id="date-edit"]');
    await textBox.type("11111111");

    var submitBtn = await popup.$('[id="edit-submit"]');
    await submitBtn.click(0, 1, 1);
    expect(await popup.isIntersectingViewport()).toBe(true);
    var jobs = await page.$$("job-card");
    expect(jobs.length).toBe(1);

    await page.reload();
    await Promise.all([
      page.goto(URL),
      page.waitForSelector('job-card'),
    ]);

    var jobs = await page.$$("job-card");
    expect(jobs.length).toBe(1);
    var app = jobs[0];
    var root = await app.getProperty("shadowRoot");

    var position = await root.$(".position");
    var positionText = await position.getProperty("innerText");
    var positionVal = await positionText.jsonValue();
    expect(positionVal).toBe("Software Engineering Intern");
  }, 10000);

  it("Check editing application without position", async () => {
    console.log("Testing editing application without position...");
    var app = await page.$("job-card");
    var root = await app.getProperty("shadowRoot");
    var editBtn = await root.$(".edit-icon");
    await editBtn.click(0, 1, 1);
    var popup = await page.$('[id="edit-application"]');
    expect(await popup.isIntersectingViewport()).toBe(true);

    textBox = await popup.$('[id="company-edit"]');
    await textBox.type("BAD");
    textBox = await popup.$('[id="position-edit"]');
    await textBox.type("");
    textBox = await popup.$('[id="location-edit"]');
    await textBox.type("BAD");
    textBox = await popup.$('[id="date-edit"]');
    await textBox.type("11111111");

    var submitBtn = await popup.$('[id="edit-submit"]');
    await submitBtn.click(0, 1, 1);
    expect(await popup.isIntersectingViewport()).toBe(true);
    var jobs = await page.$$("job-card");
    expect(jobs.length).toBe(1);

    await page.reload();
    await Promise.all([
      page.goto(URL),
      page.waitForSelector('job-card'),
    ]);

    var jobs = await page.$$("job-card");
    expect(jobs.length).toBe(1);
    var app = jobs[0];
    var root = await app.getProperty("shadowRoot");

    var position = await root.$(".company");
    var positionText = await position.getProperty("innerText");
    var positionVal = await positionText.jsonValue();
    expect(positionVal).toBe("Amazon");
  }, 10000);

  it("Check editing application without date", async () => {
    console.log("Testing editing application without date...");
    var app = await page.$("job-card");
    var root = await app.getProperty("shadowRoot");
    var editBtn = await root.$(".edit-icon");
    await editBtn.click(0, 1, 1);
    var popup = await page.$('[id="edit-application"]');
    expect(await popup.isIntersectingViewport()).toBe(true);

    textBox = await popup.$('[id="company-edit"]');
    await textBox.type("BAD");
    textBox = await popup.$('[id="position-edit"]');
    await textBox.type("BAD");
    textBox = await popup.$('[id="location-edit"]');
    await textBox.type("BAD");
    textBox = await popup.$('[id="date-edit"]');
    await textBox.type("");

    var submitBtn = await popup.$('[id="edit-submit"]');
    await submitBtn.click(0, 1, 1);
    expect(await popup.isIntersectingViewport()).toBe(true);
    var jobs = await page.$$("job-card");
    expect(jobs.length).toBe(1);

    await page.reload();
    await Promise.all([
      page.goto(URL),
      page.waitForSelector('job-card'),
    ]);

    var jobs = await page.$$("job-card");
    expect(jobs.length).toBe(1);
    var app = jobs[0];
    var root = await app.getProperty("shadowRoot");

    var position = await root.$(".position");
    var positionText = await position.getProperty("innerText");
    var positionVal = await positionText.jsonValue();
    expect(positionVal).toBe("Software Engineering Intern");
  }, 10000);

  it("Check change application status", async () => {
    console.log("Testing changing application status...");
    var app = await page.$("job-card");
    var root = await app.getProperty("shadowRoot");
    var stages = await root.$(".stages");
    var stageList = await root.$$(".step");
    expect(stageList.length).toBe(6);

    await stageList[0].click(0,1,1);
    await page.reload();
    await Promise.all([
      page.goto(URL),
      page.waitForSelector('job-card'),
    ]);
    app = await page.$("job-card");
    root = await app.getProperty("shadowRoot");
    stages = await root.$(".stages");
    var activeList = await stages.$$(".active");
    expect(activeList.length).toBe(1);
    var activeBlock = await activeList[0].$("p");
    var activeTxt = await activeBlock.getProperty("innerText");
    expect(await activeTxt.jsonValue()).toBe("Rejected");

    stageList = await root.$$(".step");
    await stageList[1].click(0,1,1);
    await page.reload();
    await Promise.all([
      page.goto(URL),
      page.waitForSelector('job-card'),
    ]);
    app = await page.$("job-card");
    root = await app.getProperty("shadowRoot");
    stages = await root.$(".stages");
    activeList = await stages.$$(".active");
    expect(activeList.length).toBe(1);
    activeBlock = await activeList[0].$("p");
    activeTxt = await activeBlock.getProperty("innerText");
    expect(await activeTxt.jsonValue()).toBe("Unapplied");

    stageList = await root.$$(".step");
    await stageList[2].click(0,1,1);
    await page.reload();
    await Promise.all([
      page.goto(URL),
      page.waitForSelector('job-card'),
    ]);
    app = await page.$("job-card");
    root = await app.getProperty("shadowRoot");
    stages = await root.$(".stages");
    activeList = await stages.$$(".active");
    expect(activeList.length).toBe(1);
    activeBlock = await activeList[0].$("p");
    activeTxt = await activeBlock.getProperty("innerText");
    expect(await activeTxt.jsonValue()).toBe("Applied");

    stageList = await root.$$(".step");
    await stageList[3].click(0,1,1);
    await page.reload();
    await Promise.all([
      page.goto(URL),
      page.waitForSelector('job-card'),
    ]);
    app = await page.$("job-card");
    root = await app.getProperty("shadowRoot");
    stages = await root.$(".stages");
    activeList = await stages.$$(".active");
    expect(activeList.length).toBe(1);
    activeBlock = await activeList[0].$("p");
    activeTxt = await activeBlock.getProperty("innerText");
    expect(await activeTxt.jsonValue()).toBe("Screening");

    stageList = await root.$$(".step");
    await stageList[4].click(0,1,1);
    await page.reload();
    await Promise.all([
      page.goto(URL),
      page.waitForSelector('job-card'),
    ]);
    app = await page.$("job-card");
    root = await app.getProperty("shadowRoot");
    stages = await root.$(".stages");
    activeList = await stages.$$(".active");
    expect(activeList.length).toBe(1);
    activeBlock = await activeList[0].$("p");
    activeTxt = await activeBlock.getProperty("innerText");
    expect(await activeTxt.jsonValue()).toBe("Interview");

    stageList = await root.$$(".step");
    await stageList[5].click(0,1,1);
    await page.reload();
    await Promise.all([
      page.goto(URL),
      page.waitForSelector('job-card'),
    ]);
    app = await page.$("job-card");
    root = await app.getProperty("shadowRoot");
    stages = await root.$(".stages");
    activeList = await stages.$$(".active");
    expect(activeList.length).toBe(1);
    activeBlock = await activeList[0].$("p");
    activeTxt = await activeBlock.getProperty("innerText");
    expect(await activeTxt.jsonValue()).toBe("Offer");

    stageList = await root.$$(".step");
    expect(stageList.length).toBe(6);
  }, 10000);

  it("Check delete confirmation popup", async () => {
    console.log("Testing delete confirmation popup...");
    var app = await page.$("job-card");
    var root = await app.getProperty("shadowRoot");
    var deleteBtn = await root.$(".delete-icon");
    await deleteBtn.click(0, 1, 1);
    var popup = await page.$('[id="delete-application"]');
    expect(await popup.isIntersectingViewport()).toBe(true);
    var cancelBtn = await popup.$('[id="d-cancel"]');
    await cancelBtn.click(0, 1, 1);
    expect(await popup.isIntersectingViewport()).toBe(false);
  });

  it("Check deleting application", async () => {
    console.log("Testing deleting application...");
    var app = await page.$("job-card");
    var root = await app.getProperty("shadowRoot");
    var deleteBtn = await root.$(".delete-icon");
    await deleteBtn.click(0, 1, 1);
    var popup = await page.$('[id="delete-application"]');
    expect(await popup.isIntersectingViewport()).toBe(true);

    var submitBtn = await popup.$('[id="d-delete"]');
    await submitBtn.click(0, 1, 1);
    await page.reload();
    await Promise.all([
      page.goto(URL),
      page.waitForSelector('#add-application'),
    ]);
    popup = await page.$('[id="add-application"]');
    expect(await popup.isIntersectingViewport()).toBe(false);
    var jobs = await page.$$("job-card");
    expect(jobs.length).toBe(0);
  }, 10000);
});
