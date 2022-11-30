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
    var add_btn = await page.$('[id="add-application-btn"]');
    await add_btn.click(0, 1, 1);
    var popup = await page.$('[id="add-application"]');
    expect(await popup.isIntersectingViewport()).toBe(true);
    var cancel_btn = await popup.$('[id="add-cancel"]');
    await cancel_btn.click(0, 1, 1);
    expect(await popup.isIntersectingViewport()).toBe(false);
  });

  it("Check adding application", async () => {
    console.log("Testing adding application...");
    var add_btn = await page.$('[id="add-application-btn"]');
    await add_btn.click(0, 1, 1);
    var popup = await page.$('[id="add-application"]');
    expect(await popup.isIntersectingViewport()).toBe(true);

    var text_box = await popup.$('[id="company"]');
    await text_box.type("Ronald's Emporium");
    text_box = await popup.$('[id="position"]');
    await text_box.type("Professional Burger Flipper");
    text_box = await popup.$('[id="location"]');
    await text_box.type("Jackson, CA");
    text_box = await popup.$('[id="date"]');
    await text_box.type("06212023");

    var submit_btn = await popup.$('[id="add-submit"]');
    await submit_btn.click(0, 1, 1);
    await page.reload();
    popup = await page.$('[id="add-application"]');
    expect(await popup.isIntersectingViewport()).toBe(false);
    var jobs = await page.$$("job-card");
    expect(jobs.length).toBe(1);
  });

  it("Check new job card", async () => {
    console.log("Checking the new job card...");
    var jobs = await page.$$("job-card");
    expect(jobs.length).toBe(1);
    var app = jobs[0];
    var root = await app.getProperty("shadowRoot");

    var position = await root.$(".position");
    var position_text = await position.getProperty("innerText");
    var position_val = await position_text.jsonValue();
    expect(position_val).toBe("Professional Burger Flipper");

    var company = await root.$(".company");
    var company_text = await company.getProperty("innerText");
    var company_val = await company_text.jsonValue();
    expect(company_val).toBe("Ronald's Emporium");

    var location = await root.$(".location");
    var location_text = await location.getProperty("innerText");
    var location_val = await location_text.jsonValue();
    expect(location_val).toBe("Jackson, CA");
    var active_status = await root.$(".active");
    var status_block = await active_status.$("p");
    var status_text = await status_block.getProperty("innerText");
    var status_val = await status_text.jsonValue();
    expect(status_val).toBe("Unapplied");
  });

  it("Check edit confirmation popup", async () => {
    console.log("Testing edit confirmation popup...");
    var app = await page.$("job-card");
    var root = await app.getProperty("shadowRoot");
    var edit_btn = await root.$(".edit-icon");
    await edit_btn.click(0, 1, 1);
    var popup = await page.$('[id="edit-application"]');
    expect(await popup.isIntersectingViewport()).toBe(true);
    var cancel_btn = await popup.$('[id="edit-cancel"]');
    await cancel_btn.click(0, 1, 1);
    expect(await popup.isIntersectingViewport()).toBe(false);
  });

  it("Check editing application", async () => {
    console.log("Testing editing application...");
    var app = await page.$("job-card");
    var root = await app.getProperty("shadowRoot");
    var edit_btn = await root.$(".edit-icon");
    await edit_btn.click(0, 1, 1);
    var popup = await page.$('[id="edit-application"]');
    expect(await popup.isIntersectingViewport()).toBe(true);

    var text_box = await popup.$('[id="company-edit"]');
    await text_box.type("Amazon");
    text_box = await popup.$('[id="position-edit"]');
    await text_box.type("Software Engineering Intern");
    text_box = await popup.$('[id="location-edit"]');
    await text_box.type("San Francisco, CA");
    text_box = await popup.$('[id="date-edit"]');
    await text_box.type("06222023");

    var submit_btn = await popup.$('[id="edit-submit"]');
    await submit_btn.click(0, 1, 1);
    await page.reload();
    popup = await page.$('[id="edit-application"]');
    expect(await popup.isIntersectingViewport()).toBe(false);
    var jobs = await page.$$("job-card");
    expect(jobs.length).toBe(1);
  });

  it("Check edited job card", async () => {
    console.log("Checking the edited job card...");
    var jobs = await page.$$("job-card");
    expect(jobs.length).toBe(1);
    var app = jobs[0];
    var root = await app.getProperty("shadowRoot");

    var position = await root.$(".position");
    var position_text = await position.getProperty("innerText");
    var position_val = await position_text.jsonValue();
    expect(position_val).toBe("Software Engineering Intern");

    var company = await root.$(".company");
    var company_text = await company.getProperty("innerText");
    var company_val = await company_text.jsonValue();
    expect(company_val).toBe("Amazon");

    var location = await root.$(".location");
    var location_text = await location.getProperty("innerText");
    var location_val = await location_text.jsonValue();
    expect(location_val).toBe("San Francisco, CA");

    var active_status = await root.$(".active");
    var status_block = await active_status.$("p");
    var status_text = await status_block.getProperty("innerText");
    var status_val = await status_text.jsonValue();
    expect(status_val).toBe("Unapplied");
  });

  it("Check delete confirmation popup", async () => {
    console.log("Testing delete confirmation popup...");
    var app = await page.$("job-card");
    var root = await app.getProperty("shadowRoot");
    var delete_btn = await root.$(".delete-icon");
    await delete_btn.click(0, 1, 1);
    var popup = await page.$('[id="delete-application"]');
    expect(await popup.isIntersectingViewport()).toBe(true);
    var cancel_btn = await popup.$('[id="d-cancel"]');
    await cancel_btn.click(0, 1, 1);
    expect(await popup.isIntersectingViewport()).toBe(false);
  });

  it("Check deleting application", async () => {
    console.log("Testing deleting application...");
    var app = await page.$("job-card");
    var root = await app.getProperty("shadowRoot");
    var delete_btn = await root.$(".delete-icon");
    await delete_btn.click(0, 1, 1);
    var popup = await page.$('[id="delete-application"]');
    expect(await popup.isIntersectingViewport()).toBe(true);

    var submit_btn = await popup.$('[id="d-delete"]');
    await submit_btn.click(0, 1, 1);
    await page.reload();
    popup = await page.$('[id="add-application"]');
    expect(await popup.isIntersectingViewport()).toBe(false);
    var jobs = await page.$$("job-card");
    expect(jobs.length).toBe(0);
  });
});
