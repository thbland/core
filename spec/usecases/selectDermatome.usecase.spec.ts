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

import { IIsncsciAppStoreProvider } from '../../src/boundaries';
import { selectDermatome } from '../../src/usecases/selectDermatome.usecase';

describe('Select dermatome use case', () => {
    // beforeAll((done) => { });
    // beforeEach((done) => { done(); });

    it('sets the value of c2RightPrick to 2', (done) => {
        // Arrange
        let dermatomeSelected: string;

        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('IIsncsciAppStoreProvider', ['selectDermatome']);

        appStoreProvider.selectDermatome.and.callFake(
            (dermatomeName: string) => {
                dermatomeSelected = dermatomeName;
                runAsserts();

                return Promise.resolve();
        });
        //#endregion

        // Act
        selectDermatome('c2RightPrick', appStoreProvider);

        // Assert
        function runAsserts() {
            expect(dermatomeSelected).toBe('c2RightPrick');

            expect(appStoreProvider.selectDermatome).toHaveBeenCalled();
            done();
        }
    });

    it('throws an exception when attempting to select [c5RightMotormotor]', () => {
        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('IIsncsciAppStoreProvider', ['selectDermatome']);

        // Act
        expect(() => selectDermatome('c5RightMotormotor', appStoreProvider))
        // Assert
        .toThrow(new Error('SelectDermatomeUseCase :: invalid-dermatome-name'));
    });
});
