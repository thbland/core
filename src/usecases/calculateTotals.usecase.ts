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

import { IIsncsciAppStoreProvider } from '../boundaries.js';
import { Algorithm, BinaryObservation, IsncsciExam, IsncsciTotals } from '../domain.js';
import { IIsncsciExamModel } from './iIsncsciExamModel.js';
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
 * @param {IIsncsciAppStoreProvider} appStoreProvider Allows the system to update the application's state.
 */
export function calculateTotals(examModel: IIsncsciExamModel, appStoreProvider: IIsncsciAppStoreProvider): void {
    // 2. the system validates the exam.
    const isncsciExam: IsncsciExam = getIsncsciExamFrom(examModel);
    // 3. The system runs the exam through the algorithm.
    const isncsciTotals: IsncsciTotals = Algorithm.getTotalsFor(isncsciExam);
    // 4. The system updates the application state with the generated totals.
    appStoreProvider.setTotals(isncsciTotals);
}

/**
 * Creates and returns an instance of IsncsciExam using the data provided.
 * @param {IIsncsciExamModel} examData Raw data to be used when creating the IsncsciExam instance.
 * @returns {IsncsciExam} IsncsciExam instance initialized with the data passed as the examData parameter.
 */
function getIsncsciExamFrom(examData: IIsncsciExamModel): IsncsciExam {
    const isncsciExam: IsncsciExam = new IsncsciExam();
    const keyMap: Array<{ prefix: string, start: number, end: number }> = [
        { prefix: 'c', start: 2, end: 8},
        { prefix: 't', start: 1, end: 12},
        { prefix: 'l', start: 1, end: 5},
        { prefix: 's', start: 1, end: 3},
        { prefix: 's4_', start: 5, end: 5},
    ];

    isncsciExam.analContraction = getBinaryObservationFor(examData.analContraction);
    isncsciExam.analSensation = getBinaryObservationFor(examData.analSensation);

    if (examData.rightLowestNonKeyMuscleWithMotorFunction
        && examData.rightLowestNonKeyMuscleWithMotorFunction.length > 1) {
        isncsciExam.setRightLowestNonKeyMuscleWithMotorFunction(examData.rightLowestNonKeyMuscleWithMotorFunction);
    }

    if (examData.leftLowestNonKeyMuscleWithMotorFunction
        && examData.leftLowestNonKeyMuscleWithMotorFunction.length > 1) {
        isncsciExam.setLeftLowestNonKeyMuscleWithMotorFunction(examData.leftLowestNonKeyMuscleWithMotorFunction);
    }

    keyMap.forEach((key: { prefix: string, start: number, end: number }) => {
        for (let i: number = key.start; i <= key.end; i++) {
            updateLevelByName(
                `${key.prefix}${i}`,
                isncsciExam,
                examData,
            );
        }
    });

    return isncsciExam;
}

/**
 * Updates an IsncsciExam level using the data and level name provided.
 * More importantly, it makes sure that the data provided is complete and that the values are valid.
 * Throws an exception if it finds a missing field of a value is not valid.
 * @param {string} levelName
 * @param {IsncsciExam} isncsciExam
 * @param {IIsncsciExamModel} examData Raw data values to be associated to the IsncsciExam instance.
 */
function updateLevelByName(levelName: string, isncsciExam: IsncsciExam, examData: IIsncsciExamModel): void {
    const rightTouchValue: string = examData[`${levelName}RightTouch`];
    const leftTouchValue: string = examData[`${levelName}LeftTouch`];
    const rightPrickValue: string = examData[`${levelName}RightPrick`];
    const leftPrickValue: string = examData[`${levelName}LeftPrick`];
    const rightMotorValue: string = examData[`${levelName}RightMotor`];
    const leftMotorValue: string = examData[`${levelName}LeftMotor`];
    const isMotorLevel: boolean = motorLevelNameRegExp.test(levelName);

    if (!validSensoryValueRegExp.test(rightTouchValue)) {
        throw new Error(`invalid-sensory-value[${levelName}RightTouch]`);
    }

    if (!validSensoryValueRegExp.test(leftTouchValue)) {
        throw new Error(`invalid-sensory-value[${levelName}LeftTouch]`);
    }

    if (!validSensoryValueRegExp.test(rightPrickValue)) {
        throw new Error(`invalid-sensory-value[${levelName}RightPrick]`);
    }

    if (!validSensoryValueRegExp.test(leftPrickValue)) {
        throw new Error(`invalid-sensory-value[${levelName}LeftPrick]`);
    }

    if (isMotorLevel && !validMotorValueRegExp.test(rightMotorValue)) {
        throw new Error(`invalid-motor-value[${levelName}RightMotor]`);
    }

    if (isMotorLevel && !validMotorValueRegExp.test(leftMotorValue)) {
        throw new Error(`invalid-motor-value[${levelName}LeftMotor]`);
    }

    isncsciExam.updateLevelByName(
        levelName,
        rightTouchValue,
        leftTouchValue,
        rightPrickValue,
        leftPrickValue,
        rightMotorValue,
        leftMotorValue,
    );
}

/**
 * Returns a BinaryObservation option that matches the specified string value;
 * @param {string} value The string value to be matched to a BinaryObservation option.
 * @returns {BinaryObservation} BinaryObservation value that matches the string specified.
 */
function getBinaryObservationFor(value: string): BinaryObservation {
    const valueToLower = value ? value.toLowerCase() : 'none';
    switch (valueToLower) {
        case 'yes':
            return BinaryObservation.yes;
        case 'no':
            return BinaryObservation.no;
        case 'nt':
            return BinaryObservation.nt;
        default:
            return BinaryObservation.none;
    }
}
