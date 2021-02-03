# WeTransfer Tech Test
Automation Testing using WebDriver.IO Framework / Node JS / WebDriver API

## Running Tests using Docker only

### Prerequisites 
- Docker Desktop - https://www.docker.com/products/docker-desktop

### Building containers

Open up a terminal and navigate to the root path of this repository.

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

## Running Tests using Docker and NodeJS

### Prerequisites 
- NodeJS v10/12/14
- Docker Desktop
- Docker Compose

### Install dependencies

Open up a terminal and navigate to the root path of this repository.

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

## Running Tests using NodeJS

### Prerequisites 
- Chrome v88
- Java v8
- NodeJS v10/12/14 
- Windows users: after installing node, also install build-tools as an admin i.e. npm i -g windows-build-tools

### Install dependencies

Open up a terminal and navigate to the root path of this repository.

```
npm i
```
### Run tests
```
npm run chrome
```

## Reports
These are generated in the reporting dir - just open 'index.html' to access them after running the tests.

## Managing WebDriver Versions
You can change/update version of Selenium Server and associated webDrivers in [selenium-webdriver-versions.json](./selenium-webdriver-versions.json)

## VSCode Cucumber Plugin
You may want to use [this](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete) plugin in VSCode to help with writing feature files

## Behind a Proxy
You may need to set NO_PROXY=127.0.01 and/or the relevant HTTP_PROXY/HTTPS_PROXY variables.