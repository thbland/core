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

import { Region } from '../../src/domain';
import { setDermatomeValue } from '../../src/usecases/setDermatomeValue.usecase';

describe('Set dermatome value usecase', () => {
    // beforeAll((done) => { });
    // beforeEach((done) => { done(); });

    function addSensoryVariantsToDermatomeNames(prefix: string, dermatomeNames: string[]): void {
        dermatomeNames.push(`${prefix}RightPrick`);
        dermatomeNames.push(`${prefix}LeftPrick`);
        dermatomeNames.push(`${prefix}RightTouch`);
        dermatomeNames.push(`${prefix}LeftTouch`);
    }

    function getValidSensoryDermatomeNames(): string[] {
        const dermatomeNames: string[] = [];

        for (let i: number = 2; i <= 8; i++) {
            addSensoryVariantsToDermatomeNames(`c${i}`, dermatomeNames);
        }

        for (let i: number = 1; i <= 12; i++) {
            addSensoryVariantsToDermatomeNames(`t${i}`, dermatomeNames);
        }

        for (let i: number = 1; i <= 5; i++) {
            addSensoryVariantsToDermatomeNames(`l${i}`, dermatomeNames);
        }

        for (let i: number = 1; i <= 3; i++) {
            addSensoryVariantsToDermatomeNames(`s${i}`, dermatomeNames);
        }

        addSensoryVariantsToDermatomeNames('s4_5', dermatomeNames);

        return dermatomeNames;
    }

    function addMotorVariantsToDermatomeNames(prefix: string, dermatomeNames: string[]): void {
        dermatomeNames.push(`${prefix}RightMotor`);
        dermatomeNames.push(`${prefix}LeftMotor`);
    }

    function getValidMotorDermatomeNames(): string[] {
        const dermatomeNames: string[] = [];

        for (let i: number = 5; i <= 8; i++) {
            addMotorVariantsToDermatomeNames(`c${i}`, dermatomeNames);
        }

        addMotorVariantsToDermatomeNames('t1', dermatomeNames);

        for (let i: number = 2; i <= 5; i++) {
            addMotorVariantsToDermatomeNames(`l${i}`, dermatomeNames);
        }

        addMotorVariantsToDermatomeNames('s1', dermatomeNames);

        return dermatomeNames;
    }

    it('sets the value of c2RightPrick to 2', (done) => {
        // Arrange
        let dermatomeNameUpdated: string;
        let valueAssigned: string;
        let nextDermatomeNameAssigned: string;

        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('IIsncsciAppStoreProvider', ['setDermatomeValue']);

        appStoreProvider.setDermatomeValue.and.callFake(
            (dermatomeName: string, value: string, nextDermatomeName: string) => {
                dermatomeNameUpdated = dermatomeName;
                valueAssigned = value;
                nextDermatomeNameAssigned = nextDermatomeName;
                runAsserts();

                return Promise.resolve();
        });
        //#endregion

        // Act
        setDermatomeValue('c2RightPrick', '2', Region.None, appStoreProvider);

        // Assert
        function runAsserts() {
            expect(dermatomeNameUpdated).toBe('c2RightPrick');
            expect(valueAssigned).toBe('2');
            expect(nextDermatomeNameAssigned).toBe('c3RightPrick');

            expect(appStoreProvider.setDermatomeValue).toHaveBeenCalled();
            done();
        }
    });

    it('throws an exception when setting a value for an invalid dermatome name [c5RightMotormotor]', () => {
        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('IIsncsciAppStoreProvider', ['setDermatomeValue']);

        expect(() => setDermatomeValue('c5RightMotormotor', '2', Region.None, appStoreProvider))
        .toThrow(new Error('SetDermatomeValueUseCase :: invalid-dermatome-name'));
    });

    it('sets any valid sensory value to any valid sensory dermatome', (done) => {
        // Arrange
        const validDermatomeNames: string[] = getValidSensoryDermatomeNames();
        const validSensoryValues: string[] = ['', '0', '0!', '1', '1!', '2', 'NT', 'NT!', 'NT*'];
        let dermatomesAssigned: number = 0;

        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('IIsncsciAppStoreProvider', ['setDermatomeValue']);

        appStoreProvider.setDermatomeValue.and.callFake(
            (dermatomeName: string, value: string, nextDermatomeName: string) => {
                dermatomesAssigned++;
                // console.log(`${dermatomesAssigned}. ${dermatomeName} :: ${value}`);

                if (dermatomesAssigned === validDermatomeNames.length * validSensoryValues.length) {
                    runAsserts();
                }

                return Promise.resolve();
        });
        //#endregion

        // Act
        validDermatomeNames.forEach(
            (dermatomeName: string) =>
                validSensoryValues.forEach((value: string) =>
                    setDermatomeValue(dermatomeName, value, Region.None, appStoreProvider)),
        );

        // Assert
        function runAsserts() {
            expect(appStoreProvider.setDermatomeValue).toHaveBeenCalled();
            done();
        }
    });

    it('sets any valid motor value to any valid motor dermatome', (done) => {
        // Arrange
        const validDermatomeNames: string[] = getValidMotorDermatomeNames();
        const validMotorValues: string[] =
            ['', '0', '0!', '1', '1!', '2!', '3', '3!', '4', '4!', '5', '5*', 'NT', 'NT!', 'NT*'];
        let dermatomesAssigned: number = 0;

        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('IIsncsciAppStoreProvider', ['setDermatomeValue']);

        appStoreProvider.setDermatomeValue.and.callFake(
            (dermatomeName: string, value: string, nextDermatomeName: string) => {
                dermatomesAssigned++;
                // console.log(`${dermatomesAssigned}. ${dermatomeName} :: ${value}`);

                if (dermatomesAssigned === validDermatomeNames.length * validMotorValues.length) {
                    runAsserts();
                }

                return Promise.resolve();
        });
        //#endregion

        // Act
        validDermatomeNames.forEach(
            (dermatomeName: string) =>
                validMotorValues.forEach((value: string) =>
                    setDermatomeValue(dermatomeName, value, Region.None, appStoreProvider),
        ));

        // Assert
        function runAsserts() {
            expect(appStoreProvider.setDermatomeValue).toHaveBeenCalled();
            done();
        }
    });
});
