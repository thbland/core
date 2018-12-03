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

import { setDapValue } from '../../src/usecases/setDapValue.usecase';

describe('Set DAP value usecase', () => {

    it('Set DAP value to "yes"', (done) => {
        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('IIsncsciAppStoreProvider', ['setDapValue']);

        appStoreProvider.setDapValue.and
            .callFake((value: string) => Promise.resolve());
        //#endregion

        // Act
        setDapValue('yes', appStoreProvider);
        runAsserts();

        // Assert
        function runAsserts() {
            expect(appStoreProvider.setDapValue).toHaveBeenCalled();
            expect(appStoreProvider.setDapValue).not.toThrowError();
            done();
        }
    });

    it('throws an exception when setting a value for an invalid DAP value', () => {
        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('IIsncsciAppStoreProvider', ['setDapValue']);

        appStoreProvider.setDapValue.and
            .callFake((value: string) => Promise.resolve());
        //#endregion

        expect(() =>  setDapValue('nope', appStoreProvider))
        .toThrow(new Error('SetDapValueUseCase :: invalid-value'));
    });
});
