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
import { Algorithm, IsncsciExam, IsncsciTotals } from '../domain.js';
import { getBinaryObservationFor } from './calculateTotals.usecase.js';
import { IIsncsciExamModel } from './iIsncsciExamModel.js';
import { validMotorValueRegExp, validSensoryValueRegExp } from './regularExpressions.js';

/**
 * 'CalculatePartialTotalsUseCase' contains the business logic to
 * generate the totals for a partially valid exam.
 * Steps:
 * 1. The clinician provides the partial values required for a exam.
 * 2. the system get the partial exam.
 * 3. The system runs the exam through the algorithm.
 * 4. The system updates the application state with the generated totals.
 */

/**
 * 1. The clinician provides the values required for a full exam.
 * @param {IIsncsciAppStoreProvider} appStoreProvider Allows the system to update the application's state.
 */
export function calculatePartialTotals(examModel: IIsncsciExamModel, appStoreProvider: IIsncsciAppStoreProvider): void {
    // 2. the system get the partial exam.
    const isncsciExam: IsncsciExam = getIsncsciExamFrom(examModel);
    // 3. The system runs the exam through the algorithm.
    const isncsciPartialTotals: IsncsciTotals = Algorithm.getPartialTotalsFor(isncsciExam);
    // 4. The system updates the application state with the generated totals.
    appStoreProvider.setPartialTotals(isncsciPartialTotals);
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
 * Contrary from the calculateTotals.usecase it does not check that
 * the data provided is complete and that the values are valid.
 * This enables to calculate partial totals without validation.
 * @param {string} levelName
 * @param {IsncsciExam} isncsciExam
 * @param {IIsncsciExamModel} examData Raw data values to be associated to the IsncsciExam instance.
 */
function updateLevelByName(levelName: string, isncsciExam: IsncsciExam, examData: IIsncsciExamModel): void {
    let rightTouchValue: string = examData[`${levelName}RightTouch`];
    let leftTouchValue: string = examData[`${levelName}LeftTouch`];
    let rightPrickValue: string = examData[`${levelName}RightPrick`];
    let leftPrickValue: string = examData[`${levelName}LeftPrick`];
    let rightMotorValue: string = examData[`${levelName}RightMotor`];
    let leftMotorValue: string = examData[`${levelName}LeftMotor`];

    if (!validSensoryValueRegExp.test(rightTouchValue)) {
        rightTouchValue = '';
    }

    if (!validSensoryValueRegExp.test(leftTouchValue)) {
        leftTouchValue = '';
    }

    if (!validSensoryValueRegExp.test(rightPrickValue)) {
        rightPrickValue = '';
    }

    if (!validSensoryValueRegExp.test(leftPrickValue)) {
        leftPrickValue = '';
    }

    if (!validMotorValueRegExp.test(rightMotorValue)) {
        rightMotorValue = '';
    }

    if (!validMotorValueRegExp.test(leftMotorValue)) {
        leftMotorValue = '';
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
