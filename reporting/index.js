var jsDataFile = reportingData;
var dataObj = [];

var allScenarios = [];
var scenariosFailed = [];
var scenariosPassed = [];
var scenarioName = [];
var scenarioDuration = [];
var scenarioStatus = [];

var testStepsPassed = [];
var testStepsFailed = [];
var testStepsBroken = [];
var testStepsSkipped = [];
var testStepsUnknown = [];

var browser = "";
var environmentUrl = "";

function transformReportingData(data) {
    Object.keys(data).forEach(function (key) {

        dataObj.push(...data[key]);

    });

    dataObj.forEach(extractAllScenarioData);

}

transformReportingData(jsDataFile);

function sum(items, prop) {
    return items.reduce(function (a, b) {
        return a + b[prop];
    }, 0);
};

function populateDataForScenarioSteps(scenarios) {
    let test = [];
    let testStep = [];

    for (let i = 0; i < scenarios.length; i++) {
        test.push(scenarios[i].steps);
    }

    for (let j = 0; j < test.length; j++) {
        testStep.push(test[j])
    }

    const generateStepNames = (items) => {
        let stepName = [];
        for (let i = 0; i < items.length; i++) {
            if ((items[i].name.indexOf("Hook") >= 0) === false) {
                stepName.push({
                    ['step']: items[i].name,
                    ['duration']: items[i].result.duration,
                    ['roundedDuration']: (items[i].result.duration / 1000000000).toFixed(2),
                    ['status']: items[i].result.status
                });
            }
        }
        let duration = sum(stepName, 'duration');

        let status = stepName.filter(step => {
            return step.status !== 'passed';
        });

        (status.length > 0) ? status = 'failed' : status = 'passed';

        let stepPassed = stepName.filter(step => {
            return step.status === 'passed';
        });

        let stepFailed = stepName.filter(step => {
            return step.status === 'failed';
        });

        let stepBroken = stepName.filter(step => {
            return step.status === 'broken';
        });

        let stepSkipped = stepName.filter(step => {
            return step.status === 'skipped';
        });

        let stepUnknown = stepName.filter(step => {
            return step.status === 'unknown';
        });

        return [stepName,
            { ['totalDuration']: duration },
            { ['scenarioStatus']: status },
            { ['passed']: stepPassed },
            { ['failed']: stepFailed },
            { ['broken']: stepBroken },
            { ['skipped']: stepSkipped },
            { ['unknown']: stepUnknown },
        ];

    }

    let scenarioStepData = testStep.map(stepName => {
        return generateStepNames(stepName);
    });

    scenarioStepName = scenarioStepData.map(scenario => {
        return scenario[0];
    })

    scenarioDuration = scenarioStepData.map(scenario => {
        console.log(scenario[1]);
        return ((Math.round(scenario[1].totalDuration * 100) / 100)/1000000000).toFixed(1);
    });

    scenarioStatus = scenarioStepData.map(scenario => {
        return scenario[2];
    });

    testStepsPassed = scenarioStepData.map(scenario => {
        return scenario[3];
    });

    testStepsFailed = scenarioStepData.map(scenario => {
        return scenario[4];
    });

    testStepsBroken = scenarioStepData.map(scenario => {
        return scenario[5];
    });

    testStepsSkipped = scenarioStepData.map(scenario => {
        return scenario[6];
    });

    testStepsUnknown = scenarioStepData.map(scenario => {
        return scenario[7];
    });
}

function extractAllScenarioData(scenarios) {
    browserName = scenarios.metadata.browser.name;
    browserVersion = scenarios.metadata.browser.version;
    environment = scenarios.metadata.device;
    scenarios.elements.map(function (scenario) {
        scenarioName.push(scenario.name);
        allScenarios.push(scenario);
    });
}

function sumSteps(steps, status) {
        let sum = steps.map(steps => {
            return steps[status].length;
        });
        return sum.reduce((a, b) => a + b, 0);
}

populateDataForScenarioSteps(allScenarios);

var tab = new Vue({
    el: '#tab',
    data: {
        label: 'Test Report',
    }
})

var app = new Vue({
    el: '#app',
    data: {
        title: 'Example Test Report',
        logo: 'https://drive.google.com/uc?export=view&id=1xiNpGqHnu7T1aWfpAiRFt-mNcU-2mcPx',
        scenarioName: scenarioName,
        scenarioDuration: scenarioDuration,
        scenarioStepName: scenarioStepName,
        scenarioStatus: scenarioStatus,
        browserName: browserName,
        browserVersion: browserVersion,
        environment: environment,
    },
    computed: {
        date() {
            return new Date().toUTCString();
        },
        passedSteps() {
            return sumSteps(testStepsPassed, 'passed');
        },
        failedSteps() {
            return sumSteps(testStepsFailed, 'failed');
        },
        brokenSteps() {
            return sumSteps(testStepsBroken, 'broken');
        },
        skippedSteps() {
            return sumSteps(testStepsSkipped, 'skipped');
        },
        unknownSteps() {
            return sumSteps(testStepsUnknown, 'unknown');
        },
        failedScenarios() {
            return scenarioStatus.filter(find => find.scenarioStatus === 'failed').length
        },
        passedScenarios() {
            return scenarioStatus.filter(find => find.scenarioStatus === 'passed').length
        }
    }
});