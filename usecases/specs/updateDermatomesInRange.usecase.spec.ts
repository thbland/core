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
import { UpdateDermatomesInRangeUseCase } from '../src/updateDermatomesInRange.usecase';

describe('Update dermatomes in range use case', () => {
    // The promise polyfill works in the spec files but not inside the actual app files.
    // Double polyfill.
    window['Promise'] = Promise;

    // beforeAll((done) => { });
    // beforeEach((done) => { done(); });
    
    it('sets the value of 2 for the range [c5RightMotor,  c8RightPrick]', (done) => {
        // Arrange
        const dermatomeRange: string[] = [
            'c5RightMotor', 'c5RightTouch', 'c5RightPrick',
            'c6RightMotor', 'c6RightTouch', 'c6RightPrick',
            'c7RightMotor', 'c7RightTouch', 'c7RightPrick',
            'c8RightMotor', 'c8RightTouch', 'c8RightPrick'];

        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('iIsncsciAppStoreProvider', ['updateDermatomesInRange']);
        
        appStoreProvider.updateDermatomesInRange.and.callFake(
            (dermatomeRange: string[], value: string) => {
                runAsserts();
                
                return Promise.resolve();
            }
        );
        //#endregion
        
        // Act
        new UpdateDermatomesInRangeUseCase(<iIsncsciAppStoreProvider>appStoreProvider).execute(dermatomeRange, '2');

        // Assert
        function runAsserts() {
            expect(appStoreProvider.updateDermatomesInRange).toHaveBeenCalled();
            done();
        };
    });
    
    it('throws an exception when setting a value of 5 in a range containing sensory values', (done) => {
        // Arrange
        let errorMessage: string;
        const dermatomeRange: string[] = [
            'c5RightMotor', 'c5RightTouch', 'c5RightPrick',
            'c6RightMotor', 'c6RightTouch', 'c6RightPrick'];

        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('iIsncsciAppStoreProvider', ['updateDermatomesInRange']);
        appStoreProvider.updateDermatomesInRange.and.returnValue(Promise.resolve());
        //#endregion
        
        // Act
        try {
            new UpdateDermatomesInRangeUseCase(<iIsncsciAppStoreProvider>appStoreProvider).execute(dermatomeRange, '5');
        } catch(error) {
            errorMessage = error;
            runAsserts();
        }

        // Assert
        function runAsserts() {
            expect(errorMessage).toBe(`${UpdateDermatomesInRangeUseCase.is} :: c5RightTouch - invalid-sensory-value :: c5RightPrick - invalid-sensory-value :: c6RightTouch - invalid-sensory-value :: c6RightPrick - invalid-sensory-value`);
            done();
        };
    });
});