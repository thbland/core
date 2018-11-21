/**
 * @license
 * Copyright (c) 2015 Rick Hansen Institute. All rights reserved.
 *
 * This code may only be used under the modified Apache license found at
 * https://raw.githubusercontent.com/rick-hansen-institute/rhi-core-isncsci-algorithm/master/LICENSE
 *
 * Author: RhiTech <tech@rickhanseninstitute.org>
 */
'use strict';

import { IsncsciTotals } from '../../src/domain';
import { calculateTotals } from '../../src/usecases/calculateTotals.usecase';
import { IIsncsciExamModel } from '../../src/usecases/iIsncsciExamModel';
import { isncsciValidationTests } from '../domain/isncsci-validation-tests';

describe('Calculate totals usecase', () => {
    // beforeAll((done) => { });
    // beforeEach((done) => { done(); });

    it('updates the application state with the totals generated from a valid exam', (done) => {
        // Arrange
        let isncsciTotals: IsncsciTotals;
        const isncsciExamModel: IIsncsciExamModel = Object.assign({}, isncsciValidationTests[0]);

        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('IIsncsciAppStoreProvider', ['setTotals']);

        appStoreProvider.setTotals.and.callFake(
            (totals: IsncsciTotals) => {
                isncsciTotals = totals;
                runAsserts();

                return Promise.resolve();
        });
        //#endregion

        // Act
        calculateTotals(isncsciExamModel, appStoreProvider);

        // Assert
        function runAsserts() {
            _compare(isncsciExamModel.totals, isncsciTotals);
            done();
        }
    });

    it('throws an exception when l3RightMotor is missing from the data model', (done) => {
        // Arrange
        const isncsciExamModel: IIsncsciExamModel = Object.assign({}, isncsciValidationTests[0]);
        const appStoreProvider = jasmine.createSpyObj('IIsncsciAppStoreProvider', ['setTotals']);

        // Act
        delete isncsciExamModel.l3RightMotor;

        expect(() => calculateTotals(isncsciExamModel, appStoreProvider))
        .toThrow(new Error('invalid-motor-value[l3RightMotor]'));
        done();
    });

    function _compare(expectedTotals: any, totals: IsncsciTotals) {
        expect(expectedTotals.asiaImpairmentScale).toBe(totals.getAsiaImpairmentScaleValues());

        expect(expectedTotals.leftLowerMotorContainsNt).toBe(totals.leftLowerMotorContainsNt);
        expect(expectedTotals.leftLowerMotorTotal).toBe(totals.getLeftLowerMotorTotal());
        expect(expectedTotals.leftMotor).toBe(totals.getLeftMotorLongValueString());
        expect(expectedTotals.leftMotorTotal).toBe(totals.getLeftMotorTotal());
        expect(expectedTotals.leftMotorZpp).toBe(totals.getLeftMotorZppLongValueString());
        expect(expectedTotals.leftPrickContainsNt).toBe(totals.leftPrickContainsNt);
        expect(expectedTotals.leftPrickTotal).toBe(totals.getLeftPrickTotal());
        expect(expectedTotals.leftSensory).toBe(totals.getLeftSensoryLongValueString());
        expect(expectedTotals.leftSensoryZpp).toBe(totals.getLeftSensoryZppLongValueString());
        expect(expectedTotals.leftTouchContainsNt).toBe(totals.leftTouchContainsNt);
        expect(expectedTotals.leftTouchTotal).toBe(totals.getLeftTouchTotal());
        expect(expectedTotals.leftUpperMotorContainsNt).toBe(totals.leftUpperMotorContainsNt);
        expect(expectedTotals.leftUpperMotorTotal).toBe(totals.getLeftUpperMotorTotal());

        expect(expectedTotals.lowerMotorTotal).toBe(totals.getLowerMotorTotal());
        expect(expectedTotals.neurologicalLevelOfInjury).toBe(totals.getNeurologicalLevelsOfInjuryLongValueString());
        expect(expectedTotals.prickTotal).toBe(totals.getPrickTotal());

        expect(expectedTotals.rightLowerMotorContainsNt).toBe(totals.rightLowerMotorContainsNt);
        expect(expectedTotals.rightLowerMotorTotal).toBe(totals.getRightLowerMotorTotal());
        expect(expectedTotals.rightMotor).toBe(totals.getRightMotorLongValueString());
        expect(expectedTotals.rightMotorTotal).toBe(totals.getRightMotorTotal());
        expect(expectedTotals.rightMotorZpp).toBe(totals.getRightMotorZppLongValueString());
        expect(expectedTotals.rightPrickContainsNt).toBe(totals.rightPrickContainsNt);
        expect(expectedTotals.rightPrickTotal).toBe(totals.getRightPrickTotal());
        expect(expectedTotals.rightSensory).toBe(totals.getRightSensoryLongValueString());
        expect(expectedTotals.rightSensoryZpp).toBe(totals.getRightSensoryZppLongValueString());
        expect(expectedTotals.rightTouchContainsNt).toBe(totals.rightTouchContainsNt);
        expect(expectedTotals.rightTouchTotal).toBe(totals.getRightTouchTotal());
        expect(expectedTotals.rightUpperMotorContainsNt).toBe(totals.rightUpperMotorContainsNt);
        expect(expectedTotals.rightUpperMotorTotal).toBe(totals.getRightUpperMotorTotal());

        expect(expectedTotals.touchTotal).toBe(totals.getTouchTotal());
        expect(expectedTotals.upperMotorTotal).toBe(totals.getUpperMotorTotal());
    }
});
