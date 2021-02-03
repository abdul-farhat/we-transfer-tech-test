import { After, Before, BeforeAll } from "cucumber";

After((scenarioResult) => {
    if (scenarioResult.result.status === 'failed')
        browser.saveScreenshot('./errorScreenshots/ERROR-' + scenarioResult.pickle.name.toString() + '-' + Date.now() + '.png');
    return scenarioResult.result.status;
});
