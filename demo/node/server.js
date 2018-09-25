const ISNCSCI = require("rhi-core-isncsci-algorithm");
const tests = require('./isncsci-validation-tests.js').isncsciValidationTests;

let randomTest = {};

// define usecase behavior
const useCase = new ISNCSCI.CalculateTotalsUseCase({
  setTotals: (totals) => {
    displayTotals(totals);
    return Promise.resolve()
  }
});

// define how to display calculated totals information
const displayTotals = (totals) => {
  console.log(`
    id: ${randomTest.id}
    ASIA: ${totals.getAsiaImpairmentScaleValues()}

    LeftMotorTotal: ${totals.getLeftMotorTotal()}
    LeftPrickTotal: ${totals.getLeftPrickTotal()}
    LeftTouchTotal: ${totals.getLeftTouchTotal()}

    RightMotorTotal: ${totals.getRightMotorTotal()}
    RightPrickTotal: ${totals.getRightPrickTotal()}
    RightTouchTotal: ${totals.getRightTouchTotal()}
  `);
}

// load new test and execute the usecase
randomTest = tests[Math.floor((Math.random() * tests.length))];
useCase.execute(randomTest)