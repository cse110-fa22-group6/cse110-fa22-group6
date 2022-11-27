describe("Basic user flow for Website", () => {
  beforeAll(async () => {
    const LIVESERVER_URL = "http://127.0.0.1:5500/index.html";
    // add the correct URL according to your LiveServer
    await page.goto(LIVESERVER_URL);
  });

  it("Check page status when first opened (clear local storage)", async () => {
    console.log("clearing local storage and checking status of page...");
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.reload();
    var jobs = page.$$("job-card");
    expect(jobs.length).toBe(0);
  });
});
