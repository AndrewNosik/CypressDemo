Pet project with the Cypress framework. It includes UI and API tests for Swagger open API https://petstore.swagger.io.

## Prerequisites

In order to work with this project, it is recommended to have:

- VSCode or any other IDE
- node.js version **21.1.0** or higher

## Getting Started

1. Clone the project or repository folder
2. Run `npm i` to install all dependencies
3. Some dependencies may not be updated frequently in parallel with cypress. If conflicts arise during installation, use `npm i --force`

## Executing Tests

* Manually run each test using the cypress UI interface (cli). Use `npm run {env}:cli` where **env** is the required environment. If you use a common command like `npx cypress run`, the development environment is set as default 
* To run a specific folder with all spec files, use the command in the console `npx cypress run --spec ./path/**/**.cy.js` (default dev env). This method is not recommended, prefer using the UI interface or available test scripts
* All available test scripts are listed in the **package.json** file. For example, to run regression tests on all platforms (dev, stage, demo) for API or UI
* When running tests from the Test Runner, ensure that none of the tests have the **it.only** tag, as this instructs cypress to run only that specific test and skip all others in the spec file
* To run tests with a specific tag (cypress/grep plugin), use --env grepTags='{tagName}' if it is added in the test name

## Reporting

After the tests are completed, an HTML report is generated using **mochawesome** (located at cypress/reports/mochawesome/report.html) -> you can view all tests and open the video with each (located at cypress/reports/videos) to see the test execution and screenshots of failed tests (located at cypress/reports/screenshots)

## Directory Structure

- config: contains configuration files for each environment 
- downloads: hidden by default due to .gitignore. After running tests, it contains downloaded files
- e2e: contains spec (test) files. UI - UI tests. API - API tests
- page-object: contains main elements of each page that will be reused in spec files and API methods.# CypressDemo
