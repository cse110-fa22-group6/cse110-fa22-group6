describe("Basic user flow for Website", () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    // add the correct URL according to your LiveServer
    await page.goto("http://127.0.0.1:5500/index.html");
  });

  // Check Puppeteer by screenshotting page
  it("Check Puppeteer", async () => {
    console.log("Checking if we screenshotted the correct page...");
    await page.screenshot({ path: "screenshot.png" });
  });

  // Check Jest by asserting something
  it("Check Jest", async () => {
    console.log("Checking if expect().ToBe() works");
    expect(1 + 1).toBe(2);
  });
});
