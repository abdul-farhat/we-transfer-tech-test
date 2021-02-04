import fs from "fs";

export function attachFile(
    element: WebdriverIO.Element,
    filePath: string
): boolean {
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