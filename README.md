# WeTransfer Tech Test
Automation Testing using WebDriver.IO Framework / Node JS / WebDriver API

## Running Tests using Docker

### Prerequisites 
- Docker Desktop - https://www.docker.com/products/docker-desktop

### Building containers

Open up a terminal and navigate to the root path of this repository. Then:

```
docker build -f Dockerfile.linux.environment --tag=tech-test-base .
```
```
docker build --tag=tech-tests .
```
### Run tests
```
docker-compose run --rm tests
```
NOTE: set environment variables in .env file as required. You can pass through WebDriverIO Arguments/Options in here. 

For help with options see: https://webdriver.io/docs/clioptions.html

For help with tags see: https://cucumber.io/docs/cucumber/api/#tags

## Running Tests using Docker and NodeJS

### Prerequisites 
- NodeJS v12/14/LTS - https://nodejs.org/en/download/
- Docker Desktop - https://www.docker.com/products/docker-desktop
- Windows users: after installing nodeJS, also install build-tools as an admin i.e. ```npm i -g windows-build-tools```


### Install dependencies

Open up a terminal and navigate to the root path of this repository. Then:

```
npm i
```
### Building containers
```
npm run docker:build
```
### Run tests
```
npm run docker:test
```
NOTE: set environment variables in .env file as required. You can pass through WebDriverIO Arguments/Options in here. For which options are available see: https://webdriver.io/docs/clioptions.html

## Running Tests using NodeJS

### Prerequisites 
- Chrome v88 - https://www.google.co.uk/chrome/
- Java v8 or greater -https://adoptopenjdk.net/
- NodeJS v12/14/LTS - https://nodejs.org/en/download/
- Windows users: after installing nodeJS, also install build-tools as an **admin** i.e. ```npm i -g windows-build-tools```

### Install dependencies

Open up a terminal and navigate to the root path of this repository.  Then:

```
npm i
```
### Run tests
```
npm run chrome
```

## Reports
These are generated in the 'reporting' folder - just open 'index.html' to access them after running the tests.

## Managing WebDriver Versions
You can change/update version of Selenium Server and associated webDrivers in [selenium-webdriver-versions.json](./selenium-webdriver-versions.json)

## VSCode Cucumber Plugin
You may want to use [this](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete) plugin in VSCode to help with writing feature files

## Behind a Proxy
You may need to set NO_PROXY=127.0.0.1 and/or the relevant HTTP_PROXY/HTTPS_PROXY environment variables.
