/* eslint-disable node/no-unpublished-import */
import {
	chromium,
	devices,
	selectors,
	type BrowserContextOptions,
} from "playwright";
import cookies from "./cookies.json" assert { type: "json" };

console.time("Screenshots");
selectors.setTestIdAttribute("id");
const url = "http://localhost:3002/";
const viewports: Record<string, (typeof devices)[string]> = {
	default: devices["iPhone 14 Pro Max"],
	// sm: devices["Galaxy Tab S4"],
	// md: devices["iPad (gen 5)"],
	// lg: devices["iPad (gen 5) landscape"],
	xl: { ...devices["Desktop Chrome"], deviceScaleFactor: 1.5 },
	"2xl": {
		...devices["Desktop Chrome HiDPI"],
		viewport: { width: 1536, height: 864 },
	},
};
const baseOptions: BrowserContextOptions = {
	baseURL: url,
	// @ts-expect-error Json import without const type
	storageState: { origins: [], cookies },
};
const browser = await chromium.launch();
// const page = await browser.newPage(baseOptions);

// await page.goto("/predictions");
// await page.pause();
// const cookies = await page.context().cookies("http://localhost:3002");

// await writeFile("../cookies.json", JSON.stringify(cookies));
await Promise.all(
	Object.keys(viewports).flatMap(async (viewport) => {
		const page = await browser.newPage({
			...baseOptions,
			...viewports[viewport],
		});

		await page.goto("/predictions");
		await page.getByTestId("form").waitFor();
		await page.screenshot({
			animations: "disabled",
			path: `../../public/previews/${viewport}.png`,
		});
	})
);
await browser.close();
console.timeEnd("Screenshots");
