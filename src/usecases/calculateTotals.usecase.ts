/*
@license
Copyright (c) 2015 Rick Hansen Institute. All rights reserved.
This code may only be used under the modified Apache license found at https://raw.githubusercontent.com/rick-hansen-institute/rhi-core-isncsci-algorithm/master/LICENSE
Author: RhiTech <tech@rickhanseninstitute.org>
*/
'use strict';

import { iIsncsciAppStoreProvider } from '../boundaries.js';
import { Algorithm, BinaryObservation, IsncsciExam, IsncsciTotals } from '../domain.js';
import { iIsncsciExamModel } from './iIsncsciExamModel.js';
import { motorLevelNameRegExp, validMotorValueRegExp, validSensoryValueRegExp } from './regularExpressions.js';

/**
* 'CalculateTotalsUseCase' contains the business logic to
* generate the totals for a valid exam.
* Steps:
* 1. The clinician provides the values required for a full exam.
* 2. the system validates the exam.
* 3. The system runs the exam through the algorithm.
* 4. The system updates the application state with the generated totals.
*/

/**
 * 1. The clinician provides the values required for a full exam.
 * @param {iIsncsciAppStoreProvider} appStoreProvider Allow's the system to update the application's state.
 */
export function calculateTotals(examModel: iIsncsciExamModel, appStoreProvider: iIsncsciAppStoreProvider): void {
    // 2. the system validates the exam.
    const isncsciExam: IsncsciExam = getIsncsciExamFrom(examModel);
    // 3. The system runs the exam through the algorithm.
    const isncsciTotals: IsncsciTotals = Algorithm.getTotalsFor(isncsciExam);
    // 4. The system updates the application state with the generated totals.
    appStoreProvider.setTotals(isncsciTotals);
}

/**
 * Creates and returns an instance of IsncsciExam using the data provided.
 * @param {iIsncsciExamModel} examData Raw data to be used when creating the IsncsciExam instance.
 * @returns {IsncsciExam} IsncsciExam instance initialized with the data passed as the examData parameter.
 */
function getIsncsciExamFrom(examData: iIsncsciExamModel): IsncsciExam {
    const isncsciExam: IsncsciExam = new IsncsciExam();
    const keyMap: { prefix: string, start: number, end: number }[] = [
        { prefix: 'c', start: 2, end: 8},
        { prefix: 't', start: 1, end: 12},
        { prefix: 'l', start: 1, end: 5},
        { prefix: 's', start: 1, end: 3},
        { prefix: 's4_', start: 5, end: 5}
    ];
    
    isncsciExam.analContraction = getBinaryObservationFor(examData.analContraction);
    isncsciExam.analSensation = getBinaryObservationFor(examData.analSensation);
    
    if (examData.rightLowestNonKeyMuscleWithMotorFunction
            && examData.rightLowestNonKeyMuscleWithMotorFunction.length > 1)
        isncsciExam.setRightLowestNonKeyMuscleWithMotorFunction(examData.rightLowestNonKeyMuscleWithMotorFunction);
    
    if (examData.leftLowestNonKeyMuscleWithMotorFunction
            && examData.leftLowestNonKeyMuscleWithMotorFunction.length > 1)
        isncsciExam.setLeftLowestNonKeyMuscleWithMotorFunction(examData.leftLowestNonKeyMuscleWithMotorFunction);

    keyMap.forEach(
        (key: { prefix: string, start: number, end: number }) => {
            for (let i:number = key.start; i<=key.end; i++) {
                updateLevelByName(
                    `${key.prefix}${i}`,
                    isncsciExam,
                    examData
                );
            }
        }
    );

    return isncsciExam;
}

/**
 * Updates an IsncsciExam level using the data and level name provided.
 * More importantly, it makes sure that the data provided is complete and that the values are valid.
 * Throws an exception if it finds a missing field of a value is not valid.
 * @param {string} levelName
 * @param {IsncsciExam} isncsciExam 
 * @param {iIsncsciExamModel} examData Raw data values to be associated to the IsncsciExam instance. 
 */
function updateLevelByName(levelName: string, isncsciExam: IsncsciExam, examData: iIsncsciExamModel): void {
    const rightTouchValue: string = examData[`${levelName}RightTouch`];
    const leftTouchValue: string = examData[`${levelName}LeftTouch`];
    const rightPrickValue: string = examData[`${levelName}RightPrick`];
    const leftPrickValue: string = examData[`${levelName}LeftPrick`];
    const rightMotorValue: string = examData[`${levelName}RightMotor`];
    const leftMotorValue: string = examData[`${levelName}LeftMotor`];
    const isMotorLevel: boolean = motorLevelNameRegExp.test(levelName);

    if (!validSensoryValueRegExp.test(rightTouchValue)) {
        throw `invalid-sensory-value[${levelName}RightTouch]`;
    }

    if (!validSensoryValueRegExp.test(leftTouchValue)) {
        throw `invalid-sensory-value[${levelName}LeftTouch]`;
    }

    if (!validSensoryValueRegExp.test(rightPrickValue)) {
        throw `invalid-sensory-value[${levelName}RightPrick]`;
    }

    if (!validSensoryValueRegExp.test(leftPrickValue)) {
        throw `invalid-sensory-value[${levelName}LeftPrick]`;
    }

    if (isMotorLevel && !validMotorValueRegExp.test(rightMotorValue)) {
        throw `invalid-motor-value[${levelName}RightMotor]`;
    }

    if (isMotorLevel && !validMotorValueRegExp.test(leftMotorValue)) {
        throw `invalid-motor-value[${levelName}LeftMotor]`;
    }

    isncsciExam.updateLevelByName(
        levelName,
        rightTouchValue,
        leftTouchValue,
        rightPrickValue,
        leftPrickValue,
        rightMotorValue,
        leftMotorValue
    );
}
    
/**
 * Returns a BinaryObservation option that matches the specified string value;
 * @param {string} value The string value to be matched to a BinaryObservation option. 
 * @returns {BinaryObservation} BinaryObservation value that matches the string specified.
 */
function getBinaryObservationFor(value: string): BinaryObservation {
    var valueToLower = value ? value.toLowerCase() : 'none';
        
    if (valueToLower === 'yes')
        return BinaryObservation.yes;
        
    if (valueToLower === 'no')
        return BinaryObservation.no;
        
    if (valueToLower === 'nt')
        return BinaryObservation.nt;
    
    return BinaryObservation.none;
}
