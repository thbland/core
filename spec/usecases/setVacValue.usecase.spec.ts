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

import { setVacValue } from '../../src/usecases/setVacValue.usecase';

describe('Set VAC value usecase', () => {

    it('Set VAC value to "yes"', (done) => {
        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('IIsncsciAppStoreProvider', ['setVacValue']);

        appStoreProvider.setVacValue.and
            .callFake((value: string) => Promise.resolve());
        //#endregion

        // Act
        setVacValue('yes', appStoreProvider);
        runAsserts();

        // Assert
        function runAsserts() {
            expect(appStoreProvider.setVacValue).toHaveBeenCalled();
            expect(appStoreProvider.setVacValue).not.toThrowError();
            done();
        }
    });

    it('throws an exception when setting a value for an invalid VAC value', () => {
        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('IIsncsciAppStoreProvider', ['setVacValue']);

        appStoreProvider.setVacValue.and
            .callFake((value: string) => Promise.resolve());
        //#endregion

        expect(() =>  setVacValue('nope', appStoreProvider))
        .toThrow(new Error('SetVacValueUseCase :: invalid-value'));
    });
});
