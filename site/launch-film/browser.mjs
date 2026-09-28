import { chromium } from 'playwright';

/** Headless Chromium; set CHROMIUM to use a specific binary instead of Playwright's. */
export function launch(args = []) {
  return chromium.launch({ executablePath: process.env.CHROMIUM || undefined, args });
}
