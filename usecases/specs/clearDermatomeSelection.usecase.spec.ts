/*
@license
Copyright (c) 2015 Rick Hansen Institute. All rights reserved.
This code may only be used under the modified Apache license found at https://raw.githubusercontent.com/rick-hansen-institute/rhi-core-isncsci-algorithm/master/LICENSE
Author: RhiTech <tech@rickhanseninstitute.org>
*/
///<reference path="../../node_modules/@types/jasmine/index.d.ts"/>

'use strict';

import { Promise } from 'es6-promise'; // Polyfill promise as PhantomJS is still missing it [2017-06-14]
import { iIsncsciAppStoreProvider } from '../../boundaries';
import { ClearDermatomeSelectionUseCase } from '../src/clearDermatomeSelection.usecase';

describe('Clear dermatome selection use case', () => {
    // The promise polyfill works in the spec files but not inside the actual app files.
    // Double polyfill.
    window['Promise'] = Promise;

    // beforeAll((done) => { });
    // beforeEach((done) => { done(); });
    
    it('clears the dermatome selection', (done) => {
        // Arrange
        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('iIsncsciAppStoreProvider', ['clearDermatomeSelection']);
        
        appStoreProvider.clearDermatomeSelection.and.callFake(
            () => {
                runAsserts();
                
                return Promise.resolve();
            }
        );
        //#endregion
        
        // Act
        new ClearDermatomeSelectionUseCase(<iIsncsciAppStoreProvider>appStoreProvider).execute();

        // Assert
        function runAsserts() {
            expect(appStoreProvider.clearDermatomeSelection).toHaveBeenCalled();
            done();
        };
    });
});