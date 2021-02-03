# WeTransfer Tech Test
Automation Testing using WebDriver.IO Framework / Node JS / WebDriver API

## Running Tests using NodeJS

### Prerequisites 
- Chrome v88
- Java 8

### Install dependencies
```
npm i
```
### Run tests
```
npm run chrome
```

## Running Tests using Docker and NodeJS

### Prerequisites 
- Docker Desktop
- Docker Compose

### Install dependencies
```
npm i
```
### Building containers
```
npm run docker:buid
```
### Run tests
```
npm run docker:test
```
NOTE: set environment variables in .env file as required

## Running Tests using Docker only

### Prerequisites 
- Docker Desktop
- Docker Compose

### Building containers
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
NOTE: set environment variables in .env file as required

## Reports
These are generated in the reporting dir - just open 'index.html' to access them after running the tests.

## Managing WebDriver Versions
You can change/update version of Selenium Server and associated webDrivers in [selenium-webdriver-versions.js](./selenium-webdriver-versions.js)

## VSCode Cucumber Plugin
You may want to use [this](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete) plugin in VSCode to help with writing feature files