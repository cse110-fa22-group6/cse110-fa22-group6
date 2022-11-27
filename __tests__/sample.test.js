describe("Basic user flow for Website", () => {
  // First, visit the website
  beforeAll(async () => {
    const LIVESERVER_URL = "http://127.0.0.1:5500/index.html";
    // add the correct URL according to your LiveServer
    await page.goto(LIVESERVER_URL);
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
