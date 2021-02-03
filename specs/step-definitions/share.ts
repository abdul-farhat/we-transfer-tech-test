import { Given, Then } from 'cucumber';
import { Expect } from 'expect-webdriverio';
import { page, homepage } from 'page-objects';
import { attachFile, waitForFileToDownload } from 'lib';
import sha256File = require('sha256-file');

const uploadFile = __dirname + '/test-data/upload/less_than_1mb.pdf';
const downloadedFile = process.cwd() + '/downloads/less_than_1mb.pdf';

Given(/^.* navigates to the homepage$/, () => {
    page.open('/');
    expect(browser).toHaveUrl('https://wetransfer.com/');
    homepage.agreeConditionsForFirstTimeUser();
    return;
});

Given(/^.* uploads a file to share$/, () => {
    homepage.prepareUploaderToSendFilesWithoutRegistering();
    attachFile(homepage.addYourFiles, uploadFile);
    return;
});

Then(/^.* downloads it$/, () => {
    page.open(homepage.sharedLink());
    homepage.clickToStartFileDownload();
    waitForFileToDownload(downloadedFile, 15000);
    return;
});

Then(/^.* verifies it$/, () => {
    //const shaCheck = '74747483829';
    const shaCheck = sha256File(uploadFile);
    expect(shaCheck).toEqual(sha256File(downloadedFile));
    return;
});
