import { Page } from "@playwright/test";

export class BasePage {
  //header will be created
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async goto(url?: string) {
    url = url || "/";

    await this.page.goto(url);
  }
}
