const { defineConfig } = require('cypress');
const fs = require('fs-extra')
const path = require('path');
const mysql = require('mysql');

module.exports = defineConfig({
    projectId: "",
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
        reporterEnabled: 'mochawesome',
        mochawesomeReporterOptions: {
            reportDir: 'cypress/reports/mocha',
            quite: true,
            overwrite: false,
            html: false,
            json: true,
        },
    },
    compilerOptions: {
        allowJs: true,
        baseUrl: "./node_modules",
        types:
            "cypress",
        include: "**/*.*"
    },
    videoCompression: 15,
    video: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    watchForFileChanges: false,
    experimentalMemoryManagement: true,
    retries: {
        runMode: 1,
        openMode: 0,
    },
    e2e: {
        setupNodeEvents(on, config) {
            on('task', {
                connectDb: query => {
                    function connectDb(query, config) {
                        // creates a new mysql connection using credentials from cypress.json env's
                        const connection = mysql.createConnection(config.env.db_credentials);
                        // start connection to db
                        connection.connect();
                        // exec query + disconnect to db as a Promise
                        return new Promise((resolve, reject) => {
                            connection.query(query, (error, results) => {
                                if (error) reject(error);
                                else {
                                    connection.end();
                                    return resolve(results);
                                }
                            });
                        });
                    }
                    return connectDb(query, config);
                },
                downloads: (downloadspath) => {
                    return fs.readdirSync(downloadspath);
                },
            });
            on('before:run', () => {
                function deleteFolderRecursive(path) {
                    if (fs.existsSync(path)) {
                        fs.readdirSync(path).forEach((file) => {
                            const curPath = `${path}/${file}`;
                            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                                deleteFolderRecursive(curPath);
                            } else { // delete file
                                fs.unlinkSync(curPath);
                            }
                        });
                        fs.rmdirSync(path);
                    }
                }
                deleteFolderRecursive('cypress/reports/mocha/');
            });

            require('@cypress/grep/src/plugin')(config);

            // this option let you use the test data specified in config folder
            // accept a configFile value or use dev by default   
            // this approach not working with DB connection because need to return config but not a file
            // function getConfigurationByFile(file) {
            //   const pathToConfigFile = path.resolve(".", "cypress/config", `${file}.json`);
            //   return fs.readJson(pathToConfigFile);
            // }
            // const file = config.env.env || "dev";
            // return getConfigurationByFile(file);

            const env = config.env.env || "main"
            // load env from json
            config = require(`./cypress/config/${env}.json`);
            // change baseurl
            config.baseUrl = config.env.baseUrl
            
            return config
        },
    },
});