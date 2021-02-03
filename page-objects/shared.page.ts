class Page {
    public open(path: string): void {
        browser.url(path);
    }
}

const page = new Page();
Object.freeze(page);
export default page;