class HomePage {

    public get agreeTandCsButton(): WebdriverIO.Element { return $('button.button.welcome__agree.button--enabled'); }
    public get agreeCookiesButton(): WebdriverIO.Element { return $('div.welcome__buttons button.button.welcome__button.welcome__button--accept'); }
    public get optionsButton(): WebdriverIO.Element { return $('button.transfer__toggle-options'); }
    public get transferByLinkButton(): WebdriverIO.Element { return $('label.radioinput__label[for="transfer__type-link"]'); }
    public get addYourFilesHeading(): WebdriverIO.Element { return $('.uploader__empty-state h2'); }
    public get addYourFiles(): WebdriverIO.Element { return $('input[type="file"]'); }
    public get getLink(): WebdriverIO.Element { return $('//button[text()="Get a link"]'); }
    public get getURL(): WebdriverIO.Element { return $('input.transfer-link__url'); }
    public get fileDownloadButton(): string { return '//h6[text()="value"]/../..//div[@class="filelist__action"]'; }
    public get fileDownloadedIcon(): string { return '//h6[text()="value"]/../..//div[@class="filelist__action filelist__action--downloaded"]'; }
    
    // clickToStartFileDownload(): void {
    //     this.getLink.waitForClickable();
    //     this.getLink.click();
    // }

    clickToStartFileDownload(fileName: string): void {
        const fileDownload = this.fileDownloadButton.replace('value', fileName);
        browser.$(fileDownload).waitForClickable();
        browser.$(fileDownload).click();
        return;
    }

    agreeConditionsForFirstTimeUser(): void {
        this.agreeTandCsButton.waitForDisplayed();
        this.agreeTandCsButton.click();
        this.agreeTandCsButton.waitForDisplayed({ reverse: true });

        this.agreeCookiesButton.waitForClickable();
        this.agreeCookiesButton.click();
        this.agreeCookiesButton.waitForDisplayed({ reverse: true });
    }

    prepareUploaderToSendFilesWithoutRegistering(): void {
        this.optionsButton.waitForClickable();
        this.optionsButton.click();

        this.transferByLinkButton.waitForClickable();
        this.transferByLinkButton.click();

        this.optionsButton.waitForClickable();
        this.optionsButton.click();

        this.addYourFilesHeading.waitForDisplayed();
    }

    sharedLink(): string {
        this.getLink.waitForClickable({timeout: 120000});
        this.getLink.click();
    
        this.getURL.waitForDisplayed({timeout: 150000});
        return this.getURL.getValue();
    }

}

const homePage = new HomePage();
Object.freeze(homePage);
export default homePage;