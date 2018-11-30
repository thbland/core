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

import { updatePropagateValue } from '../../src/usecases/updatePropagateValue.usecase';

describe('Update propagate value usecase ::', () => {

    it('sets the "propagate value" flag to "true" and persists it  in local storage', (done) => {
        // Arrange
        let settingsUpdatePropagateValueFlag: boolean = false;
        let storeUpdatePropagateValueFlag: boolean = false;

        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('IIsncsciAppStoreProvider', ['logError', 'updatePropagateValue']);

        const storePromise: Promise<void> = appStoreProvider.updatePropagateValue.and
            .callFake((value: boolean): Promise<void> => {
                storeUpdatePropagateValueFlag = value;
                return Promise.resolve();
            });

        appStoreProvider.logError.and
            .callFake((errorMessage: string): Promise<void> => Promise.resolve());
        //#endregion

        //#region AppSettingProvider
        const appSettingProvider = jasmine.createSpyObj('IIsncsciAppSettingProvider', ['updatePropagateValue']);

        const settingsPromise: Promise<void> = appSettingProvider.updatePropagateValue.and
            .callFake((value: boolean) => {
                settingsUpdatePropagateValueFlag = value;
                return Promise.resolve();
            });
        //#endregion

        Promise.all([storePromise, settingsPromise])
            .then(() => runAsserts());

        // Act
        updatePropagateValue(true, appStoreProvider, appSettingProvider);

        // Assert
        function runAsserts() {
            expect(settingsUpdatePropagateValueFlag).toBe(true);
            expect(storeUpdatePropagateValueFlag).toBe(true);
            expect(appStoreProvider.updatePropagateValue).toHaveBeenCalled();
            expect(appStoreProvider.logError).not.toHaveBeenCalled();
            expect(appSettingProvider.updatePropagateValue).toHaveBeenCalled();
            done();
        }
    });

    it('logs an error when the appStoreProvider fails to update the "propagate value" flag', (done) => {
        // Arrange
        let settingsUpdatePropagateValueFlag: boolean = false;
        let storeErrorMessage: string;

        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('IIsncsciAppStoreProvider', ['logError', 'updatePropagateValue']);
        appStoreProvider.updatePropagateValue.and
            .callFake(
                (value: boolean): Promise<void> => {
                    return new Promise(
                        (resolve, reject) => {
                            throw new Error('update app store failed');
                        });
                });

        appStoreProvider.logError.and
            .callFake((errorMessage: string): Promise<void> => {
                storeErrorMessage = errorMessage;
                runAsserts();
                return Promise.resolve();
            });
        //#endregion

        //#region AppSettingProvider
        const appSettingProvider = jasmine.createSpyObj('IIsncsciAppSettingProvider', ['updatePropagateValue']);

        const settingsPromise: Promise<void> = appSettingProvider.updatePropagateValue.and
            .callFake((value: boolean) => {
                settingsUpdatePropagateValueFlag = value;
                return Promise.resolve();
            });
        //#endregion

        // Act
        updatePropagateValue(true, appStoreProvider, appSettingProvider);

        // Assert
        function runAsserts() {
            expect(storeErrorMessage)
                .toBe('updatePropagateValueUseCase :: update app store failed');
            expect(settingsUpdatePropagateValueFlag).toBe(true);
            expect(appStoreProvider.updatePropagateValue).toHaveBeenCalled();
            expect(appStoreProvider.logError).toHaveBeenCalled();
            expect(appSettingProvider.updatePropagateValue).toHaveBeenCalled();
            done();
        }
    });

    it('logs an error when the appSettingsProvider fails to update the "propagate value" flag', (done) => {
        let settingsErrorMessage: string;

        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('IIsncsciAppStoreProvider', ['logError', 'updatePropagateValue']);
        appStoreProvider.updatePropagateValue.and
            .callFake((value: boolean) => Promise.resolve());

        appStoreProvider.logError.and
            .callFake((errorMessage: string): Promise<void> => {
                settingsErrorMessage = errorMessage;
                runAsserts();
                return Promise.resolve();
            });
        //#endregion

        //#region AppSettingProvider
        const appSettingProvider = jasmine.createSpyObj('IIsncsciAppSettingProvider', ['updatePropagateValue']);
        appSettingProvider.updatePropagateValue.and
            .callFake(
                (value: boolean): Promise<void> => {
                    return new Promise(
                        (resolve, reject) => {
                            throw new Error('update app settings failed');
                        });
                });
        //#endregion

        // Act
        updatePropagateValue(true, appStoreProvider, appSettingProvider);

        // Assert
        function runAsserts() {
            expect(settingsErrorMessage)
                .toBe('updatePropagateValueUseCase :: update app settings failed');
            expect(appStoreProvider.updatePropagateValue).not.toHaveBeenCalled();
            expect(appStoreProvider.logError).toHaveBeenCalled();
            expect(appSettingProvider.updatePropagateValue).toHaveBeenCalled();
            done();
        }
    });
});
