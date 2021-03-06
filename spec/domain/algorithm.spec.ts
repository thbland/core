/*
@license
Copyright (c) 2015 Rick Hansen Institute. All rights reserved.
This code may only be used under the modified Apache license found at https://raw.githubusercontent.com/rick-hansen-institute/rhi-core-isncsci-algorithm/master/LICENSE
Author: RhiTech <tech@rickhanseninstitute.org>
*/
///<reference path="../../node_modules/@types/jasmine/index.d.ts"/>

'use strict';

import { iIsncsciAppStoreProvider } from '../../src/boundaries';
import { IsncsciTotals } from '../../src/domain';
import { CalculateTotalsUseCase, iIsncsciExamModel } from '../../src/usecases';
import { isncsciValidationTests, iTotalsModel } from './isncsci-validation-tests';

describe('Isncsci Algorithm ::', () => {
    it('can calculate the totals for test at [52]', () => {
        // Arrange
        const examData: iIsncsciExamModel = isncsciValidationTests[52];
        const expectedTotals: iTotalsModel = examData['totals'];
        let isncsciTotals: IsncsciTotals;
        
        const appStoreProvider = jasmine.createSpyObj('iIsncsciAppStoreProvider', ['setTotals']);
        
        appStoreProvider.setTotals.and.callFake(
            (totals: IsncsciTotals) => {
                isncsciTotals = totals;
                runAsserts();
                
                return Promise.resolve();
            }
        );

        // Act
        new CalculateTotalsUseCase(<iIsncsciAppStoreProvider>appStoreProvider).execute(examData);
        
        // Assert
        function runAsserts() {
            _compare(expectedTotals, isncsciTotals);
        }
    });

    it('can calculate the totals for the entire test suite', () => {
        // Arrange
        const testsLength: number = isncsciValidationTests.length;

        // Act - Assert
        for (let i: number=0; i<testsLength; i++) {
            const testData: iIsncsciExamModel = isncsciValidationTests[i];
            const appStoreProvider = jasmine.createSpyObj('iIsncsciAppStoreProvider', ['setTotals']);
        
            appStoreProvider.setTotals.and.callFake(
                (totals: IsncsciTotals) => {
                    _compare(testData['totals'], totals);
                    return Promise.resolve();
                }
            );

            // console.log(i + '. ' + testData['group'] + ' / ' + testData.comments);
            new CalculateTotalsUseCase(appStoreProvider).execute(testData);
        }
    });
        
    function _compare(expectedTotals: iTotalsModel, totals: IsncsciTotals) {
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