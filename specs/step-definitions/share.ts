import { Given, Then } from 'cucumber';
import { page, homepage } from 'page-objects';
import { attachFile, waitForFileToDownload } from 'lib';
import sha256File = require('sha256-file');

const uploadDir= __dirname + '/test-data/upload/';
const downloadDir = process.cwd() + '/downloads/';

Given(/^.* navigates to the homepage$/, () => {
    page.open('/');
    expect(browser).toHaveUrl('https://wetransfer.com/');
    homepage.agreeConditionsForFirstTimeUser();
    return;
});

Given(/^.* uploads files called '(.*)' and '(.*)'$/, (fileOne: string, fileTwo: string) => {
    homepage.prepareUploaderToSendFilesWithoutRegistering();
    attachFile(homepage.addYourFiles, uploadDir + fileOne);
    attachFile(homepage.addYourFiles, uploadDir + fileTwo);
    return;
});

Then(/^.* navigates to the shared link$/, () => {
    page.open(homepage.sharedLink());
    return;
});

Then(/^.* downloads the file '(.*)'$/, (fileOne: string) => {
    homepage.clickToStartFileDownload(fileOne);
    waitForFileToDownload(downloadDir + fileOne, 15000);
    return;
});

Then(/^.* verifies the file '(.*)'$/, (fileOne: string) => {
    //const shaCheck = '74747483829';
    const shaCheck = sha256File(uploadDir + fileOne);
    expect(shaCheck).toEqual(sha256File(downloadDir + fileOne));
    return;
});
