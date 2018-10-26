/*
@license
Copyright (c) 2015 Rick Hansen Institute. All rights reserved.
This code may only be used under the modified Apache license found at https://raw.githubusercontent.com/rick-hansen-institute/rhi-core-isncsci-algorithm/master/LICENSE
Author: RhiTech <tech@rickhanseninstitute.org>
*/
'use strict';

///<reference path="../../node_modules/@types/jasmine/index.d.ts"/>
import { iIsncsciAppStoreProvider } from '../../src/boundaries';
import { selectDermatome } from '../../src/usecases/selectDermatome.usecase';

describe('Select dermatome use case', () => {
    // The promise polyfill works in the spec files but not inside the actual app files.
    // Double polyfill.
    window['Promise'] = Promise;

    // beforeAll((done) => { });
    // beforeEach((done) => { done(); });

    it('sets the value of c2RightPrick to 2', (done) => {
        // Arrange
        let dermatomeSelected: string;

        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('iIsncsciAppStoreProvider', ['selectDermatome']);

        appStoreProvider.selectDermatome.and.callFake(
            (dermatomeName: string) => {
                dermatomeSelected = dermatomeName;
                runAsserts();

                return Promise.resolve();
            }
        );
        //#endregion

        // Act
        selectDermatome('c2RightPrick', appStoreProvider);

        // Assert
        function runAsserts() {
            expect(dermatomeSelected).toBe('c2RightPrick');

            expect(appStoreProvider.selectDermatome).toHaveBeenCalled();
            done();
        };
    });

    it('throws an exception when attempting to select [c5RightMotormotor]', () => {
        // Arrange
        let errorMessage: string;

        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('iIsncsciAppStoreProvider', ['selectDermatome']);

        // Act
        try {
            selectDermatome('c5RightMotormotor', appStoreProvider);
        } catch (ex) {
            errorMessage = ex;
        }

        // Assert
        expect(errorMessage).toBe(`SelectDermatomeUseCase :: invalid-dermatome-name`);
    });
});
