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
import { calculatePartialTotals } from '../../src/usecases/calculatePartialTotals.usecase';
import { IIsncsciExamModel } from '../../src/usecases/iIsncsciExamModel';
import { isncsciValidationTests } from '../domain/isncsci-validation-tests';

describe('Calculate partial totals usecase', () => {
    // beforeAll((done) => { });
    // beforeEach((done) => { done(); });

    it('updates the application state with the partial totals generated from a partially valid exam', (done) => {
        // Arrange
        let isncsciTotals: IsncsciTotals;
        const isncsciExamModel: IIsncsciExamModel = Object.assign({}, isncsciValidationTests[0]);

        // erase all right motor, prick, touch values
        for (const key of Object.keys(isncsciExamModel)) {
            if (key.includes('Right')) {
                isncsciExamModel[key] = '';
            }
        }

        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('IIsncsciAppStoreProvider', ['setPartialTotals']);

        appStoreProvider.setPartialTotals.and.callFake(
            (totals: IsncsciTotals) => {
                isncsciTotals = totals;
                runAsserts();

                return Promise.resolve();
        });
        //#endregion

        // Act
        calculatePartialTotals(isncsciExamModel, appStoreProvider);

        // Assert
        function runAsserts() {
            _compare(isncsciExamModel.totals, isncsciTotals);
            done();
        }
    });

    it('do not throws an exception when l3RightMotor is missing from the data model', (done) => {
        // Arrange
        const isncsciExamModel: IIsncsciExamModel = Object.assign({}, isncsciValidationTests[0]);
        const appStoreProvider = jasmine.createSpyObj('IIsncsciAppStoreProvider', ['setTotals']);

        // Act
        delete isncsciExamModel.l3RightMotor;

        expect(() => calculatePartialTotals(isncsciExamModel, appStoreProvider))
        .not.toThrow(new Error('invalid-motor-value[l3RightMotor]'));
        done();
    });

    function _compare(expectedTotals: any, totals: IsncsciTotals) {
        expect(totals.getLeftLowerMotorTotal()).toBe(expectedTotals.leftLowerMotorTotal);
        expect(totals.getLeftMotorTotal()).toBe(expectedTotals.leftMotorTotal);
        expect(totals.getLeftPrickTotal()).toBe(expectedTotals.leftPrickTotal);
        expect(totals.getLeftTouchTotal()).toBe(expectedTotals.leftTouchTotal);
        expect(totals.getLeftUpperMotorTotal()).toBe(expectedTotals.leftUpperMotorTotal);

        expect(totals.getRightLowerMotorTotal()).toBe('0');
        expect(totals.getRightMotorTotal()).toBe('0');
        expect(totals.getRightPrickTotal()).toBe('0');
        expect(totals.getRightTouchTotal()).toBe('0');
        expect(totals.getRightUpperMotorTotal()).toBe('0');

        expect(totals.getPrickTotal()).toBe(expectedTotals.leftPrickTotal);
        expect(totals.getTouchTotal()).toBe(expectedTotals.leftTouchTotal);
        expect(totals.getLowerMotorTotal()).toBe(expectedTotals.leftLowerMotorTotal);
        expect(totals.getUpperMotorTotal()).toBe(expectedTotals.leftUpperMotorTotal);

        // expect(totals.leftLowerMotorContainsNt).toBeUndefined();
        // expect(totals.leftPrickContainsNt).toBeUndefined();
        // expect(totals.leftTouchContainsNt).toBeUndefined();
        // expect(totals.leftUpperMotorContainsNt).toBeUndefined();
        // expect(totals.rightLowerMotorContainsNt).toBeUndefined();
        // expect(totals.rightPrickContainsNt).toBeUndefined();
        // expect(totals.rightTouchContainsNt).toBeUndefined();
        // expect(totals.rightUpperMotorContainsNt).toBeUndefined();

        // expect(totals.getAsiaImpairmentScaleValues).toBeUndefined();
        // expect(totals.getLeftMotorLongValueString).toBeUndefined();
        // expect(totals.getLeftMotorZppLongValueString).toBeUndefined();
        // expect(totals.getLeftSensoryLongValueString).toBeUndefined();
        // expect(totals.getLeftSensoryZppLongValueString).toBeUndefined();
        // expect(totals.getNeurologicalLevelsOfInjuryLongValueString).toBeUndefined();
        // expect(totals.getRightMotorLongValueString).toBeUndefined();
        // expect(totals.getRightMotorZppLongValueString).toBeUndefined();
        // expect(totals.getRightSensoryLongValueString).toBeUndefined();
        // expect(totals.getRightSensoryZppLongValueString).toBeUndefined();
    }
});
