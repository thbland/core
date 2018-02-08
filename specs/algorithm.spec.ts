/*
@license
Copyright (c) 2015 Rick Hansen Institute. All rights reserved.
This code may only be used under the modified Apache license found at https://raw.githubusercontent.com/EddieMachete/rhi-core-isncsci-algorithm/master/LICENSE
Author: RhiTech <tech@rickhanseninstitute.org>
*/

///<reference path="../node_modules/@types/jasmine/index.d.ts"/>

'use strict';

import { Algorithm, BinaryObservation, IsncsciExam, IsncsciTotals } from '../';
import { iDermatomeModel, iDermatomesModel, iDermatomeWithMotorModel, iTotalsModel, iValidationTestModel, rhiIsncsciValidationTests } from './isncsciTests';

describe('Isncsci Algorithm ::', () => {
    it('can calculate the totals for test at [52]', () => {
        // Arrange
        const test:iValidationTestModel = rhiIsncsciValidationTests[52];
        const expectedTotals:iTotalsModel = test.totals;
        const isncsciExam:IsncsciExam = new IsncsciExam();
        _bind(isncsciExam, test);
        
        // Act
        const totals:IsncsciTotals = Algorithm.getTotalsFor(isncsciExam);
        
        // Assert
        _compare(expectedTotals, totals);
    });

    it('can calculate the totals for the entire test suite', () => {
        // Arrange
        const testsLength:number = rhiIsncsciValidationTests.length;

        // Act - Assert
        for (let i:number=0; i<testsLength; i++) {
            const test:iValidationTestModel = rhiIsncsciValidationTests[i];
            const isncsciExam:IsncsciExam = new IsncsciExam();
            _bind(isncsciExam, test);
            const totals:IsncsciTotals = Algorithm.getTotalsFor(isncsciExam);
        
            console.log(i + '. ' + test.group + ' / ' + test.comments);
            _compare(test.totals, totals);
        }
    });
        
    function _compare(expectedTotals:iTotalsModel, totals:IsncsciTotals) {
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
        
    function _bind(isncsciExam:IsncsciExam, test:iValidationTestModel) {
        const keys:string[] = ['C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8',
                    'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12',
                    'L1', 'L2', 'L3', 'L4', 'L5', 'S1', 'S2', 'S3', 'S4_5'];
        const dermatomes:iDermatomesModel = test.dermatomes;
        isncsciExam.analContraction = _getBinaryObservationFor(test.analContraction);
        isncsciExam.analSensation = _getBinaryObservationFor(test.analSensation);
        
        if (test.rightLowestNonKeyMuscleWithMotorFunction
                && test.rightLowestNonKeyMuscleWithMotorFunction.length > 1)
            isncsciExam.setRightLowestNonKeyMuscleWithMotorFunction(test.rightLowestNonKeyMuscleWithMotorFunction);
        
        if (test.leftLowestNonKeyMuscleWithMotorFunction
                && test.leftLowestNonKeyMuscleWithMotorFunction.length > 1)
            isncsciExam.setLeftLowestNonKeyMuscleWithMotorFunction(test.leftLowestNonKeyMuscleWithMotorFunction);
        
        for (var i:number=0; i<keys.length; i++) {
            const key:string = keys[i];
            const dermatome = dermatomes[key];
            isncsciExam.updateLevelByName(key, dermatome.rightTouch, dermatome.leftTouch, dermatome.rightPrick, dermatome.leftPrick, dermatome.rightMotor, dermatome.leftMotor);
        }
    }
    
    function _getBinaryObservationFor(value) {
        var valueToLower = value ? value.toLowerCase() : 'none';
            
        if (valueToLower === 'yes')
            return BinaryObservation.yes;
            
        if (valueToLower === 'no')
            return BinaryObservation.no;
            
        if (valueToLower === 'nt')
            return BinaryObservation.nt;
        
        return BinaryObservation.none;
    }
});