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

import { IsncsciExam, NeuroLevel } from '../../src/domain';

describe('Isncsci Exam ::', () => {

    describe('Initialization :: ', () => {
        it('successfully registers all neurological levels on create', () => {
            // Arrange
            const exam: IsncsciExam = new IsncsciExam();
            const levelNames: string[] = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8',
                    'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12',
                    'L1', 'L2', 'L3', 'L4', 'L5', 'S1', 'S2', 'S3', 'S4_5'];

            let level: NeuroLevel = exam.getLevelWithName('C1');

            // Act - Assert
            for (let i = 0; i < levelNames.length; i++) {
                const name: string = levelNames[i];
                expect(level.name).toBe(levelNames[i]);
                expect(level.ordinal).toBe(i);
                level = level.next!;
            }
        });

        it('sets right lowest non-key muscle with motor function to null by default', () => {
            // Arrange - Act
            const exam: IsncsciExam = new IsncsciExam();

            // Asserts
            expect(exam.rightLowestNonKeyMuscleWithMotorFunction).toBeNull();
        });

        it('sets left lowest non-key muscle with motor function to null by default', () => {
            // Arrange - Act
            const exam: IsncsciExam = new IsncsciExam();

            // Assert
            expect(exam.leftLowestNonKeyMuscleWithMotorFunction).toBeNull();
        });
    });

    describe('Setting lowest non-key muscle with motor function', () => {

        it('can set T7 as the right lowest non-key muscle with motor function', () => {
            // Arrange
            const exam: IsncsciExam = new IsncsciExam();

            // Act
            exam.setRightLowestNonKeyMuscleWithMotorFunction('T7');

            // Assert
            expect(exam.rightLowestNonKeyMuscleWithMotorFunction!.name).toBe('T7');
        });

        // tslint:disable-next-line:max-line-length
        it('throws error when passing an empty string for levelName as right lowest non-key muscle with motor function', () => {
            // Arrange
            const exam: IsncsciExam = new IsncsciExam();
            // tslint:disable-next-line:max-line-length
            const expectedMessage: string = 'rhi-core-isncsci-exam : setRightLowestNonKeyMuscleWithMotorFunction : Could not find level with name ';
            let errorMessage: string = '';

            // Act
            try {
                exam.setRightLowestNonKeyMuscleWithMotorFunction('');
            } catch (error) {
                errorMessage = error.message;
            }

            // Assert
            expect(expectedMessage).toBe(errorMessage);
        });

            // tslint:disable-next-line:max-line-length
        it('throws error when setting a right lowest non-key muscle with motor function using a wrong level name', () => {
            // Arrange
            const exam: IsncsciExam = new IsncsciExam();
            // tslint:disable-next-line:max-line-length
            const expectedMessage: string = 'rhi-core-isncsci-exam : setRightLowestNonKeyMuscleWithMotorFunction : Could not find level with name wrongLevelName';
            let errorMessage: string = '';

            // Act
            try {
                exam.setRightLowestNonKeyMuscleWithMotorFunction('wrongLevelName');
            } catch (error) {
                errorMessage = error.message;
            }

            // Assert
            expect(expectedMessage).toBe(errorMessage);
        });

        it('can set T7 as the left lowest non-key muscle with motor function', () => {
            // Arrange
            const exam: IsncsciExam = new IsncsciExam();

            // Act
            exam.setLeftLowestNonKeyMuscleWithMotorFunction('T7');

            // Assert
            expect(exam.leftLowestNonKeyMuscleWithMotorFunction!.name).toBe('T7');
        });

            // tslint:disable-next-line:max-line-length
        it('throws error when passing an empty string for levelName as left lowest non-key muscle with motor function', () => {
            // Arrange
            const exam: IsncsciExam = new IsncsciExam();
            // tslint:disable-next-line:max-line-length
            const expectedMessage: string = 'rhi-core-isncsci-exam : setLeftLowestNonKeyMuscleWithMotorFunction : Could not find level with name ';
            let errorMessage: string = '';

            // Act
            try {
                exam.setLeftLowestNonKeyMuscleWithMotorFunction('');
            } catch (error) {
                errorMessage = error.message;
            }

            // Assert
            expect(expectedMessage).toBe(errorMessage);
        });

            // tslint:disable-next-line:max-line-length
        it('throws error when setting a left lowest non-key muscle with motor function using a wrong level name', () => {
            // Arrange
            const exam: IsncsciExam = new IsncsciExam();
            // tslint:disable-next-line:max-line-length
            const expectedMessage: string = 'rhi-core-isncsci-exam : setLeftLowestNonKeyMuscleWithMotorFunction : Could not find level with name wrongLevelName';
            let errorMessage: string = '';

            // Act
            try {
                exam.setLeftLowestNonKeyMuscleWithMotorFunction('wrongLevelName');
            } catch (error) {
                errorMessage = error.message;
            }

            // Assert
            expect(expectedMessage).toBe(errorMessage);
        });
    });

    describe('Retrieving values ::', () => {
        it('an get neurological level at ordinal = 1', () => {
            // Arrange
            const exam: IsncsciExam = new IsncsciExam();

            // Act
            const level: NeuroLevel = exam.getLevelAt(1);

            // Assert
            expect(level.name).toBe('C2');
        });

        it('can get neurological level at ordinal = 28', () => {
            // Arrange
            const exam: IsncsciExam = new IsncsciExam();

            // Act
            const level: NeuroLevel = exam.getLevelAt(28);

            // Assert
            expect(level.name).toBe('S4_5');
        });

        it('throws an exception when asked to find a level with ordinal = 0', () => {
            // Arrange
            const exam: IsncsciExam = new IsncsciExam();
            // tslint:disable-next-line:max-line-length
            const expectedMessage: string = 'rhi-core-isncsci-exam : getLevelAt : The ordinal must be a number between 1 and 28';
            let errorMessage: string = '';

            // Act
            try {
                const level: NeuroLevel = exam.getLevelAt(0);
            } catch (error) {
                errorMessage = error.message;
            }

            // Assert
            expect(expectedMessage).toBe(errorMessage);
        });

        it('throws an exception when asked to find a level with ordinal = 29', () => {
            // Arrange
            const exam: IsncsciExam = new IsncsciExam();
            // tslint:disable-next-line:max-line-length
            const expectedMessage: string = 'rhi-core-isncsci-exam : getLevelAt : The ordinal must be a number between 1 and 28';
            let errorMessage: string = '';

            // Act
            try {
                const level: NeuroLevel = exam.getLevelAt(29);
            } catch (error) {
                errorMessage = error.message;
            }

            // Assert
            expect(expectedMessage).toBe(errorMessage);
        });

        it('can get neurological level C2', () => {
            // Arrange
            const exam: IsncsciExam = new IsncsciExam();

            // Act
            const level: NeuroLevel = exam.getLevelWithName('C2');

            // Assert
            expect(level.name).toBe('C2');
            expect(level.ordinal).toBe(1);
        });

        it('can get neurological level c2 - Lower case support', () => {
            // Arrange
            const exam: IsncsciExam = new IsncsciExam();

            // Act
            const level: NeuroLevel = exam.getLevelWithName('c2');

            // Assert
            expect(level.name).toBe('C2');
            expect(level.ordinal).toBe(1);
        });

        it('can get neurological level S4_5', () => {
            // Arrange
            const exam: IsncsciExam = new IsncsciExam();

            // Act
            const level: NeuroLevel = exam.getLevelWithName('S4_5');

            // Assert
            expect(level.name).toBe('S4_5');
            expect(level.ordinal).toBe(28);
        });
    });

    describe('Updating levels ::', () => {
        it('Can assign normal levels to C4', () => {
            // Arrange
            const exam: IsncsciExam = new IsncsciExam();

            // Act
            const level: NeuroLevel = exam.updateLevelByName('C4', '2', '2', '2', '2', '5', '5').getLevelWithName('C4');

            // Assert
            expect(level.name).toBe('C4');

            // Right Touch
            expect(level.rightTouch).toBe('2');
            expect(level.rightTouchValue).toBe(2);
            expect(level.rightTouchImpairmentNotDueToSci).toBe(false);

            // Left Touch
            expect(level.leftTouch).toBe('2');
            expect(level.leftTouchValue).toBe(2);
            expect(level.leftTouchImpairmentNotDueToSci).toBe(false);

            // Right Prick
            expect(level.rightPrick).toBe('2');
            expect(level.rightPrickValue).toBe(2);
            expect(level.rightPrickImpairmentNotDueToSci).toBe(false);

            // Left Prick
            expect(level.leftPrick).toBe('2');
            expect(level.leftPrickValue).toBe(2);
            expect(level.leftPrickImpairmentNotDueToSci).toBe(false);

            // Right Motor
            expect(level.rightMotor).toBe('5');
            expect(level.rightMotorValue).toBe(5);
            expect(level.rightMotorImpairmentNotDueToSci).toBe(false);

            // Left Motor
            expect(level.leftMotor).toBe('5');
            expect(level.leftMotorValue).toBe(5);
            expect(level.leftMotorImpairmentNotDueToSci).toBe(false);
        });
    });
});
