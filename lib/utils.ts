import fs from "fs";

export function getLink(element: WebdriverIO.Element): string {
    return element.getAttribute("href");
}

export function getLinks(element: WebdriverIO.Element[]): string[] {
    return element.map(function (ele) {
        return ele.getAttribute("href");
    });
}

export function getText(element: WebdriverIO.Element[]): string[] {
    return element.map(function (ele) {
        return ele.getText();
    });
}

export function checkboxDeselectedFor(element: WebdriverIO.Element): boolean {
    return browser.waitUntil(
        () => {
            return element.getAttribute("value") === "false";
        },
        { timeout: 5000, timeoutMsg: "expected checkbox to be unchecked after 5s" }
    );
}

export function click(
    element: WebdriverIO.Element,
    xpath?: WebdriverIO.Element
): boolean {
    browser.waitUntil(
        () => {
            return element.waitForExist() === true;
        },
        {
            timeout: 5000,
            timeoutMsg:
                "Oh-dear! An error occured.\nReason: element (" +
                element +
                ") does NOT exist!",
        }
    );

    browser.waitUntil(
        () => {
            return element.waitForDisplayed() === true;
        },
        {
            timeout: 5000,
            timeoutMsg:
                "Oh-dear! An error occured.\nReason: element (" +
                element +
                ") is NOT visible!",
        }
    );

    browser.waitUntil(
        () => {
            return element.isClickable() === true;
        },
        {
            timeout: 5000,
            timeoutMsg:
                "Oh-dear! An error occured.\nReason: element (" +
                element +
                ") is NOT clickable!",
        }
    );

    if (xpath) {
        xpath.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "end",
        });
        xpath.click();
        return;
    }

    browser.execute((selectorToClickOn) => {
        document.querySelector(selectorToClickOn).click();
    }, element.selector);

    return;
}

export function attachFile(
    element: WebdriverIO.Element,
    filePath: string
): boolean {
    browser.execute((el) => (el.style.display = "block"), element);
    element.waitForExist();
    element.setValue(filePath);
    return element.isDisplayed();
}

export function waitForFileToDownload(
    path: string,
    timeout: number
): boolean {
    return browser.waitUntil((): boolean => {
        try {
            const watchStartTime = Date.now();
            while (!fs.existsSync(path)) 
                if (Date.now() - watchStartTime > timeout/1000) 
                    return false;
            return true;
        }
        catch (err) {
            throw console.error(err);
        }
    },
    {
        timeout: timeout,
        timeoutMsg: "Oh-dear! File took too long to download. Try increasing your timeouts or choose a smaller file size"
    }
    );
}