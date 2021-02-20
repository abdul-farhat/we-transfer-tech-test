let url: string = process.env.TEST_ENV;
const environmentUri: string = process.env.TEST_ENV;

switch (environmentUri) {

    case "dev":
        url = "https://www.wetransfer.com";
        break;
    case "qa":
        url = "https://dev.test.net";
        break;
    case "sit":
        url = "https://sit.test.net";
        break;
    case "stg":
        url = "https://stg.test.net";
        break;
    case environmentUri:
        url = environmentUri;
        break;
    default:
        url = "https://www.wetransfer.com";
        break;
}

export default {url};
