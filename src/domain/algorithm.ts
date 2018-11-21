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

import { BinaryObservation } from './binaryObservation.js';
import { IsncsciExam } from './isncsciExam.js';
import { IsncsciTotals  } from './isncsciTotals.js';
import { NeuroLevel } from './neuroLevel.js';

/**
 * 'rhi-core-isncsci-domain.Algorithm' contains the raw values from a ISNCSCI Examination.
 * Instances of this class can be passed to the Algorithm methods to obtain totals.
 * @demo demo/index.html
 */
export class Algorithm {
    /***********************************************/
    /* ***** Private, static properties ********** */
    /***********************************************/
    public static get is(): string { return 'rhi-core-isncsci-domain.Algorithm'; }
    public static ntRegex: RegExp = /\bNT\b/i;
    public static notDeterminable: string = 'UTD';
    public static notApplicable: string = 'NA';
    public static intact: string = 'INT';

    /**
     * Returns the results produced by the ISNCSCI Algorithm in a raw values format.
     *
     * @param {IsncsciExam} isncsciExam Neurology form that has been populated with
     *                                  the values to be used in the algorithm calculations.
     * @returns {IsncsciTotals} Totals in raw values format.
     * The results contain lists with every possible value for each field.
     * You can use the resulting object to obtained a summarized version, which uses ranges,
     * by passing the result to the method GetTotalsSummaryFor
     */
    public static getTotalsFor(isncsciExam: IsncsciExam): IsncsciTotals {
        if (!isncsciExam) {
            throw new Error(`${Algorithm.is} : getTotalsFor :
                            Missing the expected argument isncsciExam:IsncsciExam`);
        }

        const totals: IsncsciTotals = new IsncsciTotals();
        const c2: NeuroLevel = isncsciExam.getLevelWithName('C2');

        Algorithm.updateTotalsWithLevelAt(isncsciExam, totals, c2, false, false);

        const s4_5: NeuroLevel = isncsciExam.getLevelWithName('S4_5');
        const c1: NeuroLevel | null = c2.previous;

        if (totals.rightSensoryZppHasOnlySoftValues) {
            totals.addRightSensoryZppValue(c1!);
        }

        if (totals.leftSensoryZppHasOnlySoftValues) {
            totals.addLeftSensoryZppValue(c1!);
        }

        if (totals.rightMotorZppHasOnlySoftValues) {
            totals.addRightMotorZppValue(c1!);
        }

        if (totals.leftMotorZppHasOnlySoftValues) {
            totals.addLeftMotorZppValue(c1!);
        }

        if (totals.mostRostralRightLevelWithMotorFunction == null) {
            totals.mostRostralRightLevelWithMotorFunction = c1;
        }

        if (totals.mostRostralLeftLevelWithMotorFunction == null) {
            totals.mostRostralLeftLevelWithMotorFunction = c1;
        }

        if (totals.mostCaudalRightLevelWithMotorFunction == null) {
            totals.mostCaudalRightLevelWithMotorFunction = c1;
        }

        if (totals.mostCaudalLeftLevelWithMotorFunction == null) {
            totals.mostCaudalLeftLevelWithMotorFunction = c1;
        }

        // [ASIA learning center 2012-11-14] Sensory incomplete: Sacral sparing of sensory function
        const isSensoryIncomplete = isncsciExam.analSensation === BinaryObservation.yes
                || isncsciExam.analSensation === BinaryObservation.nt
                || '0' !== s4_5.rightTouch || '0' !== s4_5.leftTouch
                || '0' !== s4_5.rightPrick || '0' !== s4_5.leftPrick;

        const couldNotHaveMotorFunctionMoreThan3LevelsBelowMotorLevel =
            Algorithm.couldNotHaveMotorFunctionMoreThan3LevelsBelowMotorLevel(isncsciExam, totals);

        const couldNotBeMotorIncomplete = (isncsciExam.analContraction === BinaryObservation.no
                || isncsciExam.analContraction === BinaryObservation.nt)
                && isSensoryIncomplete && couldNotHaveMotorFunctionMoreThan3LevelsBelowMotorLevel;

        if ((isncsciExam.analContraction === BinaryObservation.no
                || isncsciExam.analContraction === BinaryObservation.nt)
                && (isncsciExam.analSensation === BinaryObservation.no
                    || isncsciExam.analSensation === BinaryObservation.nt)
                && s4_5.rightTouchValue === 0 && !s4_5.rightTouchImpairmentNotDueToSci
                && s4_5.rightPrickValue === 0 && !s4_5.rightPrickImpairmentNotDueToSci
                && s4_5.leftTouchValue === 0 && !s4_5.leftTouchImpairmentNotDueToSci
                && s4_5.leftPrickValue === 0 && !s4_5.leftPrickImpairmentNotDueToSci) {
            totals.addAsiaImpairmentScaleValue('A');
        }

        if (couldNotBeMotorIncomplete && totals.mostRostralNeurologicalLevelOfInjury!.name !== 'S4_5') {
            totals.addAsiaImpairmentScaleValue('B');
        }

        // Not an ASIA E only
        // AND not an ASIA A only
        if (totals.mostRostralNeurologicalLevelOfInjury!.name !== 'S4_5'
                && (isSensoryIncomplete || isncsciExam.analContraction === BinaryObservation.yes
                    || isncsciExam.analContraction === BinaryObservation.nt)) {
            const cdCheck: {couldBeAsiaC: boolean, couldBeAsiaD: boolean} =
                Algorithm.couldBeAsiaCorD(isncsciExam, totals);

            if (cdCheck.couldBeAsiaC) {
                totals.addAsiaImpairmentScaleValue('C');
            }

            if (cdCheck.couldBeAsiaD) {
                totals.addAsiaImpairmentScaleValue('D');
            }
        }

        if (totals.rightSensoryContains('S4_5') && totals.leftSensoryContains('S4_5')
                && totals.rightMotorContains('S4_5') && totals.leftMotorContains('S4_5')) {
            totals.addAsiaImpairmentScaleValue('E');
        }

        return totals;
    }

    /**
     * Recursive method which iterates through the values in a neurology form
     * while it updates the totals generating the results produced by the algorithm.
     *
     * @param {IsncsciExam} isncsciExam An ISNCSCI exam with all the values required to perform the calculations.
     * @param {IsncsciTotals} totals A totals object where the results of the calculations will be recorded.
     * @param {NeuroLevel} level The current neurological level to be evaluated.
     * @param {boolean} nextNonKeyMuscleShouldBeRightMotor Flag used to evaluate the Kathy Collins condition
     *                                                     on the right motor results.
     * @param {boolean} nextNonKeyMuscleShouldBeLeftMotor Flag used to evaluate the Kathy Collins condition
     *                                                    on the left motor results.
     */
    private static updateTotalsWithLevelAt(
        isncsciExam: IsncsciExam, totals: IsncsciTotals, level: NeuroLevel,
        nextNonKeyMuscleShouldBeRightMotor: boolean, nextNonKeyMuscleShouldBeLeftMotor: boolean): void {
        totals.rightTouchTotal += level.rightTouchValue;
        totals.leftTouchTotal += level.leftTouchValue;
        totals.rightPrickTotal += level.rightPrickValue;
        totals.leftPrickTotal += level.leftPrickValue;

        if (level.isKeyMuscle) {
            if (level.isLowerMuscle) {
                if (level.rightMotorImpairmentNotDueToSci && !totals.rightLowerMotorTotalHasImpairmentNotDueToSci) {
                    totals.rightLowerMotorTotalHasImpairmentNotDueToSci = true;
                }

                if (level.leftMotorImpairmentNotDueToSci && !totals.leftLowerMotorTotalHasImpairmentNotDueToSci) {
                    totals.leftLowerMotorTotalHasImpairmentNotDueToSci = true;
                }

                if (Algorithm.ntRegex.test(level.rightMotor) && !level.rightMotorImpairmentNotDueToSci) {
                    totals.rightLowerMotorContainsNt = true;
                }

                if (Algorithm.ntRegex.test(level.leftMotor) && !level.leftMotorImpairmentNotDueToSci) {
                    totals.leftLowerMotorContainsNt = true;
                }
            } else {
                if (level.rightMotorImpairmentNotDueToSci && !totals.rightUpperMotorTotalHasImpairmentNotDueToSci) {
                    totals.rightUpperMotorTotalHasImpairmentNotDueToSci = true;
                }

                if (level.leftMotorImpairmentNotDueToSci && !totals.leftUpperMotorTotalHasImpairmentNotDueToSci) {
                    totals.leftUpperMotorTotalHasImpairmentNotDueToSci = true;
                }

                if (Algorithm.ntRegex.test(level.rightMotor) && !level.rightMotorImpairmentNotDueToSci) {
                    totals.rightUpperMotorContainsNt = true;
                }

                if (Algorithm.ntRegex.test(level.leftMotor) && !level.leftMotorImpairmentNotDueToSci) {
                    totals.leftUpperMotorContainsNt = true;
                }
            }
        } else {
            if (nextNonKeyMuscleShouldBeRightMotor) {
                nextNonKeyMuscleShouldBeRightMotor = false;
                totals.addRightMotorValue(level.previous!);

                if (!totals.rightSensoryHasOnlySoftValues) {
                    totals.rightMotorHasOnlySoftValues = false;
                }
            }

            if (nextNonKeyMuscleShouldBeLeftMotor) {
                nextNonKeyMuscleShouldBeLeftMotor = false;
                totals.addLeftMotorValue(level.previous!);

                if (!totals.leftSensoryHasOnlySoftValues) {
                    totals.leftMotorHasOnlySoftValues = false;
                }
            }
        }

        if (level.rightTouchImpairmentNotDueToSci && !totals.rightTouchTotalHasImpairmentNotDueToSci) {
            totals.rightTouchTotalHasImpairmentNotDueToSci = true;
        }

        if (level.leftTouchImpairmentNotDueToSci && !totals.leftTouchTotalHasImpairmentNotDueToSci) {
            totals.leftTouchTotalHasImpairmentNotDueToSci = true;
        }

        if (level.rightPrickImpairmentNotDueToSci && !totals.rightPrickTotalHasImpairmentNotDueToSci) {
            totals.rightPrickTotalHasImpairmentNotDueToSci = true;
        }

        if (level.leftPrickImpairmentNotDueToSci && !totals.leftPrickTotalHasImpairmentNotDueToSci) {
            totals.leftPrickTotalHasImpairmentNotDueToSci = true;
        }

        // Check if a column contains any NT value so we can properly format the total presented to the user
        if (Algorithm.ntRegex.test(level.rightTouch)
                && !level.rightTouchImpairmentNotDueToSci && !totals.rightTouchContainsNt) {
            totals.rightTouchContainsNt = true;
        }

        if (Algorithm.ntRegex.test(level.leftTouch)
                && !level.leftTouchImpairmentNotDueToSci && !totals.leftTouchContainsNt) {
            totals.leftTouchContainsNt = true;
        }

        if (Algorithm.ntRegex.test(level.rightPrick)
                && !level.rightPrickImpairmentNotDueToSci && !totals.rightPrickContainsNt) {
            totals.rightPrickContainsNt = true;
        }

        if (Algorithm.ntRegex.test(level.leftPrick)
                && !level.leftPrickImpairmentNotDueToSci && !totals.leftPrickContainsNt) {
            totals.leftPrickContainsNt = true;
        }

        if (totals.rightSensoryHasOnlySoftValues &&
                ((level.rightTouchValue !== 2 && !level.rightTouchImpairmentNotDueToSci) ||
                (level.rightPrickValue !== 2 && !level.rightPrickImpairmentNotDueToSci))) {
            totals.addRightSensoryValue(level.previous!);

            if ('S4_5' === level.name
                    && (level.rightTouchValue === 2 || Algorithm.ntRegex.test(level.rightTouch))
                    && (level.rightPrickValue === 2 || Algorithm.ntRegex.test(level.rightPrick))) {
                totals.addRightSensoryValue(level);

                if (totals.neurologicalLevelOfInjuryHasOnlySoftValues) {
                    totals.addNeurologicalLevelOfInjury(level);
                }
            }

            if (totals.neurologicalLevelOfInjuryHasOnlySoftValues) {
                totals.addNeurologicalLevelOfInjury(level.previous!);
            }

            if ((level.rightTouchValue !== 2 && !Algorithm.ntRegex.test(level.rightTouch))
                        || (level.rightPrickValue !== 2 && !Algorithm.ntRegex.test(level.rightPrick))) {
                        totals.rightSensoryHasOnlySoftValues = false;
                        totals.neurologicalLevelOfInjuryHasOnlySoftValues = false;
            }

            if (level.isKeyMuscle) {
                nextNonKeyMuscleShouldBeRightMotor = true;
                totals.hasRightCollins = true;
            }
        }

        if (totals.leftSensoryHasOnlySoftValues &&
                ((level.leftTouchValue !== 2 && !level.leftTouchImpairmentNotDueToSci) ||
                (level.leftPrickValue !== 2 && !level.leftPrickImpairmentNotDueToSci))) {
            totals.addLeftSensoryValue(level.previous!);

            if ('S4_5' === (level.name)
                    && (level.leftTouchValue === 2 || Algorithm.ntRegex.test(level.leftTouch))
                    && (level.leftPrickValue === 2 || Algorithm.ntRegex.test(level.leftPrick))) {
                totals.addLeftSensoryValue(level);

                if (totals.neurologicalLevelOfInjuryHasOnlySoftValues) {
                    totals.addNeurologicalLevelOfInjury(level);
                }
            }

            if (totals.neurologicalLevelOfInjuryHasOnlySoftValues) {
                totals.addNeurologicalLevelOfInjury(level.previous!);
            }

            if ((level.leftTouchValue !== 2 && !Algorithm.ntRegex.test(level.leftTouch))
                    || (level.leftPrickValue !== 2 && !Algorithm.ntRegex.test(level.leftPrick))) {
                totals.leftSensoryHasOnlySoftValues = false;
                totals.neurologicalLevelOfInjuryHasOnlySoftValues = false;
            }

            if (level.isKeyMuscle) {
                nextNonKeyMuscleShouldBeLeftMotor = true;
                totals.hasLeftCollins = true;
            }
        }

        if (totals.rightMotorHasOnlySoftValues && level.rightMotorValue !== 5
                && !level.rightMotorImpairmentNotDueToSci) {
            if (level.isKeyMuscle && (level.rightMotorValue >= 3 || Algorithm.ntRegex.test(level.rightMotor))) {
                totals.addRightMotorValue(level);

                // Check if left won't make the NLI have to be the previous level.
                // Let the logic for left motor handle the SNL instead
                if (totals.neurologicalLevelOfInjuryHasOnlySoftValues &&
                    (level.leftMotorValue > 2
                        || level.leftMotorImpairmentNotDueToSci || Algorithm.ntRegex.test(level.leftMotor))) {
                    totals.addNeurologicalLevelOfInjury(level);

                    if (!Algorithm.ntRegex.test(level.rightMotor)) {
                        totals.neurologicalLevelOfInjuryHasOnlySoftValues = false;
                    }
                }
            }

            if (level.rightMotorValue < 3 || Algorithm.ntRegex.test(level.rightMotor)) {
                totals.addRightMotorValue(level.previous!);

                if (totals.neurologicalLevelOfInjuryHasOnlySoftValues) {
                    totals.addNeurologicalLevelOfInjury(level.previous!);

                    if (!Algorithm.ntRegex.test(level.rightMotor)) {
                        totals.neurologicalLevelOfInjuryHasOnlySoftValues = false;
                    }
                }
            }

            if (!Algorithm.ntRegex.test(level.rightMotor)) {
                totals.rightMotorHasOnlySoftValues = false;
            }
        }

        if (totals.leftMotorHasOnlySoftValues && level.leftMotorValue !== 5 && !level.leftMotorImpairmentNotDueToSci) {
            if (level.isKeyMuscle && (level.leftMotorValue >= 3 || Algorithm.ntRegex.test(level.leftMotor))) {
                totals.addLeftMotorValue(level);

                if (totals.neurologicalLevelOfInjuryHasOnlySoftValues) {
                    totals.addNeurologicalLevelOfInjury(level);
                }
            }

            if (level.leftMotorValue < 3 || Algorithm.ntRegex.test(level.leftMotor)) {
                totals.addLeftMotorValue(level.previous!);

                if (totals.neurologicalLevelOfInjuryHasOnlySoftValues) {
                    totals.addNeurologicalLevelOfInjury(level.previous!);
                }
            }

            if (!Algorithm.ntRegex.test(level.leftMotor)) {
                totals.leftMotorHasOnlySoftValues = false;
                totals.neurologicalLevelOfInjuryHasOnlySoftValues = false;
            }
        }

        /* -- RECURSIVE CALL --------------- */
        if (level.next !== null) {
            Algorithm.updateTotalsWithLevelAt(isncsciExam, totals, level.next,
                                             nextNonKeyMuscleShouldBeRightMotor && totals.rightMotorHasOnlySoftValues,
                                             nextNonKeyMuscleShouldBeLeftMotor && totals.leftMotorHasOnlySoftValues);
        }

        // #region This happens when there are INTACT values -------------------------------------------
        if ('S4_5' === level.name) {
            if (totals.rightSensoryHasOnlySoftValues && totals.leftSensoryHasOnlySoftValues
                    && totals.rightMotorHasOnlySoftValues && totals.leftMotorHasOnlySoftValues) {
                totals.addNeurologicalLevelOfInjury(level);
            }

            if (totals.rightSensoryHasOnlySoftValues) {
                totals.addRightSensoryValue(level);
                totals.rightSensoryHasOnlySoftValues = false;
            }

            if (totals.leftSensoryHasOnlySoftValues) {
                totals.addLeftSensoryValue(level);
                totals.leftSensoryHasOnlySoftValues = false;
            }

            if (totals.rightMotorHasOnlySoftValues) {
                totals.addRightMotorValue(level);
                totals.rightMotorHasOnlySoftValues = false;
            }

            if (totals.leftMotorHasOnlySoftValues) {
                totals.addLeftMotorValue(level);
                totals.leftMotorHasOnlySoftValues = false;
            }
        }
        // #endregion

        if (totals.rightSensoryZppHasOnlySoftValues && ('0' !== level.rightTouch || '0' !== level.rightPrick)) {
            if ((level.rightTouchValue > 0 || level.rightTouchImpairmentNotDueToSci)
                    || (level.rightPrickValue > 0 || level.rightPrickImpairmentNotDueToSci)) {
                totals.rightSensoryZppHasOnlySoftValues = false;
            }

            totals.addRightSensoryZppValue(level);
        }

        if (totals.leftSensoryZppHasOnlySoftValues && ('0' !== level.leftTouch || '0' !== level.leftPrick)) {
            if ((level.leftTouchValue > 0 || level.leftTouchImpairmentNotDueToSci)
                    || (level.leftPrickValue > 0 || level.leftPrickImpairmentNotDueToSci)) {
                totals.leftSensoryZppHasOnlySoftValues = false;
            }

            totals.addLeftSensoryZppValue(level);
        }

        if (totals.rightMotorZppHasOnlySoftValues
                && (level.hasOtherRightMotorFunction
                || ('0' !== level.rightMotor && (level.isKeyMuscle || totals.rightMotorContains(level.name))))) {
            if ((level.rightMotorImpairmentNotDueToSci || level.hasOtherRightMotorFunction
                        || !Algorithm.ntRegex.test(level.rightMotor))
                    && (level.isKeyMuscle || level.ordinal < 4
                    || (level.ordinal > 25 && !totals.rightUpperMotorContainsNt
                        && !totals.rightLowerMotorContainsNt && !totals.hasRightCollins)
                    || (level.ordinal > 8 && level.ordinal < 21 && !totals.rightUpperMotorContainsNt))) {

                totals.rightMotorZppHasOnlySoftValues = false;
            }

            totals.addRightMotorZppValue(level);
        }

        if (totals.leftMotorZppHasOnlySoftValues
                && (level.hasOtherLeftMotorFunction
                || ('0' !== level.leftMotor && (level.isKeyMuscle || totals.leftMotorContains(level.name))))) {
            if ((level.leftMotorImpairmentNotDueToSci || level.hasOtherLeftMotorFunction
                        || !Algorithm.ntRegex.test(level.leftMotor))
                    && (level.isKeyMuscle || level.ordinal < 4
                    || (level.ordinal > 25 && !totals.leftUpperMotorContainsNt
                        && !totals.leftLowerMotorContainsNt && !totals.hasLeftCollins)
                    || (level.ordinal > 8 && level.ordinal < 21 && !totals.leftUpperMotorContainsNt))) {

                totals.leftMotorZppHasOnlySoftValues = false;
            }

            totals.addLeftMotorZppValue(level);
        }

        // Update most Rostral levels with motor function
        if ((level.isKeyMuscle || level.hasOtherRightMotorFunction)
                && totals.mostRostralRightLevelWithMotorFunction == null
                && (level.rightMotorImpairmentNotDueToSci
                    || level.hasOtherRightMotorFunction
                    || (level.rightMotorValue !== 0 && level.isKeyMuscle))) {
            totals.mostRostralRightLevelWithMotorFunction = level;
        }

        if ((level.isKeyMuscle || level.hasOtherLeftMotorFunction)
                && totals.mostRostralLeftLevelWithMotorFunction == null
                && (level.leftMotorImpairmentNotDueToSci
                    || level.hasOtherLeftMotorFunction
                    || (level.leftMotorValue !== 0 && level.isKeyMuscle))) {
            totals.mostRostralLeftLevelWithMotorFunction = level;
        }

        // Update most Caudal levels with motor function
        if ((level.isKeyMuscle || level.hasOtherRightMotorFunction)
                && totals.mostCaudalRightLevelWithMotorFunction == null
                && ('0' !== level.rightMotor || level.hasOtherRightMotorFunction)) {
            totals.mostCaudalRightLevelWithMotorFunction = level;
        }

        if ((level.isKeyMuscle || level.hasOtherLeftMotorFunction)
                && totals.mostCaudalLeftLevelWithMotorFunction == null
                && ('0' !== level.leftMotor || level.hasOtherLeftMotorFunction)) {
            totals.mostCaudalLeftLevelWithMotorFunction = level;
        }

        if (!level.isKeyMuscle) {
            return;
        }

        if (level.isLowerMuscle) {
            totals.rightLowerMotorTotal += level.rightMotorValue;
            totals.leftLowerMotorTotal += level.leftMotorValue;
        } else {
            totals.rightUpperMotorTotal += level.rightMotorValue;
            totals.leftUpperMotorTotal += level.leftMotorValue;
        }
    }

    /**
     * Evaluates the specified form and totals to determine if any of the different
     * return conditions could produce a case where there could be motor function more
     * than 3 levels below the injury level.
     *
     * @param {IsncsciExam} isncsciExam that was used to produce the totals.
     * @param {IsncsciTotals} totals Totals returned by the algorithm.
     * @returns {boolean} Flag indicating if any combination in the totals could have a case with
     *                    motor function more than 3 levels below the injury level.
     */
    private static couldNotHaveMotorFunctionMoreThan3LevelsBelowMotorLevel(
        isncsciExam: IsncsciExam, totals: IsncsciTotals): boolean {
        let mostRostralRightLevelWithMotor: NeuroLevel | null = null;
        let mostRostralLeftLevelWithMotor: NeuroLevel | null = null;

        let currentLevel: NeuroLevel | null = isncsciExam.getLevelWithName('S1');

        while ((mostRostralRightLevelWithMotor === null || mostRostralLeftLevelWithMotor == null)
                && currentLevel != null // Could happen if SNL is C1
                && currentLevel.ordinal >= totals.mostCaudalNeurologicalLevelOfInjury!.ordinal) {
            if (mostRostralRightLevelWithMotor === null &&
                    (currentLevel.rightMotorImpairmentNotDueToSci || currentLevel.hasOtherRightMotorFunction
                        || (currentLevel.rightMotorValue !== 0 && currentLevel.isKeyMuscle))) {
                mostRostralRightLevelWithMotor = currentLevel;
            }

            if (mostRostralLeftLevelWithMotor == null &&
                    (currentLevel.leftMotorImpairmentNotDueToSci || currentLevel.hasOtherLeftMotorFunction
                        || (currentLevel.leftMotorValue !== 0 && currentLevel.isKeyMuscle))) {
                mostRostralLeftLevelWithMotor = currentLevel;
            }

            currentLevel = currentLevel.previous;
        }

        return (mostRostralRightLevelWithMotor == null
                    || mostRostralRightLevelWithMotor.ordinal - totals.mostCaudalRightMotor!.ordinal <= 3)
                && (mostRostralLeftLevelWithMotor == null
                    || mostRostralLeftLevelWithMotor.ordinal - totals.mostCaudalLeftMotor!.ordinal <= 3);
    }

    /**
     * Evaluates the specified form and totals to determine if any of the different
     * return conditions could produce a case where the Asia Impairment Scale is C o D.
     *
     * @param {IsncsciExam} isncsciExam that was used to produce the totals.
     * @param {IsncsciTotals} totals Totals returned by the algorithm.
     * @returns {couldBeAsiaC: boolean, couldBeAsiaD: boolean} Object with the flags couldBeAsiaC: boolean
     *                                                         and couldBeAsiaD: boolean
     * couldBeAsiaC indicates if this case is a possible ASIA C.
     * couldBeAsiaD indicates if this case is a possible ASIA D.
     */
    private static couldBeAsiaCorD(
        isncsciExam: IsncsciExam, totals: IsncsciTotals): {couldBeAsiaC: boolean, couldBeAsiaD: boolean} {
        let couldBeAsiaC: boolean = false;
        let couldBeAsiaD: boolean = false;
        let rightMotor: NeuroLevel | null = null;
        let leftMotor: NeuroLevel | null = null;

        // Check if the patient could be motor incomplete via sphincter contraction
        // Otherwise we need to check for motor function more than 3 levels below motor level.
        const couldHaveAnalContraction: boolean = isncsciExam.analContraction === BinaryObservation.yes
                || isncsciExam.analContraction === BinaryObservation.nt;

        const neurologicalLevelsOfInjury = totals.getNeurologicalLevelsOfInjury();
        const levelsLength = neurologicalLevelsOfInjury.length;
        let index = 0;

        while (index < levelsLength && (!couldBeAsiaC || !couldBeAsiaD)) {
            // RIGHT MOTOR
            // If not motor incomplete already,
            // find the right motor level that correspond to this particular neurological level
            const currentNli = neurologicalLevelsOfInjury[index];
            index++;

            if (!couldHaveAnalContraction && (rightMotor == null || rightMotor.ordinal < currentNli.ordinal)) {
                const rightMotorValues = totals.getRightMotorValues();
                const rightMotorValuesLength = rightMotorValues.length;
                let rmIndex = 0;
                rightMotor = null;

                while (rightMotor == null && rmIndex < rightMotorValuesLength) {
                    const currentRightMotor = rightMotorValues[rmIndex];
                    rmIndex++;

                    if (currentRightMotor.ordinal >= currentNli.ordinal) {
                        rightMotor = currentRightMotor;
                    }
                }
            }

            // LEFT MOTOR
            // If not motor incomplete already,
            // find the left motor level that correspond to this particular neurological level
            if (!couldHaveAnalContraction && (leftMotor == null || leftMotor.ordinal < currentNli.ordinal)) {
                const leftMotorValues = totals.getLeftMotorValues();
                const leftMotorValuesLength = leftMotorValues.length;
                let lmIndex = 0;
                leftMotor = null;

                while (leftMotor == null && lmIndex < leftMotorValuesLength) {
                    const currentLeftMotor = leftMotorValues[lmIndex];
                    lmIndex++;

                    if (currentLeftMotor.ordinal >= currentNli.ordinal) {
                        leftMotor = currentLeftMotor;
                    }
                }
            }

            // If the test is not motor incomplete at this level, do not continue to count motor levels,
            // move to the next nli available.
            if (!couldHaveAnalContraction
                    && totals.mostCaudalRightLevelWithMotorFunction!.ordinal - rightMotor!.ordinal <= 3
                    && totals.mostCaudalLeftLevelWithMotorFunction!.ordinal - leftMotor!.ordinal <= 3) {
                continue;
            }

            // When motor incomplete and the nli is S1 or more caudal,
            // it is automatically D since there are no myotomes to count from.
            // We can break the loop.
            // Greater than L5 (24)
            if (currentNli.ordinal > 24) {
                couldBeAsiaD = true;
                break;
            }

            // If motor incomplete, count the motor levels with muscle grade greater than two
            let levelsWithMuscleGradeGreaterThanTwo: number = 0;
            let levelsWithMuscleGradeLessThanThree: number = 0;
            let eligibleLevelCount: number = 0;
            let currentLevel: NeuroLevel | null = currentNli.next;

            while (currentLevel != null) {
                if (currentLevel.isKeyMuscle) {
                    eligibleLevelCount += 2;

                    if (currentLevel.rightMotorValue > 2 || currentLevel.rightMotorImpairmentNotDueToSci
                            || Algorithm.ntRegex.test(currentLevel.rightMotor)) {
                        levelsWithMuscleGradeGreaterThanTwo++;
                    }

                    if ((currentLevel.rightMotorValue < 3 || Algorithm.ntRegex.test(currentLevel.rightMotor))
                            && !currentLevel.rightMotorImpairmentNotDueToSci) {
                        levelsWithMuscleGradeLessThanThree++;
                    }

                    if (currentLevel.leftMotorValue > 2
                            || currentLevel.leftMotorImpairmentNotDueToSci
                            || Algorithm.ntRegex.test(currentLevel.leftMotor)) {
                        levelsWithMuscleGradeGreaterThanTwo++;
                    }

                    if ((currentLevel.leftMotorValue < 3 || Algorithm.ntRegex.test(currentLevel.leftMotor))
                            && !currentLevel.leftMotorImpairmentNotDueToSci) {
                        levelsWithMuscleGradeLessThanThree++;
                    }
                }

                currentLevel = currentLevel.next;
            }

            // If not more than half the myotomes contain values less to 3, this is an Asia C
            if (levelsWithMuscleGradeLessThanThree > eligibleLevelCount / 2) {
                couldBeAsiaC = true;
            }

            // If at least half the myotomes below the current NLI containing values greater or equal to 3,
            // hooray! it is ASIA D.
            if (levelsWithMuscleGradeGreaterThanTwo >= eligibleLevelCount / 2) {
                couldBeAsiaD = true;
            }
        }

        return {
            couldBeAsiaC,
            couldBeAsiaD,
        };
    }
}
